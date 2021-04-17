import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import Input from "@ui-components/Input";

class File extends React.Component {
  render() {
    return (
      <div className="form">
        <div className="form__item">
          <span className="form__label">Width (pixel):</span>
          <Input
            type="number"
            value={this.props.form.width}
            onChange={(value) => this.props.onChange({ width: value })}
          />
        </div>

        <div className="form__item">
          <span className="form__label">Height (pixel):</span>
          <Input
            type="number"
            value={this.props.form.height}
            onChange={(value) => this.props.onChange({ height: value })}
          />
        </div>

        <div className="form__item">
          <span className="form__label">Duration (sec):</span>
          <Input
            type="number"
            value={this.props.form.duration}
            onChange={(value) => this.props.onChange({ duration: value })}
          />
        </div>
      </div>
    );
  }
}

File.propTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func,
};

export default File;
