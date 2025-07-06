import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import NewPromptPage from './pages/NewPromptPage';
import PromptDetailPage from './pages/PromptDetailPage';
import EditPromptPage from './pages/EditPromptPage';
import './App.css';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Promptstore
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPromptPage />} />
          <Route path="/prompt/:id" element={<PromptDetailPage />} />
          <Route path="/edit/:id" element={<EditPromptPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
