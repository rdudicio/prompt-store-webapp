import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../FilterBar';

describe('FilterBar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders search input and tag filter input', () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
    expect(screen.getByLabelText(/Search Prompts/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter by Tags/i)).toBeInTheDocument();
  });

  it('calls onFilterChange with search query when search input changes', async () => {
    const user = userEvent.setup();
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
    const searchInput = screen.getByLabelText(/Search Prompts/i);

    await user.type(searchInput, 'test query');
    expect(mockOnFilterChange).toHaveBeenCalledWith({ q: 'test query' });
  });

  it('calls onFilterChange with tags when tag filter input changes', async () => {
    const user = userEvent.setup();
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
    const tagsInput = screen.getByLabelText(/Filter by Tags/i);

    await user.type(tagsInput, 'tag1,tag2');
    expect(mockOnFilterChange).toHaveBeenCalledWith({ tags: 'tag1,tag2' });
  });

  it('handles empty search query correctly', async () => {
    const user = userEvent.setup();
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
    const searchInput = screen.getByLabelText(/Search Prompts/i);

    await user.type(searchInput, 'some text'); // Type something first
    mockOnFilterChange.mockClear(); // Clear mock calls from typing
    await user.clear(searchInput);
    expect(mockOnFilterChange).toHaveBeenCalledWith({ q: '' });
  });

  it('handles empty tag filter correctly', async () => {
    const user = userEvent.setup();
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
    const tagsInput = screen.getByLabelText(/Filter by Tags/i);

    await user.type(tagsInput, 'some tags'); // Type something first
    mockOnFilterChange.mockClear(); // Clear mock calls from typing
    await user.clear(tagsInput);
    expect(mockOnFilterChange).toHaveBeenCalledWith({ tags: '' });
  });
});