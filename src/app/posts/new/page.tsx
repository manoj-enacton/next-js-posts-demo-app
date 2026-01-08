import { createPost } from "@/actions/postActions";

export default function CreatePostPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Create Post</h1>

      <form
        action={createPost}
        style={{
          display: "flex",
          gap: 12,
          flexDirection: "column",
          maxWidth: 400,
        }}
      >
        <input name="title" placeholder="Title" required />

        <textarea name="description" placeholder="Description" />

        <input name="tags" placeholder="Tags (comma separated)" />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
