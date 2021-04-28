import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Button = (props) => {
  const onlyNumber = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }

    if (props.onChangeFull) {
      props.onChangeFull(event);
    }
  };

  return (
    <input
      className="ui-input"
      type={props.type}
      value={props.value}
      onKeyPress={(event) => (props.type === "number" ? onlyNumber(event) : null)}
      onChange={handleChange}
    />
  );
};

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeFull: PropTypes.func,
};

export default Button;
