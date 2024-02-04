export const VideoValidate = (file) => {
    const supportedVideoTypes = ['video/mp4'];

    if (file && supportedVideoTypes.includes(file.type)) {
        return true;
    } else {
        return false;
    }
};