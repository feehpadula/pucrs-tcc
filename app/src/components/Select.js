import "./Select.scss";

const Select = (props) => {
  return (
    <div className={`select-container ${props.className}`}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <div className="select-background ml-15">
        {props.data && (
          <select name={props.name} id={props.id}>
            {props.data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Select;
