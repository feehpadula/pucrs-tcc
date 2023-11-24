import "./Button.scss";

const Button = (props) => {
  return (
    <button>
      {props.title}
      {props.icon}
    </button>
  );
};

export default Button;
