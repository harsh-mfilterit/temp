export function generateStaticParams() {
  return [
    { package_name: 'default' }
  ];
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 