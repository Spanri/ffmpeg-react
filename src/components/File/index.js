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
          <img className="file__image" src={this.props.fileImage} alt="Loaded image" width="400" />
        </div>

        <div className="file__type">Image</div>
      </div>
    );
  }
}

File.propTypes = {
  file: PropTypes.object,
  fileImage: PropTypes.file,
};

export default File;
