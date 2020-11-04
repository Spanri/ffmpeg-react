import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    return (
      <button
        className={`ui-button ${this.props.theme || "primary"}`}
        disabled={this.props.disabled}
        onClick={() => this.handleClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  theme: PropTypes.oneOf(["primary", "primary-animated", "gray"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
