import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import NewPromptPage from '../NewPromptPage';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('NewPromptPage', () => {
  it('renders PromptForm for creating a new prompt', () => {
    render(
      <MemoryRouter>
        <NewPromptPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt Text/i)).toBeInTheDocument(); // Updated label text
    expect(screen.getByLabelText(/Add a tag/i)).toBeInTheDocument(); // Updated label text
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  // Add tests for successful submission and navigation
});