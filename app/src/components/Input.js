import "./Input.scss";

const Input = (props) => {
  return (
    <div className={`create-field ${props.className}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
