import React from "react";
import "regenerator-runtime/runtime.js";
import "./App.scss";
import Button from "ui-components/Button";
import File from "components/File";
import "./assets/styles/index.scss";

import { createFFmpeg } from "@ffmpeg/ffmpeg";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileImageBase64: "",
      fileVideoUrl: "",
      // Is button "Convert" pressed?
      isConverting: false,
      // What to write in the loading plate
      convertingStatus: "",
    };
  }

  get currentStep() {
    switch (true) {
      // Is the file not selected
      case !!!this.state.file:
        return {
          number: 1,
          icons: "🦄🦄🦄",
          selectButtonTheme: "primary-animated",
          selectButtonText: "Select image",
        };
      // Is the file selected, but not converted
      case !!this.state.file && !!!this.state.fileVideoUrl:
        return {
          number: 2,
          icons: "🐺🐺🐺🐺",
          selectButtonTheme: "gray",
          selectButtonText: "Change image",
        };
      // Is the file selected and converted
      case !!this.state.file && !!this.state.fileVideoUrl:
        return {
          number: 3,
          icons: "🐸🐸🐸🐸🐸",
          selectButtonTheme: "primary-animated",
          selectButtonText: "Select other image",
        };
      // other
      default:
        return {
          number: 0,
          icons: "😥😥😥",
          selectButtonTheme: "gray",
          selectButtonText: "Select image",
        };
    }
  }

  /**
   * Is the file selected
   */
  get isFileSelected() {
    return !!this.state.file;
  }

  /**
   * Is the video converted
   */
  get isVideoConverted() {
    return !!this.state.fileVideoUrl;
  }

  get fileVideoName() {
    const re = /(?:\.([^.]+))?$/;
    const nameWithoutExtension = this.state.file.name.replace(re, "");
    return nameWithoutExtension + ".mp4";
  }

  /**
   * Select/change image file
   */
  onChangeFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (["image/gif", "image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      this.setState({ file: event.target.files[0] });

      if (FileReader) {
        const self = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function (e) {
          self.setState({ fileImageBase64: e.target.result });
        };
      } else {
        alert("Not supported in your browser:(");
      }

      this.setState({ fileVideoUrl: false });
    } else {
      alert("You selected not a picture!");
    }
  }

  async doTranscode() {
    this.setState({ convertingStatus: "doing" });
    this.setState({ isConverting: true });

    try {
      const file = this.state.file;
      const re = /(?:\.([^.]+))?$/;
      const fileExtension = re.exec(file.name)[1];
      const ffmpeg = createFFmpeg();

      this.setState({ convertingStatus: "preparing" });

      await ffmpeg.load();
      await ffmpeg.write(`input.${fileExtension}`, file);

      this.setState({ convertingStatus: "converting" });

      await ffmpeg.run(
        `-loop 1 -r 30 -i "input.${fileExtension}" -t 5 -vf "scale=1440:720,format=yuv420p" -codec:v libx264 output.mp4`
      );

      this.setState({ convertingStatus: "loading" });

      const data = ffmpeg.read("output.mp4");
      this.setState({
        fileVideoUrl: URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })),
      });

      this.setState({ isVideoConverted: true });
    } catch (error) {
      alert("Error: " + error.message);
    }

    this.setState({ isConverting: false });
    this.setState({ convertingStatus: "doing" });
  }

  downloadVideo() {
    try {
      const link = document.createElement("a");
      link.download = this.fileVideoName;
      link.href = this.state.fileVideoUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // delete link;
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <header className="app__header">
            <strong className="app__header-title">FFMPEG {this.currentStep.icons}</strong>
            <div className="app__header-description">Image to video conversion</div>
          </header>

          {this.state.isConverting ? (
            <div className="app__doing loading">{this.state.convertingStatus}</div>
          ) : (
            <div className="app__buttons">
              <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
                <Button theme={this.currentStep.selectButtonTheme}>
                  <div className="app__button">
                    <input
                      className="app__button-input"
                      type="file"
                      accept="image/*"
                      onChange={(event) => this.onChangeFile(event)}
                    />
                    <span>{this.currentStep.selectButtonText}</span>
                  </div>
                </Button>
              </div>

              {this.currentStep.number == 2 ? (
                <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
                  <Button onClick={() => this.doTranscode()}>
                    <div className="app__button">
                      <span>Convert</span>
                    </div>
                  </Button>
                </div>
              ) : null}

              {this.currentStep.number == 3 ? (
                <div className="app__button-wrapper download">
                  <Button theme="gray" onClick={() => this.downloadVideo()}>
                    Download video
                  </Button>
                </div>
              ) : null}
            </div>
          )}

          {this.currentStep.number > 1 ? (
            <File
              file={this.state.file}
              fileImageBase64={this.state.fileImageBase64}
              fileVideoUrl={this.state.fileVideoUrl}
            />
          ) : null}

          <div
            className="app__space"
            style={{ height: this.currentStep.number > 1 ? "20vh" : "30vh" }}
          />
        </div>
      </div>
    );
  }
}

export default App;
