// TODO: Uncomment when use-editor-store is implemented
// import { useEditorStore } from "../store/use-editor-store";

import { useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

export const useEditor = (_projectId: Id<"projects">) => {
  const openFile = useCallback(
    (
      _fileId: Id<"files">,
      _options: { pinned: boolean },
    ) => {
      // noop until editor store is implemented
    },
    [],
  );

  const closeTab = useCallback((_fileId: Id<"files">) => {
    // noop
  }, []);

  const closeAllTabs = useCallback(() => {
    // noop
  }, []);

  const setActiveTab = useCallback((_fileId: Id<"files">) => {
    // noop
  }, []);

  return {
    openTabs: [] as Id<"files">[],
    activeTabId: null as Id<"files"> | null,
    previewTabId: null as Id<"files"> | null,
    openFile,
    closeTab,
    closeAllTabs,
    setActiveTab,
  };
};
