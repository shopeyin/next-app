import React from "react";

const getData = async () => {
  let response = await fetch(
    "https://666bd02a49dbc5d7145b53e4.mockapi.io/products"
  );
  let data = await response.json();

  return data;
};

async function ProductCounter() {
  let data = await getData();
  return <div>ProductCounter {data.length}</div>;
}

export default ProductCounter;
