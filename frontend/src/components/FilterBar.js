import React from 'react';
import { Box, TextField } from '@mui/material';

const FilterBar = ({ onFilterChange }) => {
    return (
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
            <TextField
                label="Search Prompts"
                variant="outlined"
                fullWidth
                onChange={(e) => onFilterChange({ q: e.target.value })}
            />
            <TextField
                label="Filter by Tags (comma-separated)"
                variant="outlined"
                fullWidth
                onChange={(e) => onFilterChange({ tags: e.target.value })}
            />
        </Box>
    );
};

export default FilterBar;
