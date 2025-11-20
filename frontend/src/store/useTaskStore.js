import { create } from 'zustand';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loadingTasks: false,
  taskError: null,

  volunteers: [],
  loadingVolunteers: false,
  volunteerError: null,

  // --- FETCH TASKS ---
  fetchTasks: async () => {
    set({ loadingTasks: true, taskError: null });

    try {
      const res = await fetch("http://localhost:8080/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      set({ tasks: data, loadingTasks: false });

    } catch (e) {
      set({ taskError: e.message, loadingTasks: false });
    }
  },

  // --- FETCH VOLUNTEERS ---
  fetchVolunteers: async () => {
    set({ loadingVolunteers: true, volunteerError: null });

    try {
      const res = await fetch("http://localhost:8080/volunteers");
      if (!res.ok) throw new Error("Failed to fetch volunteers");

      const data = await res.json();
      set({ volunteers: data, loadingVolunteers: false });

    } catch (e) {
      set({ volunteerError: e.message, loadingVolunteers: false });
    }
  },

  // --- ADD NEW TASK ---
  addTask: async (task) => {
    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const newTask = await res.json();

      set({ tasks: [...get().tasks, newTask] });

    } catch (e) {
      set({ taskError: e.message });
    }
  },

  // --- ADD NEW VOLUNTEER ---
    addVolunteer: async (volunteer) => {
    try {
      const res = await fetch("http://localhost:8080/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteer),
      });

      if (!res.ok) throw new Error("Failed to create volunteer");

      const newVolunteer = await res.json();

      set({ volunteers: [...get().volunteers, newVolunteer] });

    } catch (e) {
      set({ volunteerError: e.message });
    }
  },
}));
