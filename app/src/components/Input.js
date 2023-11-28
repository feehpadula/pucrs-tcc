import "./Input.scss";

const Input = (props) => {
  return (
    <div className={`create-field ${props.className}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        min={props.min}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      />
    </div>
  );
};

export default Input;
