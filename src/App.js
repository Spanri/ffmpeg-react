import React from "react";
import "regenerator-runtime/runtime.js";
import "./App.scss";

// import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Button from "ui-components/Button";
import File from "components/File";

import "./assets/styles/index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileImage: null,
      videoFile: null,
    };
  }

  /**
   * Is the file selected
   */
  get isFileSelected() {
    return !!this.state.file;
  }

  /**
   * Select/change image file
   */
  onChangeFile = (event) => {
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
          console.log(typeof e.target.result);
        };
      } else {
        alert("Not supported in your browser:(");
      }
    } else {
      alert("You selected not a picture!");
    }
  };

  doTranscode = async () => {
    // const ffmpeg = createFFmpeg();
    // // setMessage('Loading ffmpeg-core.js');
    // await ffmpeg.load();
    // // setMessage('Start transcoding');
    // await ffmpeg.write("test.avi", "/flame.avi");
    // await ffmpeg.transcode("test.avi", "test.mp4");
    // // setMessage('Complete transcoding');
    // const data = ffmpeg.read("test.mp4");
    // this.setState({
    //   videoFile: URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })),
    // });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <header className="app__header">
            <strong className="app__header-title">
              FFMPEG {this.isFileSelected ? "🐺🐺🐺🐺" : "🦄🦄🦄"}
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
                    onChange={this.onChangeFile}
                  />
                  <span>{this.state.file ? "Change image" : "Select image"}</span>
                </div>
              </Button>
            </div>

            {this.isFileSelected ? (
              <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
                <Button onChange={this.doTranscode}>
                  <div className="app__button">
                    <span>Convert</span>
                  </div>
                </Button>
              </div>
            ) : null}
          </div>

          {this.isFileSelected ? (
            <File file={this.state.file} fileImage={this.state.fileImage} />
          ) : null}

          <div className="app__space" style={{ height: this.isFileSelected ? "20vh" : "30vh" }} />
        </div>
      </div>
    );
  }
}

export default App;
