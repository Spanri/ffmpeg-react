import React from "react";
import PropTypes from "prop-types";
import Input from "ui-components/Input";
import "./styles.scss";

class File extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        <div className="form__item">
          <span className="form__label">Width (pixel):</span>
          <Input
            type="text"
            value={this.props.form.width}
            onChange={(event) => this.props.handleStateForm({ width: event.target.value })}
          />
        </div>

        <div className="form__item">
          <span className="form__label">Height (pixel):</span>
          <Input
            type="text"
            value={this.props.form.height}
            onChange={(event) => this.props.handleStateForm({ height: event.target.value })}
          />
        </div>

        <div className="form__item">
          <span className="form__label">Duration (sec):</span>
          <Input
            type="text"
            value={this.props.form.duration}
            onChange={(event) => this.props.handleStateForm({ duration: event.target.value })}
          />
        </div>
      </div>
    );
  }
}

File.propTypes = {
  form: PropTypes.object,
  handleStateForm: PropTypes.func,
};

export default File;
