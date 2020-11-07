import React from "react";
import PropTypes from "prop-types";
import Button from "ui-components/Button";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import "./styles.scss";

class Actions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get currentStep() {
    switch (this.props.currentStepNumber) {
      // Is the file not selected
      case 1:
        return {
          number: 1,
          selectButtonTheme: "primary-animated",
          selectButtonText: "Select image",
        };
      // Is the file selected, but not converted
      case 2:
        return {
          number: 2,
          selectButtonTheme: "gray",
          selectButtonText: "Change image",
        };
      // Is the file selected and converted
      case 3:
        return {
          number: 3,
          selectButtonTheme: "gray",
          selectButtonText: "Select other image",
        };
      // other
      default:
        return {
          number: 0,
          selectButtonTheme: "gray",
          selectButtonText: "Select image",
        };
    }
  }

  handleOuterState(newState) {
    this.props.handleOuterState(newState);
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

  async doTranscode() {
    this.handleOuterState({ convertingStatus: "doing", isConverting: true });

    try {
      const form = this.props.form;
      const file = this.props.file;
      const re = /(?:\.([^.]+))?$/;
      const fileExtension = re.exec(file.name)[1];
      const ffmpeg = createFFmpeg();

      this.handleOuterState({ convertingStatus: "preparing" });

      if (!form.width || !form.height || !form.duration) {
        throw { message: "you set up the form incorrectly:(" };
      }

      if (form.height > 4000 || form.width > 4000 || form.duration > 60) {
        const description = "Bro, this will put a lot of stress on your computer.";
        if (!confirm(`${description} Do you want to continue?`)) {
          this.handleOuterState({ convertingStatus: "doing", isConverting: false });
          return;
        }
      }

      await ffmpeg.load();
      await ffmpeg.write(`input.${fileExtension}`, file);

      this.handleOuterState({ convertingStatus: "converting" });

      const firstPart = `-loop 1 -r 30 -i "input.${fileExtension}" -t ${form.duration}`;
      const secondPart = `-vf "scale=${form.width}:${form.height},format=yuv420p" -codec:v libx264 output.mp4`;
      await ffmpeg.run(`${firstPart} ${secondPart}`);

      this.handleOuterState({ convertingStatus: "loading" });

      const data = ffmpeg.read("output.mp4");
      this.handleOuterState({
        fileVideoUrl: URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })),
      });

      this.handleOuterState({ isVideoConverted: true });
    } catch (error) {
      alert("🥴 Error: " + error.message);
    }

    this.handleOuterState({ convertingStatus: "doing", isConverting: false });
  }

  deleteVideoFile() {
    if (confirm("Are you sure you want to delete this video file and go to previous step?")) {
      this.handleOuterState({ isVideoConverted: false, fileVideoUrl: null });
    }
  }

  downloadVideo() {
    try {
      const re = /(?:\.([^.]+))?$/;
      const nameWithoutExtension = this.props.file.name.replace(re, "");
      const fileVideoName = nameWithoutExtension + ".mp4";

      const link = document.createElement("a");
      link.download = fileVideoName;
      link.href = this.props.fileVideoUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // delete link;
    } catch (error) {
      alert("🥴 Error: " + error.message);
    }
  }

  render() {
    return (
      <div className="buttons-header">
        <div
          className={`buttons-header__item-wrapper ${
            this.currentStep.number > 1 ? "" : "not-selected"
          }`}
        >
          <Button theme={this.currentStep.selectButtonTheme}>
            <div className="buttons-header__item">
              <input type="file" accept="image/*" onChange={(event) => this.onChangeFile(event)} />
              <span>{this.currentStep.selectButtonText}</span>
            </div>
          </Button>
        </div>

        {this.currentStep.number == 2 ? (
          <div className="buttons-header__item-wrapper">
            <Button onClick={() => this.doTranscode()}>Convert</Button>
          </div>
        ) : null}

        {this.currentStep.number == 3 ? (
          <div className="buttons-header__item-wrapper">
            <Button theme="gray" onClick={() => this.deleteVideoFile()}>
              Set other parameters
            </Button>
          </div>
        ) : null}

        {this.currentStep.number == 3 ? (
          <div className="buttons-header__item-wrapper download">
            <Button theme="primary-animated" onClick={() => this.downloadVideo()}>
              Download video
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

Actions.propTypes = {
  file: PropTypes.object,
  currentStepNumber: PropTypes.object,
  fileVideoUrl: PropTypes.string,
  form: PropTypes.object,
  handleOuterState: PropTypes.func,
};

export default Actions;
