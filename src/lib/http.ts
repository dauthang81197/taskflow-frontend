import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    withCredentials: true,
});

export const apiWithAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    withCredentials: true,
});

// =====================
// Error Type + Parser
// =====================
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
            "An unexpected error occurred. Please try again.";

        return {
            message,
            statusCode: error.response?.status,
            errors: error.response?.data?.errors,
        };
    }

    return {message: "An unexpected error occurred. Please try again."};
}

// =====================
// Token Helpers
// =====================
function getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
}

function setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
}

function clearAuth() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}

// =====================
// Auth Interceptors
// =====================

// Request interceptor → attach access token
apiWithAuth.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → auto refresh if 401 Unauthorized
let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

apiWithAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Not a 401 → just pass the error
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Already retried once → force logout
        if (originalRequest._retry) {
            clearAuth();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // Mark as retried
        originalRequest._retry = true;

        if (isRefreshing) {
            // If another request is already refreshing, wait for it
            return new Promise<void>((resolve) => {
                pendingRequests.push(() => resolve());
            })
                .then(() => apiWithAuth(originalRequest))
                .catch(Promise.reject);
        }

        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) throw new Error("No refresh token available");

            // Call your refresh token API
            const res = await api.post("/auth/refresh", {refreshToken});
            const newAccessToken = res.data.accessToken;

            setAccessToken(newAccessToken);

            // Replay all queued requests
            pendingRequests.forEach((cb) => cb());
            pendingRequests = [];

            // Retry original request
            return apiWithAuth(originalRequest);
        } catch (refreshErr) {
            console.error("Token refresh failed:", refreshErr);
            clearAuth();
            window.location.href = "/login";
            return Promise.reject(refreshErr);
        } finally {
            isRefreshing = false;
        }
    }
);
