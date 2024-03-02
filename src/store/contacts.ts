import { contactService } from "../services/contactService";

async function getContacts() {
    const response = await contactService.getAll().catch(console.log);

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
  getContacts,
};
