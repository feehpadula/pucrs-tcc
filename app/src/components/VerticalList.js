import "./VerticalList.scss";

const VerticalList = (props) => {
  return (
    <div key={props.children} className="vertical-list">
      {props.children}
    </div>
  );
};

export default VerticalList;
