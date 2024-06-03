import Link from "next/link";
export default function View() {
  return (
    <div>
      View
      <Link href={"/dashboard"}>Team</Link>
    </div>
  );
}
