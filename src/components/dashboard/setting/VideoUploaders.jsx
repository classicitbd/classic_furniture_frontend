
import axios from "axios";
import { BASE_URL } from "../../../utils/baseURL";

const VideoUploaders = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    try {
        const response = await axios.post(
            // Endpoint URL of your server where the file will be uploaded to DigitalOcean Spaces
            `${BASE_URL}/videoUpload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const imageUrl = response?.data?.data?.Location;
        return [imageUrl, response?.statusText];
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

export default VideoUploaders;



// import axios from "axios";

// const CLOUDINARY_PRESET = "ml_default";
// const CLOUDINARY_CLOUDENAME = "dykzl2grb";

// const VideoUploaders = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_PRESET);

//     try {
//         const response = await axios.post(
//             `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/video/upload`,
//             formData
//         );
//         const publicId = response?.data?.public_id;

//         const videoUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUDENAME}/video/upload/${publicId}`;

//         return [videoUrl, response?.statusText];
//     } catch (error) {
//         console.error("Error uploading video:", error);

//         if (error.response) {
//             console.error("Error response:", error.response.data);
//         }
//         throw error; // Rethrow the error to handle it further up the call stack
//     }
// };

// export default VideoUploaders;