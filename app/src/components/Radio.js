import "./Radio.scss";

const Radio = (props) => {
  return (
    props.data && (
      <fieldset className="radio-fieldset">
        {props.legend && <legend>{props.legend}</legend>}
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
    )
  );
};

export default Radio;
