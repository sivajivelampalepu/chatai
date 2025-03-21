import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem } from '@mui/material';

const FeedbackOverview = ({ onBack }) => {
  const { conversations } = useSelector((state) => state.chattwo);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterRating, setFilterRating] = useState('all');

  const feedbackConversations = conversations.filter(conv => conv.feedback);

  const sortedConversations = [...feedbackConversations].sort((a, b) => {
    return sortOrder === 'desc'
      ? b.feedback.rating - a.feedback.rating
      : a.feedback.rating - b.feedback.rating;
  });

  const filteredConversations = filterRating === 'all'
    ? sortedConversations
    : sortedConversations.filter(conv => conv.feedback.rating === Number(filterRating));

  return (
    <>
     <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#37474F', fontWeight: 'bold' }}>
        Feedback Overview
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography sx={{ color: '#37474F', mb: 1 }}>Sort by Rating:</Typography>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{
              bgcolor: '#FFFFFF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E0E0E0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26A69A',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26A69A',
              },
            }}
          >
            <MenuItem value="desc">High to Low</MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography sx={{ color: '#37474F', mb: 1 }}>Filter by Rating:</Typography>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            sx={{
              bgcolor: '#FFFFFF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E0E0E0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26A69A',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26A69A',
              },
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {[1, 2, 3, 4, 5].map(rating => (
              <MenuItem key={rating} value={rating}>{rating}</MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            ml: 'auto',
            borderColor: '#26A69A',
            color: '#26A69A',
            '&:hover': { borderColor: '#2BBBAD', color: '#2BBBAD' },
          }}
        >
          Back to Chat
        </Button>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#26A69A' }}>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Conversation ID</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>First Message</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Thumbs Up</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Thumbs Down</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => {
                const thumbsUpCount = conv.messages.filter(msg => msg.feedback === 'thumbsUp').length;
                const thumbsDownCount = conv.messages.filter(msg => msg.feedback === 'thumbsDown').length;
                return (
                  <TableRow key={conv.id}>
                    <TableCell sx={{ color: '#37474F' }}>{conv.id}</TableCell>
                    <TableCell sx={{ color: '#37474F' }}>
                      {conv.messages[0]?.text.slice(0, 30) + '...' || 'No messages'}
                    </TableCell>
                    <TableCell sx={{ color: '#37474F' }}>{conv.feedback.rating}/5</TableCell>
                    <TableCell sx={{ color: '#37474F' }}>{thumbsUpCount}</TableCell>
                    <TableCell sx={{ color: '#37474F' }}>{thumbsDownCount}</TableCell>
                    <TableCell sx={{ color: '#37474F' }}>{conv.feedback.text || 'No comments'}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ color: '#37474F', textAlign: 'center' }}>
                  No feedback available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
    </>
   
  );
};

export default FeedbackOverview;