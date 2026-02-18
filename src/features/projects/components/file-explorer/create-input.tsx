"use client";

import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { useState } from "react";
import { getItemPadding } from "./constants";

export const CreateInput = ({
  type,
  level,
  onSubmit,
  onCancel,
}: {
  type: "file" | "folder";
  level: number;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      return;
    }
    e.preventDefault();
    onSubmit(trimmedValue);
  };

  return (
    <div
      className="w-full flex items-center gap-1 h-5.5 bg-accent/30"
      style={{ paddingLeft: getItemPadding(level, type === "file") }}
    >
      <div className="flex items-center gap-0.5">
        {type === "folder" && (
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        )}
        {type === "file" && (
          <FileIcon fileName={value} autoAssign className="size-4" />
        )}
        {type === "folder" && (
          <FolderIcon folderName={value} className="size-4" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          } else if (e.key === "Escape") {
            onCancel();
          }
        }}
        autoFocus
        className="flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring"
        onBlur={handleSubmit}
      />
    </div>
  );
};
