import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrompt, deletePrompt } from '../services/api';
import { Button, Box } from '@mui/material';

const PromptDetailPage = () => {
  const [prompt, setPrompt] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await getPrompt(id);
        setPrompt(response.data);
      } catch (error) {
        console.error("Error fetching prompt:", error);
        // Handle error, e.g., redirect to a 404 page or display an error message
      }
    };
    fetchPrompt();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePrompt(id);
      navigate('/'); // Redirect to home page after successful deletion
    } catch (error) {
      console.error("Error deleting prompt:", error);
      // Optionally, display an error message to the user
    }
  };

  if (!prompt) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{prompt.title}</h1>
      <p>{prompt.text}</p>
      <div>
        {prompt.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${prompt.id}`)} sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </div>
  );
};

export default PromptDetailPage;
