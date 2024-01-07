import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  url: string;
};

const BlogCard = (props: Props) => {
  return (
    <Link href={`/blogs/${props.url}`}>
      <div className="bg-green-200 p-2 rounded-sm my-5">
        <h1 className="text-gray-900 text-3xl font-semibold">{props.title}</h1>
        <p className="text-gray-500 text-sm">{props.description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
