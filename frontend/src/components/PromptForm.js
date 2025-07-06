import React, { useState } from 'react';
import { Box, Button, TextField, Chip } from '@mui/material';

const PromptForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [text, setText] = useState(initialData.text || '');
    const [tags, setTags] = useState(initialData.tags || []);
    const [currentTag, setCurrentTag] = useState('');

    const handleAddTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, text, tags });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Prompt Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    rows={4}
                    required
                />
                <Box>
                    {tags.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                            sx={{ mr: 1 }}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        label="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                    />
                    <Button onClick={handleAddTag} variant="contained">
                        Add Tag
                    </Button>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default PromptForm;
