import Link from "next/link";

export default function PageDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/dashboard/note/1">Note 1</Link>
    </div>
  );
}
