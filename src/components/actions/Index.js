import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import FileButton from "./buttons/FileButton";
import ConvertButton from "./buttons/ConvertButton";
import DownloadButton from "./buttons/DownloadButton";
import CancelButton from "./buttons/CancelButton";

class Actions extends React.Component {
  render() {
    return (
      <div className="buttons-header">
        <div
          className={`buttons-header__item-wrapper ${
            this.props.currentStepNumber > 1 ? "" : "not-selected"
          }`}
        >
          <FileButton
            currentStepNumber={this.props.currentStepNumber}
            handleOuterState={this.props.handleOuterState}
          />
        </div>

        {this.props.currentStepNumber === 2 && (
          <ConvertButton
            file={this.props.file}
            form={this.props.form}
            setStatus={this.props.setConvertingStatus}
            handleOuterState={this.props.handleOuterState}
          />
        )}

        {this.props.currentStepNumber === 3 && <CancelButton onCancel={this.props.onCancel} />}

        {this.props.currentStepNumber === 3 && (
          <DownloadButton file={this.props.file} fileVideoUrl={this.props.fileVideoUrl} />
        )}
      </div>
    );
  }
}

Actions.propTypes = {
  file: PropTypes.object,
  currentStepNumber: PropTypes.number,
  fileVideoUrl: PropTypes.string,
  form: PropTypes.object,
  setConvertingStatus: PropTypes.func,
  onCancel: PropTypes.func,
  handleOuterState: PropTypes.func,
};

export default Actions;
