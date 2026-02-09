"use client";

import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CloudCheckIcon, Loader2Icon } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useProject, useRenameProject } from "@/features/hooks/use-projects";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);
  const renameProject = useRenameProject();

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartRename = () => {
    setName(project?.name ?? "");
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(false);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;

    renameProject({ id: projectId, newName: trimmedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsRenaming(false);
    }
  };

  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="flex items-center gap-1.5">
                <Button variant="ghost" className="w-fit! p-1.5! h-7!" asChild>
                  <Link href="/">
                    <Image
                      src="/vercel.svg"
                      alt="Nerdbox Logo"
                      width={20}
                      height={20}
                    />
                    <span className={cn("font-bold text-lg", font.className)}>
                      Nerdbox
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="ml-0! mr-1" />

            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  onFocus={(e) => e.currentTarget.select()}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  value={name}
                  className="text-sm bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate w-full"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Importing project...</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          project?.updatedAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudCheckIcon className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Saved{" "}
                  {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                </p>
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </nav>
  );
};
