import React, { useEffect, useState } from "react";

import "./Pagination.css";
import { Link, useParams } from "react-router-dom";

export default function Pagination({
  items,
  itemCount,
  pathName,
  setShownItem,
}) {
  const [pageCount, setPageCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    console.log(paginatedItems);
    setShownItem(paginatedItems);

    let pagesNumber = Math.ceil(items.length / itemCount);
    setPageCount(pagesNumber);
  }, [page, items]);
  return (
    <div className="pagination">
      <ul className="pagination-list">
        {Array(pageCount)
          .fill(0)
          .map((item, index) => (
            <li className="pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathName}/${index + 1}`}
                  className="pagination-link pagination-link-active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathName}/${index + 1}`}
                  className="pagination-link"
                >
                  {index + 1}
                </Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
