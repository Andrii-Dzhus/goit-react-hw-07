import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.contactList}>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}
