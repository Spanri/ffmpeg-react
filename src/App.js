import React from "react";
import "./App.scss";
import Button from "./ui-components/Button";
import File from "./components/File";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInfo: null,
    };
  }

  /**
   * Выбран ли файл
   */
  get isFileSelected() {
    return !!this.state.fileInfo;
  }

  /**
   * Выбрать/поменять файл картинки
   */
  onChangeFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (["image/gif", "image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      this.setState({ fileInfo: event.target.files[0] });
    } else {
      alert("Вы выбрали не картинку!");
    }
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <header className="app__header">
            <strong className="app__header-title">FFMPEG</strong>
            <div className="app__header-description">Преобразование картинки в видео</div>
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
                  <span>{this.state.fileInfo ? "Поменять картинку" : "Выбрать картинку"}</span>
                </div>
              </Button>
            </div>

            {this.isFileSelected ? (
              <div className={`app__button-wrapper ${this.isFileSelected ? "selected" : ""}`}>
                <Button>
                  <div className="app__button">
                    <span>Конвертировать</span>
                  </div>
                </Button>
              </div>
            ) : null}
          </div>

          {this.isFileSelected ? (
            <File fileInfo={this.state.fileInfo} />
          ) : (
            <div className="app__space" />
          )}
        </div>
      </div>
    );
  }
}

export default App;
