import {api, apiWithAuth} from "@/lib/http";
import type {
    AddCommentPayload,
    Comment,
    CreateProjectPayload,
    CreateTaskPayload,
    Project,
    Task,
    UpdateProjectPayload,
    UpdateTaskPayload,
} from "./types";

// Projects
export async function fetchProjects() {
    const res = await api.get<Project[]>("/projects");
    return res.data;
}

export async function fetchProject(projectId: string) {
    const res = await api.get<Project>(`/projects/${projectId}`);
    return res.data;
}

export async function createProject(payload: CreateProjectPayload) {
    const res = await apiWithAuth.post<Project>("/projects", payload);
    return res.data;
}

export async function updateProject(
    projectId: string,
    payload: UpdateProjectPayload
) {
    const res = await api.patch<Project>(`/projects/${projectId}`, payload);
    return res.data;
}

// Tasks
export async function fetchTasks(projectId: string) {
    const res = await api.get<Task[]>(`/projects/${projectId}/tasks`);
    return res.data;
}

export async function createTask(payload: CreateTaskPayload) {
    const res = await api.post<Task>(`/projects/${payload.projectId}/tasks`, payload);
    return res.data;
}

export async function updateTask(taskId: string, payload: UpdateTaskPayload) {
    const res = await api.patch<Task>(`/tasks/${taskId}`, payload);
    return res.data;
}

// Comments
export async function fetchComments(taskId: string) {
    const res = await api.get<Comment[]>(`/tasks/${taskId}/comments`);
    return res.data;
}

export async function addComment(payload: AddCommentPayload) {
    const res = await api.post<Comment>(`/tasks/${payload.taskId}/comments`, payload);
    return res.data;
}

