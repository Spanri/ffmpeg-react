import React from "react";
import "./App.scss";
import Button from "./ui-components/Button";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileInfo: null,
    };
  }

  showFile(event) {
    let file = event.target.files[0];
    this.setState({ file: file });
    this.setState({ fileInfo: file.name });
  }

  componentDidMount() {
    if (this.file) {
      this.setState({ fileInfo: this.file.name });
    }
  }

  render() {
    let fileInfo;

    return (
      <div className="app-wrapper">
        <div className="app">
          <header className="app__header">
            <strong className="app__header-title">FFMPEG</strong>
            <div className="app__header-description">Преобразование картинки в видео</div>
          </header>
          <Button>
            <div className="app__button">
              <input
                className="app__button-input"
                type="file"
                accept="image/*"
                onChange={() => this.showFile.bind(this)}
              />
              <span>{this.file ? "Поменять файл" : "Выбрать файл"}</span>
            </div>
          </Button>
          {fileInfo ? fileInfo : <div className="app__space" />}
        </div>
      </div>
    );
  }
}

export default App;
