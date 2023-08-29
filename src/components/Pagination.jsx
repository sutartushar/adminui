import React from "react";
import "./Pagination.css";

const Pagination = ({ totalRows, rowsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button className="btn" onClick={() => handlePageClick(1)}>
        {"<<"}
      </button>
      <button className="btn" onClick={() => handlePageClick(currentPage - 1)}>
        {"<"}
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button className="btn" onClick={() => handlePageClick(currentPage + 1)}>
        {">"}
      </button>
      <button className="btn" onClick={() => handlePageClick(totalPages)}>
        {">>"}
      </button>
    </div>
  );
};
export default Pagination;
