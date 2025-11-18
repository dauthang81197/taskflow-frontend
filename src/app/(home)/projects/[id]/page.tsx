import type {Metadata} from "next";
import {notFound} from "next/navigation";
import ProjectBoardClient from "@/app/(home)/projects/[id]/project-board-client";

export const metadata: Metadata = {
    title: "Project",
    description: "Project board",
};

export default async function ProjectPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    if (!id) return notFound();

    return (
        <div className="p-6 md:p-8">
            <ProjectBoardClient projectId={id}/>
        </div>
    );
}