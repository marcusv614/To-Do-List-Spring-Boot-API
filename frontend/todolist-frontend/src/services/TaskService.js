import api from "./api.js";

export const getTasks = () => {
  return api.get("");
};

export const postTasks = (task) => {
  return api.post("", task);
};

export const putTask = (id, task) => {
  api.put(`/${id}`, task);
};

export const deleteTask = (id) => {
  return api.delete(`${id}`);
};
