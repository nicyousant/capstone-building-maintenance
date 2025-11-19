import { create } from 'zustand'

export const useTaskStore = create((set) => ({
    tasks: [],
    loadingTasks: false,
    error: null,

    fetchTasks: async () => {
        set({ loadingTasks: true, error: null});
    
        try {
            const res = await fetch('http://localhost:8080/tasks');
            if (!res.ok) throw new Error("Failed to fetch tasks");

            const data = await res.json();

            set({ tasks: data, loadingTasks: false });
        } catch (e) {
            set({ error: e.message, loading: false });
        }
    },

    volunteers: [],
    loadingVolunteers: false,
    error: null,

    fetchVolunteers: async () => {
        set({ loadingVolunteers: true, error: null});
    
        try {
            const res = await fetch('http://localhost:8080/volunteers');
            if (!res.ok) throw new Error("Failed to fetch volunteers");

            const data = await res.json();

            set({ volunteers: data, loadingVolunteers: false });
        } catch (e) {
            set({ error: e.message, loadingVolunteers: false });
        }
    },
})) 