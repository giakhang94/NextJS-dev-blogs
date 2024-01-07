import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  //how to read files and folders inside node JS
  //done read files
  switch (method) {
    case "GET": {
      const data = readPostsInfo();
      return res.json({ data });
    }
    default:
      return res.status(404).json({ message: "NotFound" });
  }
};
const readPostsInfo = () => {
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  let result = dirs.map((filename) => {
    const dirPathToRead = path.join(process.cwd(), "posts", filename);
    const fileContent = fs.readFileSync(dirPathToRead, { encoding: "utf-8" });
    // console.log(matter(fileContent).content);
    return matter(fileContent).data;
  });
  return result;
};

export default handler;
