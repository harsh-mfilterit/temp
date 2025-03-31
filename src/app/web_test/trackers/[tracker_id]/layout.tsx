export function generateStaticParams() {
  return [
    { tracker_id: 'default' }
  ];
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 