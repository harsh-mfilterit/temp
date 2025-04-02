"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CodeBlock from "../../../CodeBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTracker, useGetNewTrackerSchema } from "../../../api";
import { Button } from "@/components/ui/button";
import Loader from "../../../Loader";
import DynamicInputForm from "../../../DynamicInputForm";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateTracker />
    </QueryClientProvider>
  );
}
function CreateTracker() {
  const packageName = useParams().package_name;
  const {
    mutate: createTracker,
    data: newTracker,
    isLoading: ctl,
  } = useCreateTracker();
  const { data: trackerSchema, isLoading } = useGetNewTrackerSchema();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({
    package_name: packageName,
    tracker_name: "",
  });

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = formRef?.current?.values;
    const fields = { ...values, ...formData };
    createTracker(fields);
  }

  return (
    <div className="relative py-2 px-8">
      <div className="px-8 py-5 bg-white dark:bg-gray-500 rounded-xl flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white capitalize">
          create Trackers
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row py-2 gap-x-4  rounded-xl mt-3 w-full">
        {trackerSchema ? (
          <form
            onSubmit={handleSubmit}
            className=" bg-white dark:bg-gray-500 dark:text-white rounded-lg p-5 flex flex-col gap-y-4 lg:w-3/5"
          >
            <div className="flex items-center justify-between gap-x-5">
              <Label className="w-4/6 capitalize text-md">package_name :</Label>
              <Input
                className="w-full dark:bg-gray-300 outline-none dark:border-white"
                placeholder="Enter value"
                value={values["package_name"]}
                disabled
              />
            </div>

            <DynamicInputForm
              schema={trackerSchema}
              ref={formRef}
              label="config"
            />

            <div className="flex gap-x-5">
              <Button
                type="submit"
                className="w-full mt-8 dark:bg-gray-400 dark:text-white"
              >
                create tracker
              </Button>
            </div>
          </form>
        ) : (
          <Loader />
        )}
        <div className="flex flex-col"></div>
        <div className="sticky top-0 flex justify-center w-full bg-white dark:bg-gray-500 rounded-lg p-5 h-[75vh] ">
          {newTracker ? (
            <CodeBlock code={newTracker.data} language={newTracker.language} />
          ) : (
            <CodeBlock isloading={ctl} />
          )}
        </div>
      </div>
    </div>
  );
}
