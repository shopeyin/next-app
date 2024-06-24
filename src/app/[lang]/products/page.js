import Link from "next/link";

import React from "react";
import Button from "../component/Button";
import { revalidateTag, revalidatePath } from "next/cache";
import ProductCounter from "../product-counter/page";

// const getData = async () => {
//   let response = await fetch(
//     "https://666bd02a49dbc5d7145b53e4.mockapi.io/products",
//     { next: { tags: ["data"] } }
//   );
//   let data = await response.json();

//   return data;
// };

const BATCH_SIZE = 100;

export async function fetchData(query = "", { variables } = {}) {
  const res = await fetch("https://apibkofc.globalvoices.com/graphql", {
    // cache: "no-store",
    // next: { tags: ["data"] },
    next: { revalidate: 5 },
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

export async function getCaseStudies(
  categoryName,
  first,
  after,
  last,
  before,
  order,
  field,
  query,
  lang
) {
  const orderby = {
    order,
    field,
  };

  const variables = {
    orderby: [{ field, order }],
    first,
    after,
    last,
    before,
    query,
    lang,
  };

  let categoryFilter = "";
  if (categoryName) {
    variables.categoryName = categoryName;
    categoryFilter = "$categoryName: String!,";
  }

  const data = await fetchData(
    `query Casestudy ($orderby: [PostObjectsConnectionOrderbyInput], $first: Int, $after: String, $last: Int,$before: String, $query: String, $lang: String, ${categoryFilter}) {
          casestudies(where: { ${
            categoryName ? "categoryName: $categoryName," : ""
          } orderby: $orderby, search: $query, language: $lang }, first: $first, after: $after, last: $last, before: $before) {
            nodes {
              title
              slug
              date
              casestudies {
                metatitle
                metadescription
                description
                companyLogo {
                  mediaItemUrl
                  srcSet
                  altText
                }
                companyName
                mainimage {
                  altText
                  mediaItemUrl
                }
              }
              categories {
                nodes {
                  id
                  name
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
        }`,
    {
      variables,
    }
  );

  return data?.casestudies;
}

export async function getCSCategories(language) {
  const data = await fetchData(
    `query CaseStudy ($language: String!) {
          categories(where: {name: "Case Studies", language:$language}) {
            edges {
              node {
                id
                slug
                name
                children (first: 100) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
        `,
    {
      variables: {
        language,
      },
    }
  );

  return data?.categories;
}

async function Page() {
  let data = await getCaseStudies(
    "",
    BATCH_SIZE,
    null,
    null,
    null,
    "DESC",
    "DATE",
    "",
    "en"
  );

  let categories = await getCSCategories("en");

  async function revalidateAction(formData) {
    "use server";

    revalidateTag("data");
    revalidatePath("/product-counter");
  }

  return (
    <div>
      <Link href={"/product-counter"}>Product counter!!</Link>
      {/* <Button /> */}
      <form>
        <button formAction={revalidateAction}>Revalidate</button>
      </form>
      {/* <ProductCounter data={data} /> */}
      {data.nodes.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              width: "30rem",
              height: "5rem",
              border: "1px solid red",
              marginLeft: "5rem",
              marginBottom: "10px",
            }}
          >
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
