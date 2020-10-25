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
      <div className="file">
        <div className="file__type">Image</div>
        <div>{this.props.file.name}</div>
        {/* <video src={videoSrc} controls></video> */}
      </div>
    );
  }
}

File.propTypes = {
  file: PropTypes.object,
};

export default File;
