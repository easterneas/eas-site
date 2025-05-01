import { contactService } from "../services/contactService";

async function getContacts() {
  const response = await contactService.getAll().catch(console.trace);

  if (!response) return null;

  return response.data;
}

export default {
  getContacts,
};
