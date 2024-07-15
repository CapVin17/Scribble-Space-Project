import { Appbar } from "../Components/appbar";
import { useBlogs } from "../hooks";
import { BlogsCard } from "./blogsCard"

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if(loading)
    {
        return <div>
            loading....
        </div>
    }

    return <div>
        <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
            {blogs.map(blog => <BlogsCard
            title="Learn about Cloudfare Workers and take a very deep in-site into it that will certainly change your life"
            content="Hi there this is vineet singh this side and i am here to tell you about one of the great technologies in use today to support your backend code and make it out to the world at very minimal cost and rather nothing it has a very strong build system and enhanced user experience"
            publisheddate="15 July 2024"
            authorname="Vineet Singh"
          />)}
        </div>
        </div>
      </div>
}