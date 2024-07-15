import { Avatar } from "../pages/blogsCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-3">
        <div className="pt-2.4 font-bold text-3xl">
            Medium
        </div>
        <div>
            <Avatar name="Vineet Singh"  />
        </div>
    </div>
}