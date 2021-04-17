import React from "react";
import PropTypes from "prop-types";

import Button from "@ui-components/Button";

import { doTranscode } from "@helpers/ffmpeg.helper";

class ConvertButton extends React.Component {
  handleOuterState(newState) {
    this.props.handleOuterState(newState);
  }

  async handleTranscode() {
    // this.props.setStatus("doing");
    this.handleOuterState({ convertingStatus: "doing", isConverting: true });

    const data = {
      form: this.props.form,
      file: this.props.file,
      setStatus: this.props.setStatus,
    };

    const result = await doTranscode(data);

    if (result.error) {
      alert("🥴 Error: " + result.error.message);
    } else {
      this.handleOuterState({ fileVideoUrl: result.fileVideoUrl, isVideoConverted: true });
    }

    // this.props.setStatus("doing");
    this.handleOuterState({ convertingStatus: "doing", isConverting: false });
  }

  render() {
    return (
      <div className="buttons-header__item-wrapper">
        <Button onClick={() => this.handleTranscode()}>Convert</Button>
      </div>
    );
  }
}

ConvertButton.propTypes = {
  file: PropTypes.object,
  form: PropTypes.object,
  setStatus: PropTypes.func,
  handleOuterState: PropTypes.func,
};

export default ConvertButton;
