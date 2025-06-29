"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = async (params: any) => {
  // eslint-disable-next-line no-empty
  try {
    // connect to DATABASE
    connectToDatabase();
  } catch (error) {}
};
