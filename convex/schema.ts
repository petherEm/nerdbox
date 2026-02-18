import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { de } from "date-fns/locale";


export default defineSchema({
    projects: defineTable({
        name: v.string(),
        ownerId: v.string(),
        updatedAt: v.number(),
        importStatus: v.optional(v.union(
            v.literal("importing"), 
            v.literal("completed"), 
            v.literal("failed"))), 
        exportStatus: v.optional(v.union(
            v.literal("exporting"), 
            v.literal("completed"), 
            v.literal("failed"),
            v.literal("canceled")
        )),
        exportRepoUrl: v.optional(v.string()),


    }).index("byOwner", ["ownerId"]),

    files: defineTable({
        projectId: v.id("projects"),
        parentId: v.optional(v.id("files")),
        name: v.string(),
        type: v.union(v.literal("file"), v.literal("folder")),
        content: v.optional(v.string()), // text files only
        storageId: v.optional(v.id("_storage")), // for binary files
        updatedAt: v.number(),
    })
    .index("byProject", ["projectId"])
    .index("byParent", ["parentId"])
    .index("by_project_parent", ["projectId", "parentId"]),
});