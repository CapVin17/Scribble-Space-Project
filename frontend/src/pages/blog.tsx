import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../Components/FullBlog";
import { Spinner } from "../Components/Spinner";

export const Blog = () => {
    const { id } = useParams();
    const {loading , blog} = useBlog({
        id: id || "",
    });

    if(loading)
    {
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner />
            </div>
            
        </div>
    }
    return <div>
        //@ts-ignore
        <FullBlog blog = {blog}/>
    </div>
}
