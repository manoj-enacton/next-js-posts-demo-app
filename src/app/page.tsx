import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import Link from "next/link";
import Image from "next/image";

async function getPosts() {
  await connectDB();
  return Post.find().sort({ createdAt: -1 }).lean();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Posts</h1>

      {posts.length === 0 && <p>No posts yet</p>}

      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post._id} className="border rounded-lg p-4">
            <h3 className="text-lg font-bold text-white">{post.title}</h3>
            <p className="text-gray-700 mt-2 text-white">{post.description}</p>

            {/* ✅ TAGS */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-medium
             bg-gray-800 text-gray-200
             px-3 py-1
             rounded-full
             ring-1 ring-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {post.image?.url && (
              <Image
                src={post.image.url}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover rounded"
                priority={false}
              />
            )}

            {/* 🔜 Edit link (used in Step 3) */}
            <div className="mt-4">
              <Link
                href={`/posts/${post._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View / Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
