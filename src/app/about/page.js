import Link from "next/link";
import Team from "../dashboard/@team/page";
function Page() {
  return (
    <div>
      <h1>Aboutpage</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <Team />
    </div>
  );
}

export default Page;
