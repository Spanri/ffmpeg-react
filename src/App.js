import React from "react";
import "regenerator-runtime/runtime.js";
import "./App.scss";

import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Button from "ui-components/Button";
import File from "components/File";

import "./assets/styles/index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileImage: null,
      fileVideo: null,
      isConverting: false,
    };
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
    return !!this.state.fileVideo;
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
          self.setState({ fileImage: e.target.result });
        };
      } else {
        alert("Not supported in your browser:(");
      }

      this.setState({ isVideoConverted: false });
    } else {
      alert("You selected not a picture!");
    }
  }

  async doTranscode() {
    this.setState({ isConverting: true });

    try {
      const ffmpeg = createFFmpeg();
      await ffmpeg.load();
      await ffmpeg.write(this.state.file.name, this.state.file);
      await ffmpeg.run(
        "-loop",
        "1",
        "-r",
        "30",
        "-i",
        this.state.file.name,
        "-t",
        "5",
        "-vf",
        "'scale=1440:720,format=yuv420p'",
        "-codec:v",
        "libx264",
        "output.mp4"
      );
      // await ffmpeg.transcode("test.jpg", "test.mp4", );
      console.log("pre-data", ffmpeg);
      const data = ffmpeg.read("output.mp4");
      console.log("data", data);
      this.setState({
        fileVideo: URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })),
      });

      this.setState({ isVideoConverted: true });
    } catch (error) {
      console.log(error);
      alert("Error: " + error.message);
    }

    this.setState({ isConverting: false });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <header className="app__header">
            <strong className="app__header-title">
              FFMPEG{" "}
              {this.isFileSelected ? (this.isVideoConverted ? "🐸🐸🐸🐸🐸" : "🐺🐺🐺🐺") : "🦄🦄🦄"}
            </strong>
            <div className="app__header-description">Image to video conversion</div>
          </header>

          <div className="app__buttons">
            <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
              <Button theme={this.isFileSelected ? "gray" : "primary-animated"}>
                <div className="app__button">
                  <input
                    className="app__button-input"
                    type="file"
                    accept="image/*"
                    onChange={(event) => this.onChangeFile(event)}
                  />
                  <span>{this.state.file ? "Change image" : "Select image"}</span>
                </div>
              </Button>
            </div>

            {this.isFileSelected ? (
              <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
                {this.state.isConverting}
                <Button disabled={this.state.isConverting} onClick={() => this.doTranscode()}>
                  <div className="app__button">
                    <span>Convert</span>
                  </div>
                </Button>

                {this.state.isConverting ? <div className="app__doing">doing...</div> : null}
              </div>
            ) : null}
          </div>

          {this.isFileSelected ? (
            <File
              file={this.state.file}
              fileImage={this.state.fileImage}
              fileVideo={this.state.fileVideo}
            />
          ) : null}

          <div className="app__space" style={{ height: this.isFileSelected ? "20vh" : "30vh" }} />
        </div>
      </div>
    );
  }
}

export default App;
