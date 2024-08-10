import mongoose from "mongoose";

export const ScriptSchema = new mongoose.Schema(
  {
    _id: "String",
    type: "String",
    description: "String",
    code: "String",
    args: [{ type: "Object", required: false }],
    language: "String",
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const ScriptModel = mongoose.model("Script", ScriptSchema);
