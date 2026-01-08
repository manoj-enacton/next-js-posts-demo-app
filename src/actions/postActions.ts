"use server";

import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

  await connectDB();

  await Post.create({
    title,
    description,
    tags,
  });

  redirect("/");
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

  await connectDB();

  await Post.findByIdAndUpdate(id, {
    title,
    description,
    tags,
  });

  redirect("/");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;

  await connectDB();
  await Post.findByIdAndDelete(id);

  redirect("/");
}
