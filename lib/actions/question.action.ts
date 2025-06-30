"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export const createQuestion = async (params: any) => {
  try {
    await connectToDatabase(); // ← FIXED: await the DB connection

    const { title, content, tags, author } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: Implement reputation increment or user interaction recording here

    return { success: true, questionId: question._id }; // ← FIXED: always return a response
  } catch (error) {
    console.error("Error in createQuestion:", error); // ← FIXED: log errors instead of swallowing
    throw error; // ← let the client know something went wrong
  }
};
