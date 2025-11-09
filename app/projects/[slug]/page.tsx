"use client";

import NestedNavbar from "@/components/NestedNavbar";
import NotFoundProject from "@/components/projects/NotFoundProject";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ProjectDetailsSkeleton from "@/components/skeletons/ProjectDetailsSkeleton";
import { projects } from "@/data/demo/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProjectType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  slug: string;
  live: string;
  type: string[];
};

export default function Home() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const foundProject = projects.find(
        (project: ProjectType) => project.slug === slug
      );
      if (foundProject?.id) {
        setProject(foundProject);
      }
      setLoading(false);
    }, 2000);
    return () => {
      setLoading(false);
    };
  }, [slug]);

  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-4xl mx-auto py-20 px-10 lg:px-0">
        <NestedNavbar />
        {/* <section className="py-10">
        </section> */}
        <div className="py-10">
          {loading ? (
            <ProjectDetailsSkeleton />
          ) : project?.id ? (
            <ProjectDetails project={project} />
          ) : (
            <NotFoundProject />
          )}
        </div>
      </section>
    </section>
  );
}
