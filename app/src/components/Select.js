import "./Select.scss";

const Select = (props) => {
  return (
    <div className={`select-container ${props.className}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <div className="select-background ml-15">
        {props.data ? (
          <select
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            required={props.required}
          >
            {props.data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        ) : (
          <select
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            required={props.required}
          >
            {props.children}
          </select>
        )}
      </div>
    </div>
  );
};

export default Select;
