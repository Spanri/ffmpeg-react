import React from "react";
import PropTypes from "prop-types";

import Button from "@ui-components/Button";

const FileButton = (props) => {
  const currentStep = (() => {
    switch (props.currentStepNumber) {
      // Is the file not selected
      case 1:
        return {
          selectButtonTheme: "primary-animated",
          selectButtonText: "Select image",
        };
      // Is the file selected, but not converted
      case 2:
        return {
          selectButtonTheme: "gray",
          selectButtonText: "Change image",
        };
      // Is the file selected and converted
      case 3:
        return {
          selectButtonTheme: "gray",
          selectButtonText: "Select other image",
        };
      // other
      default:
        return {
          selectButtonTheme: "gray",
          selectButtonText: "Select image",
        };
    }
  })();

  /**
   * Select/change image file
   */
  const onChangeFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (["image/gif", "image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      props.onSetFile(file);

      if (FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          props.onSetFileImageBase64(e.target.result);
        };
      } else {
        alert("🤕 Not supported in your browser:(");
      }

      props.onSetFileVideoUrl(null);
    } else {
      alert("🤧 You selected not an image!");
    }
  };

  return (
    <div>
      <Button theme={currentStep.selectButtonTheme}>
        <div className="buttons-header__item">
          <input type="file" accept="image/*" onChange={(event) => onChangeFile(event)} />
          <span>{currentStep.selectButtonText}</span>
        </div>
      </Button>{" "}
    </div>
  );
};

FileButton.propTypes = {
  currentStepNumber: PropTypes.number,
  onSetFile: PropTypes.func,
  onSetFileVideoUrl: PropTypes.func,
  onSetFileImageBase64: PropTypes.func,
};

export default FileButton;
