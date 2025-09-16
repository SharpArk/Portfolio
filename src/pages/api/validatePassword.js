export const prerender = false;
import { ADMIN_PASSWORD } from "astro:env/server";
import bcrypt from "bcrypt";

export async function POST({ request }) {
  const { password } = await request.json();
  console.log(password);
  if (!password) {
    return new Response(JSON.stringify({ validate: false }));
  }
  const validate = await bcrypt.compare(password, ADMIN_PASSWORD);
  return new Response(JSON.stringify({ validate }));
}
