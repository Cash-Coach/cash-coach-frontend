// export const BASE_URL = "https://cash-coach-backend.onrender.com/api";
export const BASE_URL = "http://localhost:8080/api";
const CLOUDINARY_CLOUD_NAME = "dd27dpjpn";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    ADD: "/add",
    GET_PROFILE: "/profile",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}