import "../styles/Paginantion.css";
export default function Pagination({ pagination, onPageChange }) {
  const handleClick = (e, page, isDisabled = false) => {
    e.preventDefault();
    if (isDisabled) return;
    onPageChange(page);
  };

  if (!pagination?.total_pages || pagination.total_pages === 1) {
    return null;
  }

  return (
    <nav aria-label="Product pagination">
      <ul className="pagination justify-content-center kging-pagination mb-0">
        <li className={`page-item ${!pagination.has_pre ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e) =>
              handleClick(e, pagination.current_page - 1, !pagination.has_pre)
            }
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {Array.from({ length: pagination.total_pages }, (_, index) => {
          const page = index + 1;
          const isActive = pagination.current_page === page;

          return (
            <li
              className={`page-item ${isActive ? "active" : ""}`}
              key={`${page}_page`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${!pagination.has_next ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) =>
              handleClick(e, pagination.current_page + 1, !pagination.has_next)
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
