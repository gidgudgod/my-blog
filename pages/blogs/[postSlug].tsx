import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useRouter } from 'next/router';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="mx-auto max-w-3xl p-8 md:p-4">
      <h1 className="mb-6 text-4xl font-semibold">{post.title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...post.content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });

    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (ctx) => {
  try {
    const { params } = ctx;
    const { postSlug } = params as IStaticProps;

    const filePathToRead = path.join(
      process.cwd(),
      'posts/' + postSlug + '.md'
    );
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    // const { content, data } = matter(fileContent);
    const mdxSource: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          content: mdxSource,
          title: mdxSource.frontmatter.title,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
