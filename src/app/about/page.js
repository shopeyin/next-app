import Link from "next/link";
import Team from "../dashboard/@team/page";
function Page() {
  console.log("About am here");
  return (
    <div>
      <Link href={"/"}>Home</Link>About page
      <p>{new Date().toLocaleTimeString()}</p>
      <Team />
    </div>
  );
}

export default Page;
