import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  withCredentials: true,
});

export type ApiError = {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Có lỗi xảy ra, vui lòng thử lại.";

    return {
      message,
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
    };
  }

  return {
    message: "Có lỗi xảy ra, vui lòng thử lại.",
  };
}

