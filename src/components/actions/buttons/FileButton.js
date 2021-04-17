import React from "react";
import PropTypes from "prop-types";

import Button from "@ui-components/Button";

class FileButton extends React.Component {
  handleOuterState(newState) {
    this.props.handleOuterState(newState);
  }

  get currentStep() {
    switch (this.props.currentStepNumber) {
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
  }

  /**
   * Select/change image file
   */
  onChangeFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (["image/gif", "image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      this.handleOuterState({ file: event.target.files[0] });

      if (FileReader) {
        const self = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function (e) {
          self.handleOuterState({ fileImageBase64: e.target.result });
        };
      } else {
        alert("🤕 Not supported in your browser:(");
      }

      this.handleOuterState({ fileVideoUrl: null });
    } else {
      alert("🤧 You selected not an image!");
    }
  }

  render() {
    return (
      <div>
        <Button theme={this.currentStep.selectButtonTheme}>
          <div className="buttons-header__item">
            <input type="file" accept="image/*" onChange={(event) => this.onChangeFile(event)} />
            <span>{this.currentStep.selectButtonText}</span>
          </div>
        </Button>{" "}
      </div>
    );
  }
}

FileButton.propTypes = {
  currentStepNumber: PropTypes.number,
  handleOuterState: PropTypes.func,
};

export default FileButton;
