import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

async function getPosts() {
  await connectDB();
  return Post.find().sort({ createdAt: -1 }).lean();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div style={{ padding: 24 }}>
      <h1>All Posts</h1>

      {posts.length === 0 && <p>No posts yet</p>}

      <ul>
        {posts.map((post: any) => (
          <li key={post._id} style={{ marginBottom: 16 }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
