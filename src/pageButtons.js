import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const apiKey = process.env.REACT_APP_TREFLE_API_KEY;
const proxyUrl = "http://cors-anywhere.herokuapp.com/"; //for testing purposes only
const url = `https://trefle.io/api/v1/species/search?q=basil&limit=8&token=${apiKey}`;

function PageButtons({ currPage, setCurrPage }) {
  return (
    <Pagination>
      {/* <Pagination.First> </Pagination.First> */}
      <Pagination.Prev
        onClick={() => (currPage > 1 ? setCurrPage(currPage - 1) : null)}
      ></Pagination.Prev>
      <Pagination.Item>{currPage}</Pagination.Item>
      <Pagination.Next
        onClick={() => setCurrPage(currPage + 1)}
      ></Pagination.Next>
      {/* <Pagination.Last></Pagination.Last> */}
    </Pagination>
  );
}

export default PageButtons;
