import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import FileButton from "./buttons/FileButton";
import ConvertButton from "./buttons/ConvertButton";
import DownloadButton from "./buttons/DownloadButton";
import CancelButton from "./buttons/CancelButton";

const Actions = (props) => {
  return (
    <div className="buttons-header">
      <div
        className={`buttons-header__item-wrapper ${
          props.currentStepNumber > 1 ? "" : "not-selected"
        }`}
      >
        <FileButton
          currentStepNumber={props.currentStepNumber}
          handleOuterState={props.handleOuterState}
          onSetFile={props.onSetFile}
          onSetFileVideoUrl={props.onSetFileVideoUrl}
          onSetFileImageBase64={props.onSetFileImageBase64}
        />
      </div>

      {props.currentStepNumber === 2 && (
        <ConvertButton
          file={props.file}
          form={props.form}
          onSetFileVideoUrl={props.onSetFileVideoUrl}
        />
      )}

      {props.currentStepNumber === 3 && <CancelButton onCancel={props.onCancel} />}

      {props.currentStepNumber === 3 && (
        <DownloadButton file={props.file} fileVideoUrl={props.fileVideoUrl} />
      )}
    </div>
  );
};

Actions.propTypes = {
  file: PropTypes.object,
  currentStepNumber: PropTypes.number,
  fileVideoUrl: PropTypes.string,
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSetFile: PropTypes.func,
  onSetFileVideoUrl: PropTypes.func,
  onSetFileImageBase64: PropTypes.func,
  handleOuterState: PropTypes.func,
};

export default Actions;
