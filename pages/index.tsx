import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <h1 className="text-3xl font-semibold text-slate-600 mb-20">
        NextJS - Typescript - Dev Blog Mini Project
      </h1>
      <a
        className="bg-blue-500 text-white text-lg font-sembold py-2 px-5 rounded-md"
        href="https://next-ts-dev-blogs.vercel.app/blogs"
      >
        Go To Blogs
      </a>
    </main>
  );
}
