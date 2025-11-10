import { api } from "@/lib/http";
import type {
  CredentialsPayload,
  OAuthProvider,
  RegisterPayload,
  Session,
  UpdateProfilePayload,
  UpdateUserRolePayload,
  User,
} from "./types";

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post<User>("/auth/register", payload);
  return response.data;
}

export async function loginWithCredentials(payload: CredentialsPayload) {
  const response = await api.post<{ accessToken: string }>(
    "/auth/login",
    payload
  );
  return response.data;
}

export async function loginWithOAuth(provider: OAuthProvider) {
  const response = await api.get<{ url: string }>(
    `/auth/oauth/${provider}`
  );
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await api.get<User>("/auth/me");
  return response.data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const response = await api.patch<User>("/auth/profile", payload);
  return response.data;
}

export async function fetchUsers() {
  const response = await api.get<User[]>("/users");
  return response.data;
}

export async function updateUserRole(
  userId: string,
  payload: UpdateUserRolePayload
) {
  const response = await api.patch<User>(`/users/${userId}/role`, payload);
  return response.data;
}

export async function fetchSessions() {
  const response = await api.get<Session[]>("/auth/sessions");
  return response.data;
}

export async function revokeSession(sessionId: string) {
  const response = await api.delete(`/auth/sessions/${sessionId}`);
  return response.data;
}

