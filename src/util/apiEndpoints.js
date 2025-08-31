// export const BASE_URL = "https://cash-coach-backend.onrender.com/api";
export const BASE_URL = "http://localhost:8080/api";
const CLOUDINARY_CLOUD_NAME = "dd27dpjpn";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    ADD: "/add",
    GET_PROFILE: "/profile",
    GET_ALL_CATEGORIES:"/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (id) => `/categories/${id}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/incomes",
    EMAIL_INCOME: "/email/income-excel",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}