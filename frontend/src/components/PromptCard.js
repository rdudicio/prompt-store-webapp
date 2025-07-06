import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Link } from 'react-router';

const PromptCard = ({ prompt }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <Link to={`/prompt/${prompt.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {prompt.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {prompt.text.substring(0, 100)}...
                    </Typography>
                    <div>
                        {prompt.tags.map((tag, index) => (
                            <Chip key={index} label={tag} sx={{ mr: 1 }} />
                        ))}
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default PromptCard;
