import React from "react";
import PropTypes from "prop-types";

import { doTranscode } from "@helpers/ffmpeg.helper";
import { STATUS_DOING } from "@helpers/status.helper";

import { useDispatch } from "react-redux";
import { setConvertingStatus, setIsConverting } from "@store/status";

import Button from "@ui-components/Button";

const ConvertButton = (props) => {
  const dispatch = useDispatch();

  const handleTranscode = async () => {
    dispatch(setConvertingStatus(STATUS_DOING));
    dispatch(setIsConverting(true));

    const data = {
      form: props.form,
      file: props.file,
      setStatus: (status) => dispatch(setConvertingStatus(status)),
    };

    const result = await doTranscode(data);

    if (result.error) {
      alert("🥴 Error: " + result.error.message);
    } else {
      props.onSetFileVideoUrl(result.fileVideoUrl);
    }

    dispatch(setConvertingStatus(STATUS_DOING));
    dispatch(setIsConverting(false));
  };

  return (
    <div className="buttons-header__item-wrapper">
      <Button onClick={() => handleTranscode()}>Convert</Button>
    </div>
  );
};

ConvertButton.propTypes = {
  file: PropTypes.object,
  form: PropTypes.object,
  onSetFileVideoUrl: PropTypes.func,
};

export default ConvertButton;
