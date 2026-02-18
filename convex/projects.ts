import { verify } from "crypto";
import { mutation, query } from "./_generated/server";

import { v } from "convex/values";
import { verifyAuth } from "./auth";


export const create = mutation({
    args: {
        name: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        
        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identity.subject,
            updatedAt: Date.now(),
        });
        return projectId;
    },
})

export const getPartial = query({
    args: {
        limit: v.number()
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);


       return await ctx.db 
        .query("projects")
        .withIndex("byOwner", (q) => q.eq("ownerId", identity.subject))
        .take(args.limit)
 

    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await verifyAuth(ctx);

        return await ctx.db 
            .query("projects")
            .withIndex("byOwner", (q) => q.eq("ownerId", identity.subject))
            .collect();
    }
})

export const getById = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project || project.ownerId !== identity.subject) {
            throw new Error("Project not found or access denied");
        }

        return project;
    }
})

export const rename = mutation({
    args: { id: v.id("projects"), newName: v.string() },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project || project.ownerId !== identity.subject) {
            throw new Error("Project not found or access denied");
        }

        await ctx.db.patch("projects", args.id, {
            name: args.newName,
            updatedAt: Date.now(),
        });
    }
})

