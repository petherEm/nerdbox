"use client";

import Image from "next/image";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub } from "react-icons/fa";
import ProjectsList from "./projects-list";
import { useCreateProject } from "@/features/hooks/use-projects";
import { ProjectsCommandDialog } from "./projects-command-dialog";
import { useEffect, useState } from "react";

export const ProjectsView = () => {
  const createProject = useCreateProject();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full items-center">
            <div className="flex justify-between gap-4 w-full items-center">
              <Image src="/vercel.svg" alt="Logo" width={32} height={32} />
              <h1
                className="text-4xl md:text-5xl font-semibold font-sans"
              >
                NerdBox
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
                onClick={() => {
                  const projectName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    separator: "-",
                    length: 3,
                  });

                  createProject({
                    name: projectName,
                  });
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <SparkleIcon className="text-primary" size={24} />
                  <Kbd className="bg-accent border">⌘J</Kbd>
                </div>
                <div>
                  <span className="text-sm">New</span>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
                onClick={() => {
                  // Handle create project action
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <FaGithub className="text-primary" size={24} />
                  <Kbd className="bg-accent border">⌘I</Kbd>
                </div>
                <div>
                  <span className="text-sm">Import</span>
                </div>
              </Button>
            </div>

            <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};
