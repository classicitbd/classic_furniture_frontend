export const ImageValidate = (file) => {
    const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    if (file && supportedImageTypes.includes(file.type)) {
        return true;
    } else {
        return false;
    }
};