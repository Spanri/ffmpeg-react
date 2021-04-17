import { createFFmpeg } from "@ffmpeg/ffmpeg";

/**
 *
 * @param {Object} form
 * @param {*} file
 * @param {Function} setStatus
 * @returns {Object} { error?, fileVideoUrl? }
 */
export const doTranscode = async ({ form, file, setStatus }) => {
  try {
    const re = /(?:\.([^.]+))?$/;
    const fileExtension = re.exec(file.name)[1];
    const ffmpeg = createFFmpeg();

    setStatus("preparing");

    if (!form.width || !form.height || !form.duration) {
      throw Error({ message: "you set up the form incorrectly:(" });
    }

    const MAX_HEIGHT = 5000;
    const MAX_WIDTH = 5000;
    const MAX_DURATION = 60;

    if (form.height > MAX_HEIGHT || form.width > MAX_WIDTH || form.duration > MAX_DURATION) {
      const rules = `max: w - ${MAX_WIDTH}, h - ${MAX_HEIGHT}, d - ${MAX_DURATION}`;
      throw Error({
        message: `too big parameters, the application will crash... (${rules})`,
      });
    }

    await ffmpeg.load();
    await ffmpeg.write(`input.${fileExtension}`, file);

    setStatus("converting");

    const firstPart = `-loop 1 -r 30 -i "input.${fileExtension}" -t ${form.duration}`;
    const secondPart = `-vf "scale=${form.width}:${form.height},format=yuv420p" -codec:v libx264 output.mp4`;
    await ffmpeg.run(`${firstPart} ${secondPart}`);

    setStatus("loading");

    const data = ffmpeg.read("output.mp4");
    const fileVideoUrl = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    return { fileVideoUrl };
  } catch (error) {
    return { error };
  }
};
