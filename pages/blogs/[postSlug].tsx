import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  const { content, title } = post;
  return (
    <div className="mx-auto max-w-3xl pb-10">
      <h1 className="font-bold text-3xl mt-5 mb-10">{title}</h1>
      <div className="prose">
        <MDXRemote {...content} />
      </div>
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = () => {
  const dirToRead = path.join(process.cwd(), "posts");
  const readFile = fs.readdirSync(dirToRead);
  const paths = readFile.map((file) => {
    return { params: { postSlug: path.parse(file).name } };
  });
  // console.log(paths);
  return {
    // paths: [
    //   {
    //     params: { postSlug: "clever-lazy-loading-for-javascript" },
    //   },
    //   {
    //     params: { postSlug: "how-to-use-getstaticprops" },
    //   },
    // ],
    paths: paths,
    fallback: "blocking", //we will coem to this later and understadn this example
    //fallback get 3 values: true or false or 'blocking'
    //false => next do nothing when there is a new route
    //true => like loading... => it's a fake page and wait for the prop when browser finish loading
    //'blocking' => it will try to find page which matches the new router, if found, it render this page. If not, it throw 500 error
  };
};
type PostProps = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};
export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const postSlug: string | string[] | undefined = context.params!.postSlug;
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), "posts", postSlug + ".md"),
    { encoding: "utf-8" }
  );
  // const { data, content } = matter(fileContent); //no need to use gray-matter, use frontmatter instead
  // const source = await serialize(content);
  const source: any = await serialize(fileContent, {
    parseFrontmatter: true,
  });
  //this parsefrontmatter can replace for the gray-matter
  //this also contains the content and the data (data in frontmatter key)
  return {
    props: {
      post: { content: source, title: source.frontmatter.title },
    },
    //source.frontmatter.title === matter(fileContent).data.title
  };
};
export default SinglePage;
