import { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import { readPostsInfo } from '../../lib/helper';
import { PostApiResponse } from '../../utils/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  // const [posts, setPosts] = useState<
  //   { title: string; slug: string; meta: string }[]
  // >([]);

  // const fetchPosts = async () => {
  //   const res = await fetch('/api/posts').then((data) => data.json());
  //   setPosts(res.postInfo);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-6 p-4">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          description={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

// interface PostApiResponse {
//   postInfo: {
//     title: string;
//     slug: string;
//     meta: string;
//   }[];
// }

export const getStaticProps = async () => {
  // const { postInfo }: PostApiResponse = await fetch(
  //   'http://localhost:3000/api/posts'
  // ).then((data) => data.json());

  const postInfo: PostApiResponse = readPostsInfo();

  return {
    props: { posts: postInfo },
  };
};

export default Blogs;
