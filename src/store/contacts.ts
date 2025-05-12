import { contactService } from "../services/contactService";

async function getContacts() {
  return (await contactService.getAll()).data;
}

export default {
  getContacts,
};
