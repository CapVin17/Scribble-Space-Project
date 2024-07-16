import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string,
    authorname: string,
    title: string,
    content: string,
    publisheddate: string,

}
export const BlogsCard = ({authorname,title,content,publisheddate,id} : BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex pt-4">
            <div className="flex justify-center flex-col">
                <Avatar name={authorname} />
            </div>
        <div className="font-md pl-2 pt-2">{authorname}.</div>
        <div className="font-thin text-slate-800 pt-2 pl-2">
            {publisheddate}
        </div>
        </div>
        <div className="font-bold text-2xl py-3 ">
            {title}
        </div>

        <div className="text-md font-thin">
            {`${content.slice(0,100)}` + "...."}
        </div>

        <div className="font-thin text-slate-350 pt-1">
            {`${Math.ceil(content.length/100)}` + " minutes"}
        </div>
    </div>
    </Link>
}


export function Avatar({name} : {name: string}) 
{
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-xl text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}