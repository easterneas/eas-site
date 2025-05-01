import { postService } from "../services/postService";

async function getCollection() {
  try {
    const collections = await postService.getAll();
    return collections;
  } catch (e) {
    console.trace(e);
  } finally {
  }
}

async function getPaginatedPosts() {
  const response = await postService.getAll();

  if (!response) return null;

  return response.data;
}

async function getPosts() {
  const response = await postService.getAll();

  if (!response) return null;

  return response.data;
}

async function getPostBySlug(slug?: string) {
  if (!slug) return;

  const response = await postService.getBySlug(slug);

  if (!response) return null;

  return response.data;
}

async function getLatestPosts() {
  const response = await postService.getRecents();

  if (!response) return null;

  return response.data;
}

export default {
  getCollection,
  getPosts,
  getLatestPosts,
  getPaginatedPosts,
  getPostBySlug,
};
