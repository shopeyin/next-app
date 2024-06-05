import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

// export async function generateStaticParams() {
//   let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     next: { revalidate: 1 },
//   });
//   let data = await res.json();
//   return data;
// }

export const revalidate = 10;

async function fetchEndpoint(query = "", { variables } = {}) {
  const res = await fetch("https://apibkofc.globalvoices.com/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    console.error(res);
    return {};
  }

  const { data } = await res.json();

  return data;
}

export async function getHome(language) {
  const data = await fetchEndpoint(
    `query LoadHomePage ($language: String!) {
      pages(where: {title: "Homepage",language: $language}) {
        nodes {
          id
          title

          homepage {
            unitytext {
              text
            }
            homepageMetadescription
            homepageMetatitle
            homepageHerosubtext
            homepageHeromaintext

            homepageServicesmaintext
            homepageServicessubtext
            homepageServicedescription
            homepageGlobalunityheader
            homepageGlobalunitybody
            homepageWhatwedo
             homepageGallery {
              caption
              title
              altText
              mediaItemUrl
              description
            }
            homeCta {
              linktext
              homeCtaText
              heading
              homeCtaImage {
                altText
                mediaItemUrl

              }
            }
            globalUnityImage {
              altText
              mediaItemUrl
            }
            serviceDescriptionImage {
              altText
              mediaItemUrl
            }
            qualityPromise {
              linktext
              heading
              qptext
              qpimage {

                altText
                mediaItemUrl
                sizes(size: MEDIUM_LARGE)
                srcSet(size: MEDIUM_LARGE)

              }
            }
          }
        }
      }
    }`,
    { variables: { language } }
  );

  return data;
}

export default async function Home() {
  let receivedData = await getHome("en");
  let data = await receivedData?.pages?.nodes[0];
  console.log(data);
  // let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //   next: { revalidate: 1 },
  // });
  // let data = await res.json();
  // console.log(data);
  // cookies();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Link href={"/about"}>About </Link> */}
      App router
      {data.homepage.homepageHeromaintext}
      <p>{new Date().toLocaleTimeString()}</p>
      {/* <div>
        {data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
      </div> */}
    </main>
  );
}
