import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; // Import MemoryRouter
import PromptCard from '../PromptCard';

describe('PromptCard', () => {
  const mockPrompt = {
    id: 1,
    title: 'Test Prompt Title',
    text: 'This is a test prompt description.',
    tags: ['react', 'testing'],
    created_at: '2023-01-01T10:00:00Z',
    updated_at: '2023-01-01T10:00:00Z',
  };

  it('renders prompt title and text', () => {
    render(
      <MemoryRouter>
        <PromptCard prompt={mockPrompt} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Prompt Title/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test prompt description./i)).toBeInTheDocument();
  });

  it('renders tags correctly', () => {
    render(
      <MemoryRouter>
        <PromptCard prompt={mockPrompt} />
      </MemoryRouter>
    );
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/testing/i)).toBeInTheDocument();
  });

  // Add more tests for interaction, routing, etc. as PromptCard functionality expands
});