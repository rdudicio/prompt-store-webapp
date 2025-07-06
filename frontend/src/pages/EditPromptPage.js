import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import PromptForm from '../components/PromptForm';
import { getPrompt, updatePrompt } from '../services/api';

const EditPromptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await getPrompt(id);
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching prompt for edit:", error);
        // Handle error, e.g., redirect or show message
      }
    };
    fetchPrompt();
  }, [id]);

  const handleSubmit = async (promptData) => {
    try {
      await updatePrompt(id, promptData);
      navigate(`/prompt/${id}`); // Redirect to the detail page after update
    } catch (error) {
      console.error("Error updating prompt:", error);
      // Optionally, display an error message to the user
    }
  };

  if (!initialData) {
    return <div>Loading prompt for edit...</div>;
  }

  return (
    <div>
      <h1>Edit Prompt</h1>
      <PromptForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
};

export default EditPromptPage;
