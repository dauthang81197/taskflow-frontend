"use client";

import {useMemo} from "react";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {TaskCard} from "./task-card";
import type {Task, TaskStatus} from "../types";
import {useCreateTaskMutation} from "../hooks";
import {TaskDialog} from "@/features/projects/components/task-dialog";

const columns: { key: TaskStatus; title: string }[] = [
    {key: "todo", title: "To do"},
    {key: "in_progress", title: "In progress"},
    {key: "done", title: "Done"},
];

export function TaskBoard({
                              projectId,
                              tasks,
                          }: {
    projectId: string;
    tasks: Task[];
}) {
    const createMut = useCreateTaskMutation(projectId);

    const grouped = useMemo(() => {
        const map: Record<TaskStatus, Task[]> = {
            todo: [],
            in_progress: [],
            done: [],
        };
        for (const t of tasks ?? []) {
            map[t.status].push(t);
        }
        return map;
    }, [tasks]);

    const onCreate = (status: TaskStatus) => {
        createMut.mutate({
            projectId,
            title: "New task",
            status,
        });
    };

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {columns.map((col) => (
                <div key={col.key} className="rounded-lg border bg-background p-3">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold">{col.title}</p>
                        <Button size="icon" variant="ghost" onClick={() => onCreate(col.key)}>
                            <Plus className="size-4"/>
                        </Button>
                    </div>
                    <Separator/>
                    <div className="mt-3 space-y-3">
                        {grouped[col.key]?.map((task) => (
                            <TaskCard key={task.id} task={task}/>
                        ))}
                    </div>
                </div>
            ))}
            <TaskDialog/>
        </div>
    );
}

