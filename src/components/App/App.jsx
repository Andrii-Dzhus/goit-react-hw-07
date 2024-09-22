import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContacts = async () => {
      await dispatch(fetchContacts());
    };
    loadContacts();
  }, [dispatch]);

  return (
    <div className={css.app}>
      <h1 className={css.title}>Contacts Book</h1>
      <div className={css.container}>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
}
