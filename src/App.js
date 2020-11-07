import React from "react";
import "regenerator-runtime/runtime.js";
import "./App.scss";
import Actions from "components/Actions";
import Form from "components/Form";
import File from "components/File";

import "./assets/styles/index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileImageBase64: "",
      fileVideoUrl: "",
      // form
      form: {
        width: 1000,
        height: 500,
        duration: 5,
      },
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
        };
      // Is the file selected, but not converted
      case !!this.state.file && !!!this.state.fileVideoUrl:
        return {
          number: 2,
          icons: "🐺🐺🐺🐺",
        };
      // Is the file selected and converted
      case !!this.state.file && !!this.state.fileVideoUrl:
        return {
          number: 3,
          icons: "🐸🐸🐸🐸🐸",
        };
      // other
      default:
        return {
          number: 0,
          icons: "😥😥😥",
        };
    }
  }

  handleState(newState) {
    this.setState(newState);
  }

  handleStateForm(newForm) {
    this.setState({ form: { ...this.state.form, ...newForm } });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          {/* title */}
          <header className="app__header">
            <strong className="app__header-title">FFMPEG {this.currentStep.icons}</strong>
            <div className="app__header-description">Image to video conversion</div>
          </header>

          {/* actions for file */}
          {this.state.isConverting ? (
            <div className="app__doing loading">{this.state.convertingStatus}</div>
          ) : (
            <div className="app__actions-and-form">
              <Actions
                file={this.state.file}
                currentStepNumber={this.currentStep.number}
                fileVideoUrl={this.state.fileVideoUrl}
                form={this.state.form}
                handleOuterState={(newState) => this.handleState(newState)}
              />

              {this.currentStep.number == 2 ? (
                <Form
                  form={this.state.form}
                  handleStateForm={(newForm) => this.handleStateForm(newForm)}
                />
              ) : null}
            </div>
          )}

          {!this.state.isConverting}

          {/* content of file */}
          {this.currentStep.number > 1 ? (
            <File
              file={this.state.file}
              fileImageBase64={this.state.fileImageBase64}
              fileVideoUrl={this.state.fileVideoUrl}
            />
          ) : null}

          {/* empty space */}
          <div style={{ height: this.currentStep.number > 1 ? "20vh" : "30vh" }} />
        </div>
      </div>
    );
  }
}

export default App;
