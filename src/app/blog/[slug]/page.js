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

export async function fetchCStudyBySlug(slug) {
  const data = await fetchEndpoint(
    ` query NewQuery($slug: ID!) {
        casestudy(id: $slug, idType: SLUG) {
          title
          slug
                  languageCode
          casestudies {
            metatitle
            metadescription
            description
            companyName
            
            service
            mainimage {
              altText
              mediaItemUrl
            }
            challenge {
              challengebody
              challenge {
                mediaItemUrl
                altText
              }
            }
            impact {
              impactbody
              impactimage {
                altText
                mediaItemUrl
              }
            }
            introduction {
              introductionbody
              introductionimage {
                altText
                mediaItemUrl
              }
            }
            solution{
              solution
              image {
                altText
                mediaItemUrl
              }
            }
            companyLogo {
              altText
              mediaItemUrl
            }
          }
  
          translations {
            slug
            title
            languageCode
            casestudies {
              metatitle
              metadescription
              companyName
              description
              service
              mainimage {
              altText
              mediaItemUrl
            }
            challenge {
              challengebody
              challenge {
                mediaItemUrl
                altText
              }
            }
            impact {
              impactbody
              impactimage {
                altText
                mediaItemUrl
              }
            }
            introduction {
              introductionbody
              introductionimage {
                altText
                mediaItemUrl
              }
            }
            solution{
              solution
              image {
                altText
                mediaItemUrl
              }
            }
            companyLogo {
              altText
              mediaItemUrl
            }
            }
          }
         
        }
      }
      `,
    { variables: { slug } }
  );

  return data;
}

async function SingleCaseStudy({ params }) {
  const { slug } = params;
  console.log(slug, "SLUG");
  let caseStudyData = await fetchCStudyBySlug(slug);

  console.log(caseStudyData, "SINGLE SLUG");
  return <div>{caseStudyData.casestudy.title}</div>;
}

export default SingleCaseStudy;
