import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Collapse, InputAdornment } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { addMessage, clearConversations, saveFeedback, saveMessageFeedback, setCurrentConversation, startConversation } from '../Store/chartSlice';
import { getAIResponse, saveConversation } from '../api/mockApi';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';


const Chatbot = ({onViewFeedback}) => {
    const dispatch = useDispatch();
    const { conversations, currentConversation } = useSelector((state) => state.chattwo);
    const [input, setInput] = useState('');
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentConversation?.messages, isTyping]);
  
    const handleSend = async () => {
      if (!input.trim()) return;
  
      if (!currentConversation) {
        dispatch(startConversation());
      }
  
      dispatch(addMessage({ message: input, isUser: true }));
      setInput('');
      setIsTyping(true);
      const aiResponse = await getAIResponse(input);
      setIsTyping(false);
      dispatch(addMessage({ message: aiResponse, isUser: false }));
    };
  
    const handleEndConversation = () => {
      if (currentConversation?.messages.length > 0) {
        setShowFeedbackForm(true);
      }
    };
  
    const handleFeedbackSubmit = () => {
      if (rating > 0) {
        dispatch(saveFeedback({ rating, text: feedbackText }));
        saveConversation(currentConversation);
        setShowFeedbackForm(false);
        setRating(0);
        setFeedbackText('');
        dispatch(startConversation());
      }
    };
  
    const handleSelectConversation = (id) => {
      dispatch(setCurrentConversation(id));
      setShowFeedbackForm(false);
    };
  
    const handleShareConversation = (id) => {
      const shareUrl = `${window.location.origin}/conversation/${id}`;
      navigator.clipboard.writeText(shareUrl);
      Swal.fire({
        title: 'Success!',
        text: `Conversation URL copied to clipboard: ${shareUrl}`,
        icon: 'success',
        confirmButtonColor: '#26A69A',
      });
    };
  
    const handleMessageFeedback = (index, feedback) => {
      dispatch(saveMessageFeedback({ messageIndex: index, feedback }));
    };
  
    const handleRegenerateResponse = async (index) => {
      const userMessage = currentConversation.messages[index - 1]?.text;
      if (userMessage) {
        setIsTyping(true);
        const newResponse = await getAIResponse(userMessage);
        setIsTyping(false);
        const updatedMessages = [...currentConversation.messages];
        updatedMessages[index] = {
          ...updatedMessages[index],
          text: newResponse,
          feedback: null,
        };
        const updatedConversation = { ...currentConversation, messages: updatedMessages };
        dispatch({
          type: 'chat/setCurrentConversation',
          payload: updatedConversation,
        });
      }
    };
  
    const handleClearConversations = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This will clear all past conversations. This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#26A69A',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear all!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearConversations());
          dispatch(startConversation());
          Swal.fire({
            title: 'Cleared!',
            text: 'All conversations have been cleared.',
            icon: 'success',
            confirmButtonColor: '#26A69A',
          });
        }
      });
    };
  
    const handleCopyMessage = (text) => {
      navigator.clipboard.writeText(text);
      Swal.fire({
        title: 'Copied!',
        text: 'Message copied to clipboard!',
        icon: 'success',
        confirmButtonColor: '#26A69A',
        timer: 1500,
        showConfirmButton: false,
      });
    };
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const activeConversations = conversations.filter(conv => conv.messages.length > 0);
  
    return (
      <Box sx={{ display: 'flex', maxWidth: 1200, mx: 'auto', p: 3 }}>
     
        <Box
          sx={{
            width: isSidebarOpen ? 300 : 60,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 180px)',
            overflowY: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                display: isSidebarOpen ? 'block' : 'none',
              }}
            >
              Past Conversations
            </Typography>
            <IconButton onClick={toggleSidebar} sx={{ color: 'text.secondary' }}>
              {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={isSidebarOpen}>
            <Box>
              {activeConversations.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <IconButton
                    onClick={handleClearConversations}
                    sx={{ color: 'text.secondary' }}
                    aria-label="Clear all conversations"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              {activeConversations.length === 0 ? (
                <Typography sx={{ color: 'text.primary' }}>No conversations yet.</Typography>
              ) : (
                <List>
                  {activeConversations.map((conv) => (
                    <ListItem
                      key={conv.id}
                      button
                      onClick={() => handleSelectConversation(conv.id)}
                      sx={{
                        mb: 1,
                        borderRadius: 1,
                        bgcolor: currentConversation?.id === conv.id ? 'background.default' : 'transparent',
                        '&:hover': {
                          bgcolor: 'background.default',
                          transition: 'background-color 0.2s',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                            {conv.messages[0]?.text
                              ? conv.messages[0].text.slice(0, 20) + '...'
                              : `Conversation #${conv.id}`}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: 'text.secondary' }}>
                            {conv.feedback ? `Rating: ${conv.feedback.rating}/5` : 'No feedback'}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleShareConversation(conv.id)}>
                          <ShareIcon sx={{ color: 'text.secondary' }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Collapse>
        </Box>
  
        <Box
          sx={{
            flexGrow: 1,
            ml: 3,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            p: 3,
            height: 'calc(100vh - 180px)',
          }}
        >
      
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              bgcolor: 'background.default',
              borderRadius: 2,
              p: 3,
              mb: 2,
              maxHeight: 'calc(100% - 150px)',
            }}
          >
            {currentConversation?.messages.length > 0 ? (
              currentConversation.messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    textAlign: msg.isUser ? 'right' : 'left',
                    display: 'flex',
                    justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                    alignItems: 'center',
                    '&:hover .message-actions': { 
                      visibility: msg.isUser ? 'visible' : 'visible',
                    },
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 2,
                      bgcolor: msg.isUser ? 'primary.main' : 'background.paper',
                      color: msg.isUser ? '#FFFFFF' : 'text.primary',
                      borderRadius: 3,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption" sx={{ color: msg.isUser ? '#E0F7FA' : 'text.secondary', display: 'block', mt: 0.5 }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                    <Box
                      className="message-actions" 
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mt: 1,
                        visibility: msg.isUser ? 'visible' : 'hidden', 
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleCopyMessage(msg.text)}
                        sx={{ color: msg.isUser ? '#E0F7FA' : 'text.secondary' }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      {!msg.isUser && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleMessageFeedback(index, 'thumbsUp')}
                            disabled={msg.feedback !== null}
                            sx={{ color: msg.feedback === 'thumbsUp' ? 'primary.main' : 'text.secondary' }}
                          >
                            <ThumbUpIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleMessageFeedback(index, 'thumbsDown')}
                            disabled={msg.feedback !== null}
                            sx={{ color: msg.feedback === 'thumbsDown' ? '#d32f2f' : 'text.secondary' }}
                          >
                            <ThumbDownIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleRegenerateResponse(index)}
                            disabled={msg.feedback !== null}
                          >
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: 'text.primary', textAlign: 'center' }}>
                Start a conversation by sending a message!
              </Typography>
            )}
            {isTyping && (
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  AI is typing...
                </Typography>
                <CircularProgress size={20} sx={{ color: 'primary.main', ml: 1 }} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
  
          {currentConversation?.feedback && !showFeedbackForm && (
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>Feedback:</Typography>
              <Typography sx={{ color: 'text.primary' }}>Rating: {currentConversation.feedback.rating}/5</Typography>
              {currentConversation.feedback.text && (
                <Typography sx={{ color: 'text.primary' }}>Comments: {currentConversation.feedback.text}</Typography>
              )}
            </Box>
          )}

          {!showFeedbackForm && (
            <Box>
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Chat with the AI..."
                variant="outlined"
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSend}
                        disabled={!input.trim()}
                        sx={{
                          color: input.trim() ? 'primary.main' : 'action.disabled',
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    onClick={handleEndConversation}
                    variant="outlined"
                    disabled={!currentConversation || currentConversation.messages.length === 0}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': { borderColor: 'primary.dark', color: 'primary.dark' },
                    }}
                  >
                    End Conversation
                  </Button>
                </Box>
                <Button
                  onClick={onViewFeedback}
                  variant="text"
                  sx={{ color: 'primary.main', textTransform: 'none' }}
                >
                  View Feedback Overview
                </Button>
              </Box>
            </Box>
          )}
  
          {showFeedbackForm && (
            <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
                Rate the Conversation (1-5)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton key={star} onClick={() => setRating(star)} sx={{ p: 0 }}>
                    <StarRateIcon sx={{ color: star <= rating ? 'primary.main' : 'action.disabled', fontSize: 30 }} />
                  </IconButton>
                ))}
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Your feedback (optional)..."
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                onClick={handleFeedbackSubmit}
                variant="contained"
                disabled={rating === 0}
                sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Submit Feedback
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

export default Chatbot;