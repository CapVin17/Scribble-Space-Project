import { Appbar } from "./appbar"
import { Blog } from "../hooks"
import { Avatar } from "../pages/blogsCard"

export const FullBlog = ({blog} : {blog: Blog}) => {
    return <div className="">
        <Appbar />
        <div className="flex justify-center">
     <div className="grid grid-cols-12 px-20 w-full pt-200 max-w-screen-2xl pt-12">
        <div className="col-span-8  ">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                Posted on 16 July 2024
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-lg text-slate-600">
                Author
            </div>
            <div className="flex justify-center">
                <div className="pr-4 flex flex-col justify-center">
                    <Avatar name= {blog.author.name || "Anonymous"} />
                </div>
                <div>
                <div className="text-xl font-bold pb-1">
                {blog.author.name || "Anonymous"}
            </div>
            
            <div className="pt-1 text-slate-500"> 
                This section tells about the ability of author how he grabs the attention of readers. 
            </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    </div>
}