import axios from "axios";
import { Appbar } from "../Components/appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-10">
        <div className="max-w-screen-xl w-full">
          <textarea
            onChange={(e) => {
                settitle(e.target.value)
            }}
            className="block p-4 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Title here...."
          ></textarea>
          <div className="my-10">
            <TextArea onChange = {(e) => {
                setcontent(e.target.value)
            }} />
            <button
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content
                },{
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
              }}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none dark:focus:ring-blue-900"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextArea({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
  return (
    <form>
      <div className="px-4 py-4 bg-white rounded-lg shadow-sm border border-gray-300">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          onChange={onChange}
          id="editor"
          rows={10}
          className="block w-full p-4 text-base text-gray-900 bg-white border-0 rounded-lg focus:ring-0 focus:outline-none"
          placeholder="Write an article..."
          required
        ></textarea>
      </div>
    </form>
  );
}

export default Publish;
