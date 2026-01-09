import { createPost } from "@/actions/postActions";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center  text-black">
          Create Post
        </h1>

        <form
          action={createPost}
          className="flex flex-col gap-4"
        >
          <input
            name="title"
            placeholder="Title"
            required
            className="border rounded-md px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            className="border rounded-md px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            className="border rounded-md px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="text-sm"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
