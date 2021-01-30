import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get currentFile() {
    switch (true) {
      // Image
      case !!this.props.fileImageBase64 && !this.props.fileVideoUrl:
        return {
          type: "Image",
          title: this.props.file.name,
          htmlContent: (
            <img className="file__content" src={this.props.fileImageBase64} alt="Loaded" />
          ),
        };

      // Video
      case !!this.props.fileImageBase64 && !!this.props.fileVideoUrl:
        const re = /(?:\.([^.]+))?$/;
        const nameWithoutExtension = this.props.file.name.replace(re, "");
        const fileVideoName = nameWithoutExtension + ".mp4";

        return {
          type: "Video",
          title: fileVideoName,
          htmlContent: (
            <video className="file__content" controls>
              <source src={this.props.fileVideoUrl} type="video/mp4" />
            </video>
          ),
        };

      // other
      default:
        return {
          type: "",
          title: "",
          htmlContent: null,
        };
    }
  }

  render() {
    return (
      <div className="file-wrapper">
        <div className="file__type">{this.currentFile.type}</div>

        <div className="file">
          <div className="file__title">{this.currentFile.title}</div>
          {this.currentFile.htmlContent}
        </div>
      </div>
    );
  }
}

File.propTypes = {
  file: PropTypes.object,
  fileImageBase64: PropTypes.string,
  fileVideoUrl: PropTypes.string,
};

export default File;
