import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Login to upload a file!");
    }
    await ctx.db.insert("files", { name: args.name, orgId: args.orgId });
  },
});

export const getAllFiles = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }
    const files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
    return files;
  },
});
