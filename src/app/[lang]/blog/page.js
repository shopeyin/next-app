import React from "react";
import Link from "next/link";

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

export async function getAllCStudies(
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

  const data = await fetchEndpoint(
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

export async function getCaseStudyCategories(language) {
  const data = await fetchEndpoint(
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

const BATCH_SIZE = 10;

async function Blog({ params: { lang } }) {
  //   const query = searchParams?.query || "";
  //   const sort = searchParams?.sort || "ASC";
  //   const industry = searchParams?.industry || "";
  // let casestudies = await getAllCStudies(
  //   selectedIndustry,
  //   BATCH_SIZE,
  //   null,
  //   null,
  //   null,
  //   selectedOption,
  //   "DATE",
  //   query,
  //   lang
  // );

  let casestudies = await getAllCStudies(
    "",
    BATCH_SIZE,
    null,
    null,
    null,
    "ASC",
    "DATE",
    "",
    "en"
  );

  let categories = await getCaseStudyCategories("en");

  return (
    <div>
      {lang}
      {casestudies.nodes.map((item, i) => {
        return (
          <div
            key={i}
            style={{ fontSize: "2rem", padding: "1rem", cursor: "pointer" }}
          >
            <Link href={`/blog/${item.slug}`}>
              {item.title} <br />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
