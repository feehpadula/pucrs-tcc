import "./Button.scss";

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.title}
      {props.icon}
    </button>
  );
};

export default Button;
