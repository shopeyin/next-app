import Link from "next/link";


export default function Team({ params }) {
  return (
    <div>
      Team
      <Link href={"dashboard/view"}>View</Link>
    </div>
  );
}
