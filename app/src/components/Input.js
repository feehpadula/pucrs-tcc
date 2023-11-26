import "./Input.scss";

const Input = (props) => {
  return (
    <div className={`create-field ${props.className}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
};

export default Input;
