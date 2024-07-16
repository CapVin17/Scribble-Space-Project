import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog{
    title: string,
    content: string,
    id: string,
    author: {
        name: string,
    }
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(response => {
                setblogs(response.data.allblogs);
                setloading(false);
            })
    },[])

    return {
        loading,
        blogs
    }
}