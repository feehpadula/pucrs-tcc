import "./Pagination.scss";

const Pagination = (props) => {
  return (
    <div className="pagination-card">
      {props.hasPrevPage && (
        <a href={`${props.curPageUrl}${parseInt(props.curPageNumber) - 1}`}>
          Página anterior
        </a>
      )}
      {props.hasPrevPage && props.hasNextPage && <span>-</span>}
      {props.hasNextPage && (
        <a
          href={`${props.curPageUrl}${
            props.curPageNumber ? parseInt(props.curPageNumber) + 1 : 1
          }`}
        >
          Próxima página
        </a>
      )}
    </div>
  );
};

export default Pagination;
