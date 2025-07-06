import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PromptList from '../PromptList';

// Mock the PromptCard component
jest.mock('../PromptCard', () => {
  return ({ prompt }) => (
    <div data-testid="mock-prompt-card">
      <h3>{prompt.title}</h3>
      <p>{prompt.text}</p>
      <div>{prompt.tags.join(', ')}</div>
    </div>
  );
});

describe('PromptList', () => {
  const mockPrompts = [
    {
      id: 1,
      title: 'Prompt 1',
      text: 'Text 1',
      tags: ['tag1'],
      created_at: '2023-01-01T10:00:00Z',
      updated_at: '2023-01-01T10:00:00Z',
    },
    {
      id: 2,
      title: 'Prompt 2',
      text: 'Text 2',
      tags: ['tag2'],
      created_at: '2023-01-02T10:00:00Z',
      updated_at: '2023-01-02T10:00:00Z',
    },
  ];

  it('renders a list of prompts', async () => {
    render(<PromptList prompts={mockPrompts} />); // Pass prompts directly
    await waitFor(() => {
      expect(screen.getByText(/Prompt 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Prompt 2/i)).toBeInTheDocument();
    });
  });

  it('displays a message when no prompts are found', async () => {
    render(<PromptList prompts={[]} />); // Pass empty array
    await waitFor(() => {
      expect(screen.getByText(/No prompts found./i)).toBeInTheDocument();
    });
  });
});
