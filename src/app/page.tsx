"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

const Home = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button
        onClick={() => {
          createProject({ name: "New Project123" });
        }}
      >
        Add new
      </Button>
      {projects?.map((project) => (
        <div key={project._id.toString()}>
          <h2>{project.name}</h2>
          <p>Owner Id: {project.ownerId}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
