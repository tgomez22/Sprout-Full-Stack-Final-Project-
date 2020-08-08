import React, { useState, useEffect } from "react";
import "./App.css";
import PanelDriver from "./PanelDriver";
import PageButtons from "./pageButtons";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;

const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
const url = `https://trefle.io/api/v1/species/search?limit=8&token=${apiKey}&page=`;
// const url = `https://trefle.io/api/v1/plants/111119?q=basil&limit=8&token=${apiKey}`;
// const url = `https://trefle.io/api/v1/species?token=${apiKey}&limit=8&filter[scientific_name]=`;

function Nursery() {
  const [finalURL, setFinalUrl] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [userSearch, setUserSearch] = useState(null);

  useEffect(() => {
    // setFinalUrl(proxyUrl + url + currPage);
    setUserSearch(window.localStorage.getItem("userQuery"));
    if (
      userSearch === null ||
      userSearch.length <= 5 ||
      userSearch === undefined
    ) {
      setFinalUrl(proxyUrl + url + currPage);
    } else {
      setFinalUrl(
        `${proxyUrl}https://trefle.io/api/v1/plants/search?q=${userSearch}&limit=10&token=${apiKey}&page=${currPage}`
      );
    }
  }, []);

  console.log("Final url:", finalURL);
  console.log("userSearch:", userSearch);
  return finalURL ? (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <PanelDriver url={finalURL} />
          <PageButtons currPage={currPage} setCurrPage={setCurrPage} />
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
  // return finalURL ? (
  //   userSearch === null ||
  //   userSearch.length <= 5 ||
  //   userSearch === undefined ? (
  //     <div className="App">
  //       <div className="container-fluid">
  //         <div className="row">
  //           <PanelDriver url={finalURL} />
  //           <PageButtons currPage={currPage} setCurrPage={setCurrPage} />
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <div className="App">
  //       <div className="container-fluid">
  //         <div className="row">
  //           <PanelDriver
  //             url={`${proxyUrl}https://trefle.io/api/v1/plants/search?q=${userSearch}&limit=10&token=${apiKey}&page=${currPage}`}
  //           />
  //           <PageButtons currPage={currPage} setCurrPage={setCurrPage} />
  //         </div>
  //       </div>
  //     </div>
  //   )
  // ) : (
  //   <h1>Loading...</h1>
  // );
}
//   `https://trefle.io/api/v1/plants/search?q=` +
//   userSearch +
//   "&token=" +
//   apiKey;

//   if (
//     userSearch === null ||
//     userSearch.length <= 5 ||
//     userSearch === undefined
//   ) else {
//     let searchUrl =
//       `https://trefle.io/api/v1/plants/search?q=` +
//       userSearch +
//       "&token=" +
//       apiKey;
//     return (
//       <div className="App">
//         <div className="container-fluid">
//           <div className="row">
//             {<PanelDriver url={proxyUrl + searchUrl} />}
//          </div>
//         </div>
//       </div>
//     );

//   console.log("Final url: " + finalURL);
//   return finalURL ? (
//     finalURL === proxyUrl + url ? (
//       <div className="App">
//         <div className="container-fluid">
//           <div className="row">
//             <PanelDriver url={finalURL} />
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="App">
//         <div className="container-fluid">
//           <div className="row">
//             <PanelDriver url={finalURL} />
//             <PageButtons currPage={currPage} setCurrPage={setCurrPage} />
//           </div>
//         </div>
//       </div>
//     )
//   ) : (
//     <h1>Loading...</h1>
//   );
// }

export default Nursery;
