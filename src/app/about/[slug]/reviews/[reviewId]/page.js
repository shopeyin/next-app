import React from "react";

function SingleReviews({ params: { reviewId, slug } }) {
  return (
    <div>
      SingleReviews for {slug} with {reviewId}{" "}
    </div>
  );
}

export default SingleReviews;
