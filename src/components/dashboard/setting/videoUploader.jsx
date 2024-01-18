import axios from "axios";

const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUDENAME = "dov60yweq";

const videoUploader = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/video/upload`,
            formData
        );
        const publicId = response?.data?.public_id;

        const videoUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUDENAME}/video/upload/${publicId}`;

        return [videoUrl, response?.statusText];
    } catch (error) {
        console.error("Error uploading video:", error);

        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        throw error; // Rethrow the error to handle it further up the call stack
    }
};

export default videoUploader;