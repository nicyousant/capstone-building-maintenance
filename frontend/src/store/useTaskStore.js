import { create } from 'zustand'

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null});
    
        try {
            const res = await fetch('http://localhost:8080/tasks');
            if (!res.ok) throw new Error("Failed to fetch tasks");

            const data = await res.json();

            set({ tasks: data, loading: false });
        } catch (e) {
            set({ error: e.message, loading: false });
        }
    },
})) 