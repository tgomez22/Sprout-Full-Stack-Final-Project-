import Panel from "./Panel";
import React, { useState, useEffect } from "react";

function PanelDriver({ url }) {
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (!url) return;
    fetch(url, { headers: { Origin: "localhost" } })
      .then((response) => response.json())
      .then(({ data }) => {
        setValues(data);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  }, [url]);

  return values ? (
    values.map(({ id, scientific_name, genus, family, image_url }) => {
      return (
        <Panel
          scientificName={scientific_name}
          genusName={genus}
          familyName={family}
          previewImage={image_url}
          id={id}
        />
      );
    })
  ) : (
    <h1>Loading...</h1>
  );
}

export default PanelDriver;
