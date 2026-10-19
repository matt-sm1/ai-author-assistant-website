import PostEditor from "@/frontend/feature/post/components/PostEditor";

export default async function EditPostPage({ params }) {
  const { id } = await params;

  return <PostEditor postId={id} />;
}