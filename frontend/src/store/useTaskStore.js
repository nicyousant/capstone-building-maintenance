import { create } from 'zustand';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loadingTasks: false,
  taskError: null,

  volunteers: [],
  loadingVolunteers: false,
  volunteerError: null,

  // --- GET SINGLE TASK ---
  getTaskById: (id) => {
    return get().tasks.find((t) => t._id === id);
  },

  // --- GET SINGLE VOLUNTEER ---
    getVolunteerById: (id) => {
    return get().volunteers.find((v) => v._id === id);
  },


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

  // --- UPDATE TASK  ---
// --- UPDATE TASK  ---
updateTask: async (updatedTask) => {
  try {
    if (!updatedTask._id) throw new Error("Task ID missing");

    const res = await fetch(`http://localhost:8080/tasks/${updatedTask._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    if (!res.ok) throw new Error("Failed to update task");

    const data = await res.json();

    // Update the task in the Zustand store
    set({
      tasks: get().tasks.map((t) => (t._id === data._id ? data : t)),
    });
  } catch (e) {
    set({ taskError: e.message });
  }
},



  // --- DELETE TASK ---
  deleteTask: async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      set({
        tasks: get().tasks.filter((t) => t._id !== id),
      });

    } catch (e) {
      set({ error: e.message });
    }
  },

  // --- ADD VOLUNTEER ---
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

    // --- UPDATE VOLUNTEER  ---
 updateVolunteer: async (updatedVolunteer) => {
  try {
    if (!updatedVolunteer._id) throw new Error("Volunteer ID missing");

    const res = await fetch(`http://localhost:8080/volunteers/${updatedVolunteer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVolunteer),
    });

    if (!res.ok) throw new Error("Failed to update volunteer");

    const data = await res.json();

    // Update the volunteer in the Zustand store
    set({
      volunteers: get().volunteers.map((v) => (v._id === data._id ? data : v)),
    });
  } catch (e) {
    set({ volunteerError: e.message });
  }
},

  // --- DELETE TASK ---
  deleteVolunteer: async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/volunteers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete volunteer");

      set({
        volunteers: get().volunteers.filter((v) => v._id !== id),
      });

    } catch (e) {
      set({ error: e.message });
    }
  },

}));
