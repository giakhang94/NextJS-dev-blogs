import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { ApiResponse } from "@/utils/types";

export const readPostsInfo = (): ApiResponse => {
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const result = dirs.map((filename) => {
    const dirPathToRead = path.join(process.cwd(), "posts", filename);
    const fileContent = fs.readFileSync(dirPathToRead, { encoding: "utf-8" });
    // console.log(matter(fileContent).content);
    return matter(fileContent).data;
  });
  return result as ApiResponse;
};
