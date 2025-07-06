import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromptForm from '../PromptForm';

describe('PromptForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields correctly', () => {
    render(<PromptForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add a tag/i)).toBeInTheDocument(); // Updated label text
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('allows typing into input fields', async () => {
    const user = userEvent.setup();
    render(<PromptForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const textInput = screen.getByLabelText(/Prompt Text/i);
    const tagsInput = screen.getByLabelText(/Add a tag/i); // Updated label text

    await user.type(titleInput, 'New Prompt Title');
    await user.type(textInput, 'New Prompt Text');
    await user.type(tagsInput, 'tag1');
    await user.click(screen.getByRole('button', { name: /Add Tag/i })); // Click Add Tag button
    await user.type(tagsInput, 'tag2');
    await user.click(screen.getByRole('button', { name: /Add Tag/i })); // Click Add Tag button

    expect(titleInput).toHaveValue('New Prompt Title');
    expect(textInput).toHaveValue('New Prompt Text');
    // Tags are displayed as chips, not in the input field after adding
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when submitted', async () => {
    const user = userEvent.setup();
    render(<PromptForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/Title/i), 'Submitted Title');
    await user.type(screen.getByLabelText(/Prompt Text/i), 'Submitted Text');
    await user.type(screen.getByLabelText(/Add a tag/i), 'tagA');
    await user.click(screen.getByRole('button', { name: /Add Tag/i })); // Click Add Tag button
    await user.type(screen.getByLabelText(/Add a tag/i), 'tagB');
    await user.click(screen.getByRole('button', { name: /Add Tag/i })); // Click Add Tag button

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Submitted Title',
      text: 'Submitted Text',
      tags: ['tagA', 'tagB'],
    });
  });

  it('pre-fills form for editing when initialData is provided', () => {
    const initialData = {
      title: 'Edit Title',
      text: 'Edit Text',
      tags: ['edit', 'test'],
    };
    render(<PromptForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/Title/i)).toHaveValue('Edit Title');
    expect(screen.getByLabelText(/Prompt Text/i)).toHaveValue('Edit Text');
    expect(screen.getByText('edit')).toBeInTheDocument(); // Check for chips
    expect(screen.getByText('test')).toBeInTheDocument(); // Check for chips
    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
  });
});
