import axios from 'axios';
import { getPrompts, getPrompt, createPrompt, updatePrompt, deletePrompt } from '../api';

jest.mock('axios'); // This will now pick up the manual mock from __mocks__/axios.js

describe('API Service', () => {
  // Get the mocked axios instance from the manual mock
  const mockAxiosInstance = axios.create();

  beforeEach(() => {
    mockAxiosInstance.get.mockClear();
    mockAxiosInstance.post.mockClear();
    mockAxiosInstance.put.mockClear();
    mockAxiosInstance.delete.mockClear();
    jest.clearAllMocks();
  });

  it('getPrompts fetches prompts successfully', async () => {
    const mockPrompts = [{ id: 1, title: 'Test Prompt' }];
    mockAxiosInstance.get.mockResolvedValue({ data: mockPrompts });

    const response = await getPrompts();
    expect(response.data).toEqual(mockPrompts);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/prompts', {
      params: { q: '' }  // no "tags"
    });
  });

  it('getPrompts handles search and tags parameters', async () => {
    const mockPrompts = [{ id: 1, title: 'Search Prompt' }];
    mockAxiosInstance.get.mockResolvedValue({ data: mockPrompts });

    const response = await getPrompts('search', ['tag1', 'tag2']);
    expect(response.data).toEqual(mockPrompts);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/prompts', {
      params: { q: 'search', tags: 'tag1,tag2' },
    });
  });

  it('getPrompt fetches a single prompt successfully', async () => {
    const mockPrompt = { id: 1, title: 'Single Prompt' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockPrompt });

    const response = await getPrompt(1);
    expect(response.data).toEqual(mockPrompt);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/prompts/1');
  });

  it('createPrompt sends correct data and returns new prompt', async () => {
    const newPromptData = { title: 'New Prompt', text: 'New Text', tags: ['new'] };
    const createdPrompt = { id: 2, ...newPromptData };
    mockAxiosInstance.post.mockResolvedValue({ data: createdPrompt });

    const response = await createPrompt(newPromptData);
    expect(response.data).toEqual(createdPrompt);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/prompts', newPromptData);
  });

  it('updatePrompt sends correct data and returns updated prompt', async () => {
    const updatedPromptData = { title: 'Updated Prompt', text: 'Updated Text', tags: ['updated'] };
    const updatedPrompt = { id: 1, ...updatedPromptData };
    mockAxiosInstance.put.mockResolvedValue({ data: updatedPrompt });

    const response = await updatePrompt(1, updatedPromptData);
    expect(response.data).toEqual(updatedPrompt);
    expect(mockAxiosInstance.put).toHaveBeenCalledWith('/prompts/1', updatedPromptData);
  });

  it('deletePrompt sends delete request successfully', async () => {
    mockAxiosInstance.delete.mockResolvedValue({ status: 200 });

    const response = await deletePrompt(1);
    expect(response.status).toBe(200);
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/prompts/1');
  });

  it('handles API errors gracefully', async () => {
    mockAxiosInstance.get.mockRejectedValue(new Error('Network Error'));
    await expect(getPrompts()).rejects.toThrow('Network Error');
  });
});