import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  description: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, description, slug }): JSX.Element => {
  return (
    <Link href={'/blogs/' + slug}>
      <div className="bg-green-100 p-2 rounded-tl-xl rounded-br-xl space-y-1 cursor-pointer">
        <h1 className="text-3xl text-slate-900 font-semibold">{title}</h1>
        <p className="text-base text-slate-800">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
