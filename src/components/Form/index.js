import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import Input from "@ui-components/Input";

const File = (props) => {
  return (
    <div className="form">
      <div className="form__item">
        <span className="form__label">Width (pixel):</span>
        <Input
          type="number"
          value={props.form.width}
          onChange={(value) => props.onChange({ width: value })}
        />
      </div>

      <div className="form__item">
        <span className="form__label">Height (pixel):</span>
        <Input
          type="number"
          value={props.form.height}
          onChange={(value) => props.onChange({ height: value })}
        />
      </div>

      <div className="form__item">
        <span className="form__label">Duration (sec):</span>
        <Input
          type="number"
          value={props.form.duration}
          onChange={(value) => props.onChange({ duration: value })}
        />
      </div>
    </div>
  );
};

File.propTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func,
};

export default File;
