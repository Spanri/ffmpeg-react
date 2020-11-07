import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="file-wrapper">
        <div className="file">
          <div className="file__title">
            {this.props.fileImageBase64
              ? this.props.fileVideoUrl
                ? this.fileVideoName
                : this.props.file.name
              : null}
          </div>
          {this.props.fileImageBase64 ? (
            this.props.fileVideoUrl ? (
              <video width="320" height="240" controls>
                <source src={this.props.fileVideoUrl} type="video/mp4" />
              </video>
            ) : (
              <img className="file__image" src={this.props.fileImageBase64} alt="Loaded image" />
            )
          ) : null}
        </div>

        <div className="file__type">
          {this.props.fileImageBase64 ? (this.props.fileVideoUrl ? "Video" : "Image") : null}
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
