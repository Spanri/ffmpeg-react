import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <button className={`ui-button ${this.props.theme || "primary"}`}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  theme: PropTypes.oneOf(["primary", "primary-animated", "gray"]),
};

export default Button;
