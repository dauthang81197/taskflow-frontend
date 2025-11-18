import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addComment,
    createProject,
    createTask,
    fetchComments,
    fetchProject,
    fetchProjects,
    fetchTasks,
    updateProject,
    updateTask,
} from "./api";
import type {
    AddCommentPayload,
    CreateProjectPayload,
    CreateTaskPayload,
    Project,
    Task,
    UpdateProjectPayload,
    UpdateTaskPayload,
} from "./types";
import {PaginationCommon} from "@/common/common.interface";

export const projectKeys = {
    all: ["projects"] as const,
    list: () => [...projectKeys.all, "list"] as const,
    byId: (projectId: string) => [...projectKeys.all, projectId] as const,
    tasks: (projectId: string) => [...projectKeys.all, projectId, "tasks"] as const,
    comments: (taskId: string) => ["tasks", taskId, "comments"] as const,
};

export function useProjectsQuery() {
    return useQuery<PaginationCommon<Project>>({
        queryKey: projectKeys.list(),
        queryFn: fetchProjects,
    });
}

export function useProjectQuery(projectId: string) {
    return useQuery<Project>({
        queryKey: projectKeys.byId(projectId),
        queryFn: () => fetchProject(projectId),
        enabled: !!projectId,
    });
}

export function useTasksQuery(projectId: string) {
    return useQuery<Task[]>({
        queryKey: projectKeys.tasks(projectId),
        queryFn: () => fetchTasks(projectId),
        enabled: !!projectId,
    });
}

export function useCreateProjectMutation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateProjectPayload) => createProject(payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: projectKeys.list()});
        },
    });
}

export function useUpdateProjectMutation(projectId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateProjectPayload) =>
            updateProject(projectId, payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: projectKeys.byId(projectId)});
            qc.invalidateQueries({queryKey: projectKeys.list()});
        },
    });
}

export function useCreateTaskMutation(projectId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateTaskPayload) => createTask(payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: projectKeys.tasks(projectId)});
        },
    });
}

export function useUpdateTaskMutation(projectId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
                         taskId,
                         payload,
                     }: {
            taskId: string;
            payload: UpdateTaskPayload;
        }) => updateTask(taskId, payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: projectKeys.tasks(projectId)});
        },
    });
}

export function useCommentsQuery(taskId: string) {
    return useQuery({
        queryKey: projectKeys.comments(taskId),
        queryFn: () => fetchComments(taskId),
        enabled: !!taskId,
    });
}

export function useAddCommentMutation(taskId: string, projectId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: AddCommentPayload) => addComment(payload),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: projectKeys.comments(taskId)});
            qc.invalidateQueries({queryKey: projectKeys.tasks(projectId)});
        },
    });
}

