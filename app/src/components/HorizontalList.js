import "./HorizontalList.scss";

const HorizontalList = (props) => {
  return (
    <div
      key={props.children}
      className={`horizontal-list ${props.class !== undefined ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
};

export default HorizontalList;
