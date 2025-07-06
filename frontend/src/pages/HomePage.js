import React, { useState, useCallback } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router';
import FilterBar from '../components/FilterBar';
import PromptList from '../components/PromptList';
import { getPrompts } from '../services/api';

const HomePage = () => {
    const [prompts, setPrompts] = useState([]);
    const [filters, setFilters] = useState({ q: '', tags: '' });

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    }, []);

    React.useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await getPrompts(filters.q, filters.tags);
                setPrompts(response.data);
            } catch (error) {
                console.error("Error fetching prompts:", error);
            }
        };
        fetchPrompts();
    }, [filters]);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Promptstore
                </Typography>
                <Button component={Link} to="/new" variant="contained" color="primary" sx={{ mb: 2 }}>
                    Create New Prompt
                </Button>
                <FilterBar onFilterChange={handleFilterChange} />
                <PromptList prompts={prompts} />
            </Box>
        </Container>
    );
};

export default HomePage;
