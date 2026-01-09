"use server";

import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;
  const imageFile = formData.get("image") as File;

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

  await connectDB();

  let imageData = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "next-posts" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    imageData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  await Post.create({
    title,
    description,
    tags,
    image: imageData,
  });

  revalidatePath("/");
  return redirect("/"); // ✅ MUST return
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;
  const imageFile = formData.get("image") as File;

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

  await connectDB();

  const post = await Post.findById(id);

  if (!post) {
    return redirect("/"); // ✅ MUST return
  }

  let imageData = post.image ?? null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "next-posts" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    if (post.image?.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    imageData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  await Post.findByIdAndUpdate(id, {
    title,
    description,
    tags,
    image: imageData,
  });

  revalidatePath("/");
  return redirect("/"); // ✅ MUST return
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;

  await connectDB();

  const post = await Post.findById(id);

  if (post?.image?.publicId) {
    await cloudinary.uploader.destroy(post.image.publicId);
  }

  await Post.findByIdAndDelete(id);

  revalidatePath("/");
  return redirect("/"); // ✅ MUST return
}
