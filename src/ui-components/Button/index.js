import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Button = (props) => {
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button
      className={`ui-button ${props.theme || "primary"}`}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  theme: PropTypes.oneOf(["primary", "primary-animated", "gray"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
