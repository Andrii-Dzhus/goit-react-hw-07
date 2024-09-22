import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронна дія для отримання контактів
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(
      "https://66ec51722b6cf2b89c5e1101.mockapi.io/contacts"
    );
    return response.data;
  }
);

// Асинхронна дія для додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async newContact => {
    const response = await axios.post(
      "https://66ec51722b6cf2b89c5e1101.mockapi.io/contacts",
      newContact
    );
    return response.data;
  }
);

// Асинхронна дія для видалення контакту
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async contactId => {
    await axios.delete(
      `https://66ec51722b6cf2b89c5e1101.mockapi.io/contacts/${contactId}`
    );
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Завантаження контактів
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Додавання контакту
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Видалення контакту
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const selectContacts = state => state.contacts.items;

export default contactsSlice.reducer;
