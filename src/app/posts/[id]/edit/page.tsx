import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { updatePost, deletePost } from "@/actions/postActions";

export const dynamic = "force-dynamic";

async function getPost(id: string) {
  await connectDB();
  return Post.findById(id).lean();
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: any = await getPost(id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Edit Post</h1>

        {/* UPDATE FORM */}
        <form action={updatePost} className="flex flex-col gap-4">
          {/* CRITICAL: send ID */}
          <input type="hidden" name="id" value={post._id.toString()} />

          <input
            name="title"
            defaultValue={post.title}
            className="border rounded px-3 py-2 bg-white text-black"
          />

          <textarea
            name="description"
            defaultValue={post.description}
            rows={4}
            className="border rounded px-3 py-2 bg-white text-black"
          />

          <input
            name="tags"
            defaultValue={post.tags?.join(", ")}
            className="border rounded px-3 py-2 bg-white text-black"
          />

          <button className="bg-blue-600 text-white py-2 rounded">
            Update Post
          </button>
        </form>

        {/* DELETE FORM */}
        <form action={deletePost} className="mt-4">
          <input type="hidden" name="id" value={post._id.toString()} />
          <button className="bg-red-500 text-white px-5 py-2 rounded">
            Delete Post
          </button>
        </form>
      </div>
    </div>
  );
}
