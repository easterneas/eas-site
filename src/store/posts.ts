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

  const {
    data: { data: posts, meta: paginationMeta },
  } = response;

  return {
    data: posts.map(({ id, attributes }) => ({ id, ...attributes })),
    meta: paginationMeta,
  };
}

async function getPosts() {
    const response = await postService.getAll();

  if (!response) return null;

  const {
    data: { data: posts, meta: paginationMeta },
  } = response;

  return {
    data: posts.map(({ id, attributes }) => ({ id, ...attributes })),
    meta: paginationMeta,
  };
}

async function getLatestPosts() {
    const response = await postService.getRecents();

  if (!response) return null;

  const {
    data: { data: posts, meta: paginationMeta },
  } = response;

  return {
    data: posts.map(({ id, attributes }) => ({ id, ...attributes })),
    meta: paginationMeta,
  };
}

export default {
  getCollection,
  getPosts,
  getLatestPosts,
  getPaginatedPosts,
};
