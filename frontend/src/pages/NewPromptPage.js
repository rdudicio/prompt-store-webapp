import React from 'react';
import { useNavigate } from 'react-router';
import PromptForm from '../components/PromptForm';
import { createPrompt } from '../services/api';

const NewPromptPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (promptData) => {
    try {
      await createPrompt(promptData);
      navigate('/'); // Redirect to home page after successful creation
    } catch (error) {
      console.error("Error creating prompt:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create New Prompt</h1>
      <PromptForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPromptPage;
