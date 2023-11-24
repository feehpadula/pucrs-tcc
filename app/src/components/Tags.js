import "./Tags.scss";

const Tags = (props) => {
  return (
    <div className="tags">
      {props.tags.map((tag, index) => {
        return (
          tag !== false && (
            <span key={index} className="tag">
              {tag}
            </span>
          )
        );
      })}
    </div>
  );
};

export default Tags;
