import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-14 px-6 flex items-center gap-6 bg-zinc-950 border-b border-zinc-800">
      <Link href="/" className="text-zinc-100 font-medium">
        All Posts
      </Link>

      <Link href="/posts/new" className="text-zinc-100 font-medium">
        Create Post
      </Link>
    </nav>
  );
}
