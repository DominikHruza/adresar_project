import React from "react";

const Paginator = ({ itemsPerPage, maxItems, paginate, currentPage }) => {
  const pageNums = [];

  //Get all the page numbers that will be rendered
  for (let i = 1; i <= Math.ceil(maxItems / itemsPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination-lg">
        {pageNums.map((num) => {
          return (
            <li
              onClick={() => paginate(num)}
              key={num}
              className={`${num === currentPage ? "active" : ""} page-item`}
              aria-current="page"
            >
              <span className="page-link">{num}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginator;
