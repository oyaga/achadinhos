import type { Metadata } from "next"; import { BlogScreen } from "./blog-screen";
export const metadata:Metadata={title:"Blog Achadinhos",description:"Conteúdos e apresentações sobre condomínios.",alternates:{canonical:"/blog"}};
export default function Page(){return <BlogScreen/>}
