import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import Link from "next/link";

async function getPost(id: string) {
  await connectDB();
  return Post.findById(id).lean();
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ THIS IS THE FIX

  console.log("POST ID FROM URL:", id);
  const post: any = await getPost(id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      <p className="text-zinc-400 mt-2">{post.description}</p>

      <div className="flex gap-2 mt-4">
        {post.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-xs bg-zinc-800 text-zinc-200 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          href={`/posts/${post._id}/edit`}
          className="text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
