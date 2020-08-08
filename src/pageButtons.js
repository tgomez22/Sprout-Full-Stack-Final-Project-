import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PageButtons({ currPage, setCurrPage }) {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => (currPage > 1 ? setCurrPage(currPage - 1) : null)}
      ></Pagination.Prev>
      <Pagination.Item>{currPage}</Pagination.Item>
      <Pagination.Next
        onClick={() => setCurrPage(currPage + 1)}
      ></Pagination.Next>
    </Pagination>
  );
}

export default PageButtons;
