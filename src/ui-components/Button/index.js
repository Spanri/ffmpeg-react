import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return <button className="ui-button">{this.props.children}</button>;
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Button;
