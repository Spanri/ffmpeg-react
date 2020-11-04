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
          <div className="file__title">{this.props.file.name}</div>
          {this.props.fileImage ? (
            this.props.fileVideo ? (
              <video width="320" height="240" controls>
                <source src={this.props.fileVideo} type="video/mp4" />
              </video>
            ) : (
              <img className="file__image" src={this.props.fileImage} alt="Loaded image" />
            )
          ) : null}
        </div>

        <div className="file__type">Image</div>
      </div>
    );
  }
}

File.propTypes = {
  file: PropTypes.object,
  fileImage: PropTypes.string,
  fileVideo: PropTypes.string,
};

export default File;
