import "./Radio.scss";

const Radio = (props) => {
  return (
    <fieldset className="radio-fieldset">
      {props.label && <legend>{props.label}</legend>}
      {props.data.map((item, index) => (
        <label key={index} htmlFor={`radio-item${index}`}>
          <input
            type="radio"
            name={props.name}
            id={`radio-item${index}`}
            value={index}
            onChange={props.onChange}
            required={props.required}
          />
          {item}
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
