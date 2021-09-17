import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime.js";
import { YMInitializer } from "react-yandex-metrika";
import "./App.scss";
import { useSelector } from "react-redux";

import Actions from "@components/actions/Index";
import Form from "@components/Form";
import File from "@components/File";

const Loader = () => {
  const convertingStatus = useSelector((state) => state.status.convertingStatus);

  const [secLeft, setSecLeft] = useState(0);
  const [startSec, setStartSec] = useState(0);

  useEffect(() => {
    setStartSec(+new Date());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecLeft(Math.round((+new Date() - startSec) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startSec]);

  return (
    <div className="app__doing loading">
      {convertingStatus} ({secLeft} sec)
    </div>
  );
};

const App = () => {
  const YMAccount = 85318249;

  const [file, setFile] = useState(null);
  const [fileImageBase64, setFileImageBase64] = useState("");
  const [fileVideoUrl, setFileVideoUrl] = useState("");

  const [form, setForm] = useState({
    width: 1000,
    height: 500,
    duration: 5,
  });

  const isConverting = useSelector((state) => state.status.isConverting);

  const currentStep = (() => {
    switch (true) {
      // Is the file not selected
      case !file:
        return {
          number: 1,
          icons: "🦄🦄🦄",
        };
      // Is the file selected, but not converted
      case !!file && !fileVideoUrl:
        return {
          number: 2,
          icons: "🐺🐺🐺🐺",
        };
      // Is the file selected and converted
      case !!file && !!fileVideoUrl:
        return {
          number: 3,
          icons: "🐸🐸🐸🐸🐸",
        };
      // other
      default:
        return {
          number: 0,
          icons: "😥😥😥",
        };
    }
  })();

  const handleStateForm = (newForm) => {
    setForm({ ...form, ...newForm });
  };

  const onCancel = () => {
    setFileVideoUrl(null);
  };

  return (
    <div className="app-wrapper">
      <div className="app">
        {/* title */}
        <header className="app__header">
          <strong className="app__header-title">FFMPEG {currentStep.icons}</strong>
          <div className="app__header-description">Image to video conversion</div>
        </header>

        {/* actions for file */}
        {isConverting ? (
          <Loader />
        ) : (
          <div className="app__actions-and-form">
            <Actions
              file={file}
              currentStepNumber={currentStep.number}
              fileVideoUrl={fileVideoUrl}
              form={form}
              onCancel={onCancel}
              onSetFile={setFile}
              onSetFileVideoUrl={setFileVideoUrl}
              onSetFileImageBase64={setFileImageBase64}
            />

            {currentStep.number === 2 && <Form form={form} onChange={handleStateForm} />}
          </div>
        )}

        {/* content of file */}
        {currentStep.number > 1 && (
          <File file={file} fileImageBase64={fileImageBase64} fileVideoUrl={fileVideoUrl} />
        )}

        {/* empty space */}
        <div style={{ height: currentStep.number > 1 ? "20vh" : "30vh" }} />
      </div>

      <YMInitializer
        accounts={[YMAccount]}
        options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true }}
      />
    </div>
  );
};

export default App;
