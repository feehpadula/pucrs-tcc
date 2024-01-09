import "./Card.scss";

const Card = (props) => {
  return (
    <div key={props.children} className="card">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default Card;
