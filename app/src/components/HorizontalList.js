import "./HorizontalList.scss";

const HorizontalList = (props) => {
  return (
    <div key={props.children} className="horizontal-list">
      {props.children}
    </div>
  );
};

export default HorizontalList;
