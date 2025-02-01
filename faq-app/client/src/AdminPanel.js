import React from "react";
import { Admin, Resource, List, Datagrid, TextField, DeleteButton, Create, SimpleForm, TextInput } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import axios from "axios";

// API URL
const API_URL = "http://localhost:5000/api/faqs";

// Authentication
const authProvider = {
  login: async ({ username, password }) => {
    const { data } = await axios.post("http://localhost:5000/api/admin/login", { username, password });
    localStorage.setItem("authToken", data.token);
  },
  logout: () => {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  },
  checkAuth: () => (localStorage.getItem("authToken") ? Promise.resolve() : Promise.reject()),
  getPermissions: () => Promise.resolve(),
};

// Data Provider
const httpClient = (url, options = {}) => {
  options.headers = { Authorization: `Bearer ${localStorage.getItem("authToken")}` };
  return fetch(url, options).then(res => res.json());
};

const dataProvider = simpleRestProvider(API_URL, httpClient);

// FAQ List
const FaqList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="question" />
      <TextField source="answer" />
      <DeleteButton />
    </Datagrid>
  </List>
);

// FAQ Create
const FaqCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="question" required />
      <TextInput multiline source="answer" required />
    </SimpleForm>
  </Create>
);

// Admin Panel
const AdminPanel = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="faqs" list={FaqList} create={FaqCreate} />
  </Admin>
);

export default AdminPanel;
