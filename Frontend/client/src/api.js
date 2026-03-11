import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2"

const api = axios.create({baseURL : BASE_URL, timeout: 8000})

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchExpenses = async ()=>{
    console.log("API: Fetching expenses...");
    const res = await api.get('/expense')
    return (res.data && res.data.data) || []
}

export const createExpense = async (payload)=>{
    console.log("API: Creating expense...", payload);
    const res = await api.post("/expense", payload)
    return (res.data && res.data.data) || []
}

export const updateExpense = async (id,payload)=>{
    console.log(`API: Updating expense ${id}...`, payload);
    const res = await api.put(`/expense/${id}`,payload)
    return (res.data && res.data.data) || []
}

export const deleteExpense = async (id)=>{
    console.log(`API: Deleting expense ${id}...`);
    const res = await api.delete(`/expense/${id}`)
    console.log("API: Delete response:", res.data);
    return res.data || null
}
