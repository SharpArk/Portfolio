export const prerender = false;

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      images: true,
    },
  });
  return new Response(JSON.stringify(posts));
}

export async function POST({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  const images = formData.getAll("images");
  const imageUrls = [];

  try {
    for (const e of images) {
      if (e && e.name) {
        const buffer = Buffer.from(await e.arrayBuffer());
        const { url } = await put(`/blog/${Date.now()}-${e.name}`, buffer, {
          access: "public",
        });
        console.log("Uploaded image URL:", url);
        imageUrls.push(url);
      }
    }
  } catch (err) {
    console.error("Error al subir las imágenes:", err);
    return new Response(
      JSON.stringify({ error: "Error al subir las imágenes" }),
      { status: 500 }
    );
  }

  console.log("Image URLs:", imageUrls);

  try {
    const res = await prisma.post.create({
      data: {
        title,
        description,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
    });
    return new Response(JSON.stringify({ result: res }));
  } catch (err) {
    console.error("Error al crear el post en la base de datos:", err);
    return new Response(
      JSON.stringify({ error: "Error al crear el post en la base de datos" }),
      { status: 500 }
    );
  }
}
