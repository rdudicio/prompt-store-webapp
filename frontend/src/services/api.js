import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8100/api',
});

export const getPrompts = (q = '', tags = '') => {
    return apiClient.get('/prompts', { params: { q, tags } });
};

export const getPrompt = (id) => {
    return apiClient.get(`/prompts/${id}`);
};

export const createPrompt = (prompt) => {
    return apiClient.post('/prompts', prompt);
};

export const updatePrompt = (id, prompt) => {
    return apiClient.put(`/prompts/${id}`, prompt);
};

export const deletePrompt = (id) => {
    return apiClient.delete(`/prompts/${id}`);
};
