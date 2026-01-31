import { postService } from "../services/postService";

export async function getCollection() {
  try {
    const collections = await postService.getAll();
    return collections;
  } catch (e) {
    console.error(e);
  } finally {
  }
}

export async function getPaginatedPosts() {
  const response = await postService.getAll();

  if (!response) return null;

  return response.data;
}

export async function getPosts() {
  const response = await postService.getAll();

  if (!response) return null;

  return response.data;
}

export async function getPostBySlug(slug?: string) {
  if (!slug) return;

  const response = await postService.getBySlug(slug);

  if (!response) return null;

  return response.data;
}

export async function getLatestPosts() {
  const response = await postService.getRecents();

  console.log({response})

  if (!response) return null;

  return response.data;
}
