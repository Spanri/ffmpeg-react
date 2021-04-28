import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const File = (props) => {
  const currentFile = (() => {
    switch (true) {
      // Image
      case !!props.fileImageBase64 && !props.fileVideoUrl:
        return {
          type: "Image",
          title: props.file.name,
          htmlContent: <img className="file__content" src={props.fileImageBase64} alt="Loaded" />,
        };

      // Video
      case !!props.fileImageBase64 && !!props.fileVideoUrl:
        return (() => {
          const re = /(?:\.([^.]+))?$/;
          const nameWithoutExtension = props.file.name.replace(re, "");
          const fileVideoName = nameWithoutExtension + ".mp4";

          return {
            type: "Video",
            title: fileVideoName,
            htmlContent: (
              <video className="file__content" controls>
                <source src={props.fileVideoUrl} type="video/mp4" />
              </video>
            ),
          };
        })();

      // other
      default:
        return {
          type: "",
          title: "",
          htmlContent: null,
        };
    }
  })();

  return (
    <div className="file-wrapper">
      <div className="file__type">{currentFile.type}</div>

      <div className="file">
        <div className="file__title">{currentFile.title}</div>
        {currentFile.htmlContent}
      </div>
    </div>
  );
};

File.propTypes = {
  file: PropTypes.object,
  fileImageBase64: PropTypes.string,
  fileVideoUrl: PropTypes.string,
};

export default File;
