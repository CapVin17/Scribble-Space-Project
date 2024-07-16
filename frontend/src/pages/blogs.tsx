import { Appbar } from "../Components/appbar";
import { BlogSkeleton } from "../Components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { BlogsCard } from "./blogsCard";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div className="flex justify-center">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogsCard
              id={blog.id}
              title={blog.title}
              content={blog.content}
              publisheddate="15 July 2024"
              authorname={blog.author.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
