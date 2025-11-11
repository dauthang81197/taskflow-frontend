import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TaskBoard } from "@/features/projects/components/task-board";
import { useProjectQuery, useTasksQuery } from "@/features/projects/hooks";

export const metadata: Metadata = {
  title: "Project",
  description: "Project board",
};

function ProjectBoardContent({ projectId }: { projectId: string }) {
  const { data: project } = useProjectQuery(projectId);
  const { data: tasks } = useTasksQuery(projectId);

  if (!project) return null;
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        {project.description ? (
          <p className="text-muted-foreground">{project.description}</p>
        ) : null}
      </div>
      <TaskBoard projectId={projectId} tasks={tasks ?? []} />
    </div>
  );
}

export default function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params?.id) return notFound();
  return (
    <div className="p-6 md:p-8">
      <Suspense fallback={<div>Loading project…</div>}>
        <ProjectBoardContent projectId={params.id} />
      </Suspense>
    </div>
  );
}


