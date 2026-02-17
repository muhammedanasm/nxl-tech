import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const taskService = {
  getAll: async () => {
    const res = await api.get("/todos?_limit=10");
    return res.data.map((t) => ({
      ...t,
      description: "Auto-generated project task details.",
      status: t.completed ? "Completed" : "Todo",
    }));
  },
};
