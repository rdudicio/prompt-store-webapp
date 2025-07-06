import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; // Import MemoryRouter
import HomePage from '../HomePage';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('HomePage', () => {
  const mockPrompts = [
    {
      id: 1,
      title: 'Home Prompt 1',
      text: 'Home Text 1',
      tags: ['home', 'test'],
      created_at: '2023-01-01T10:00:00Z',
      updated_at: '2023-01-01T10:00:00Z',
    },
  ];

  beforeEach(() => {
    // Mock the getPrompts function to return an object with a 'data' property
    api.getPrompts.mockResolvedValue({ data: mockPrompts });
  });

  it('renders FilterBar and PromptList', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    ); // Wrap HomePage with MemoryRouter
    expect(screen.getByLabelText(/Search prompts/i)).toBeInTheDocument(); // From FilterBar
    await waitFor(() => {
      expect(screen.getByText(/Home Prompt 1/i)).toBeInTheDocument(); // From PromptList
    });
  });

  // Add tests for search and filter functionality integration
});
