import { blogApi } from "@/lib/api";
import { PostScreen } from "./post-screen";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const posts = await blogApi.list();
    if (posts.length) return posts.map((post) => ({ slug: post.slug }));
  } catch {}
  return [{ slug: "_unavailable" }];
}

export default function Page(){return <PostScreen/>}
