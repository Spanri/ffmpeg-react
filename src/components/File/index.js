import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className="file">{this.props.fileInfo.name}</div>;
  }
}

File.propTypes = {
  fileInfo: PropTypes.object,
};

export default File;
