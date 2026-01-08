import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 16, display: "flex", gap: 16 }}>
      <Link href="/">All Posts</Link>
      <Link href="/posts/new">Create Post</Link>
    </nav>
  );
}
