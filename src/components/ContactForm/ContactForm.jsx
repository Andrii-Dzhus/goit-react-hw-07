import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(9, "Enter phone number in format 111-11-11")
    .max(9, "Enter phone number in format 111-11-11")
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Enter phone number in format 111-11-11")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = { ...values, id: nanoid() };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="name" className={css.label}>
            Name:
          </label>
          <Field type="text" name="name" className={css.input} id="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="number" className={css.label}>
            Phone:
          </label>
          <Field type="tel" name="number" className={css.input} id="number" />
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>
        <button type="submit" className={css.button}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}
