import React from "react";
import PropTypes from "prop-types";

import Button from "@ui-components/Button";

const DownloadButton = (props) => {
  const downloadVideo = () => {
    try {
      const re = /(?:\.([^.]+))?$/;
      const nameWithoutExtension = props.file.name.replace(re, "");
      const fileVideoName = nameWithoutExtension + ".mp4";

      const link = document.createElement("a");
      link.download = fileVideoName;
      link.href = props.fileVideoUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // delete link;
    } catch (error) {
      alert("🥴 Error: " + error.message);
    }
  };

  return (
    <div className="buttons-header__item-wrapper download">
      <Button theme="primary-animated" onClick={() => downloadVideo()}>
        Download video
      </Button>
    </div>
  );
};

DownloadButton.propTypes = {
  file: PropTypes.object,
  fileVideoUrl: PropTypes.string,
};

export default DownloadButton;
