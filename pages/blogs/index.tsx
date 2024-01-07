import BlogCard from "@/components/BlogCard";
import { readPostsInfo } from "@/lib/helper";
import { ApiResponse } from "@/utils/types";
import { get } from "http";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useEffect, useState } from "react";

//getStaticProps  - We can place it anywhere (top or bottom) in the file needs pre-render.
export const getStaticProps: GetStaticProps = async () => {
  //   const response = await fetch("http://localhost:3000/api/posts");
  //   const { data }: ApiResponse = await response.json();
  const data: ApiResponse = readPostsInfo();
  return { props: { data } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>; //note cho nay lai vo tap
const Blogs: NextPage<Props> = ({ data }) => {
  const [blogs, setBlogs] = useState<
    { title: string; slug: string; meta: string }[]
  >([]);
  console.log(blogs);
  useEffect(() => {
    setBlogs(data);
  }, []);
  return (
    <div className=" max-w-3xl mx-auto p-5 space-y-5">
      {blogs.map((blog, index) => {
        return (
          <BlogCard
            url={blog.slug}
            key={index + "blog"}
            title={blog.title}
            description={blog.meta}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
