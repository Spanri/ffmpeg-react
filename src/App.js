import React from "react";
import "regenerator-runtime/runtime.js";
import { YMInitializer } from "react-yandex-metrika";
import "./App.scss";

import Actions from "@components/actions/Index";
import Form from "@components/Form";
import File from "@components/File";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      YMAccount: 69129496,
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
      case !this.state.file:
        return {
          number: 1,
          icons: "🦄🦄🦄",
        };
      // Is the file selected, but not converted
      case !!this.state.file && !this.state.fileVideoUrl:
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
    const YMAccount = this.state.YMAccount;
    const form = this.state.form;
    const currentStep = this.currentStep;
    const file = this.state.file;
    const fileImageBase64 = this.state.fileImageBase64;
    const fileVideoUrl = this.state.fileVideoUrl;
    const isConverting = this.state.isConverting;
    const convertingStatus = this.state.convertingStatus;

    return (
      <div className="app-wrapper">
        <div className="app">
          {/* title */}
          <header className="app__header">
            <strong className="app__header-title">FFMPEG {currentStep.icons}</strong>
            <div className="app__header-description">Image to video conversion</div>
          </header>

          {/* actions for file */}
          {isConverting ? (
            <div className="app__doing loading">{convertingStatus}</div>
          ) : (
            <div className="app__actions-and-form">
              <Actions
                file={file}
                currentStepNumber={currentStep.number}
                fileVideoUrl={fileVideoUrl}
                form={form}
                setConvertingStatus={(status) => this.handleState({ convertingStatus: status })}
                onCancel={() => this.handleState({ isVideoConverted: false, fileVideoUrl: null })}
                handleOuterState={(newState) => this.handleState(newState)}
              />

              {currentStep.number === 2 && (
                <Form form={form} onChange={(newForm) => this.handleStateForm(newForm)} />
              )}
            </div>
          )}

          {/* content of file */}
          {currentStep.number > 1 && (
            <File file={file} fileImageBase64={fileImageBase64} fileVideoUrl={fileVideoUrl} />
          )}

          {/* empty space */}
          <div style={{ height: currentStep.number > 1 ? "20vh" : "30vh" }} />
        </div>

        <YMInitializer accounts={[YMAccount]} />
      </div>
    );
  }
}

export default App;
