import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Update all API functions to return response.data
export const getSuppliers = () => api.get("suppliers/").then((res) => res.data);
export const getSupplier = (id) =>
  api.get(`suppliers/${id}/`).then((res) => res.data);
export const createSupplier = (data) =>
  api.post("suppliers/", data).then((res) => res.data);
export const updateSupplier = (id, data) =>
  api.put(`suppliers/${id}/`, data).then((res) => res.data);
export const deleteSupplier = (id) =>
  api.delete(`suppliers/${id}/`).then((res) => res.data);

export const getItems = () => api.get("items/").then((res) => res.data);
export const getItem = (id) => api.get(`items/${id}/`).then((res) => res.data);
export const createItem = (data) =>
  api.post("items/", data).then((res) => res.data);
export const updateItem = (id, data) =>
  api.put(`items/${id}/`, data).then((res) => res.data);
export const deleteItem = (id) =>
  api.delete(`items/${id}/`).then((res) => res.data);

export const getPurchaseRequests = () =>
  api.get("purchase-requests/").then((res) => res.data);
export const getPurchaseRequest = (id) =>
  api.get(`purchase-requests/${id}/`).then((res) => res.data);
export const createPurchaseRequest = (data) =>
  api
    .post("purchase-requests/", {
      item_id: data.item,
      quantity: data.quantity,
      supplier_id: data.supplier,
      status: data.status,
      expected_delivery_date: data.expected_delivery_date,
      notes: data.notes,
    })
    .then((res) => res.data);
export const updatePurchaseRequest = (id, data) =>
  api.put(`purchase-requests/${id}/`, {
    item_id: data.item,
    quantity: data.quantity,
    supplier_id: data.supplier,
    status: data.status,
    expected_delivery_date: data.expected_delivery_date,
    notes: data.notes,
  }).then((res) => res.data);
export const deletePurchaseRequest = (id) =>
  api.delete(`purchase-requests/${id}/`).then((res) => res.data);
export const receivePurchaseRequest = (id) =>
  api.post(`purchase-requests/${id}/receive/`).then((res) => res.data);
