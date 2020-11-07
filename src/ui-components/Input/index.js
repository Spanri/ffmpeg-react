import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <input
        className="ui-input"
        type={this.props.type}
        value={this.props.value}
        onChange={(event) => this.handleChange(event)}
      />
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Button;
