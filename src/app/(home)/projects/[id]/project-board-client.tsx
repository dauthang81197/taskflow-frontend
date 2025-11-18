"use client";

import {useProjectQuery, useTasksQuery} from "@/features/projects/hooks";
import {TaskBoard} from "@/features/projects/components/task-board";

export default function ProjectBoardClient({projectId}: { projectId: string }) {
    const {data: project} = useProjectQuery(projectId);
    const {data: tasks} = useTasksQuery(projectId);

    if (!project) return <div>Project not found</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
            )}

            <TaskBoard projectId={projectId} tasks={tasks ?? []}/>
        </div>
    );
}