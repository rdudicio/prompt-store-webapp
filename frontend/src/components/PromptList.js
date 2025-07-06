import React from 'react';
import PromptCard from './PromptCard';
import { Box, Typography } from '@mui/material';

const PromptList = ({ prompts }) => {
    if (!prompts || prompts.length === 0) {
        return <Typography>No prompts found.</Typography>;
    }

    return (
        <Box>
            {prompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
            ))}
        </Box>
    );
};

export default PromptList;
