import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PromptDetailPage from '../PromptDetailPage';
import * as api from '../../services/api';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ id: '1' }), // Mock useParams to return a default ID
}));

jest.mock('../../services/api');

describe('PromptDetailPage', () => {
  const mockPrompt = {
    id: 1,
    title: 'Detail Prompt Title',
    text: 'This is the full text of the detail prompt.',
    tags: ['detail', 'page'],
    created_at: '2023-01-01T10:00:00Z',
    updated_at: '2023-01-01T10:00:00Z',
  };

  beforeEach(() => {
    api.getPrompt.mockResolvedValue({ data: mockPrompt }); // Updated to mock the data property
  });

  it('renders prompt details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/prompts/1']}>
        <Routes>
          <Route path="/prompts/:id" element={<PromptDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Detail Prompt Title/i })).toBeInTheDocument();
      expect(screen.getByText(/This is the full text of the detail prompt./i)).toBeInTheDocument();
      expect(screen.getByText('detail')).toBeInTheDocument(); // Specific tag text
      expect(screen.getByText('page')).toBeInTheDocument(); // Specific tag text
    });
    expect(api.getPrompt).toHaveBeenCalledWith('1');
  });

  it('displays a loading message initially', () => {
    api.getPrompt.mockReturnValueOnce(new Promise(() => {})); // Never resolve to simulate loading
    render(
      <MemoryRouter initialEntries={['/prompts/1']}>
        <Routes>
          <Route path="/prompts/:id" element={<PromptDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
