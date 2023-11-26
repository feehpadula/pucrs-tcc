import "./Button.scss";

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.title}
      {props.icon}
    </button>
  );
};

export default Button;
