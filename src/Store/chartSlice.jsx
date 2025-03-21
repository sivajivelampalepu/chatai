import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    currentConversation: null,
  },
  reducers: {
    startConversation(state) {
      state.currentConversation = {
        id: Date.now(),
        messages: [],
        feedback: null,
      };
    },
    addMessage(state, action) {
      const { message, isUser } = action.payload;
      if (state.currentConversation) {
        if (state.currentConversation.messages.length === 0) {
          state.conversations.push({ ...state.currentConversation });
        }
        state.currentConversation.messages.push({
          text: message,
          isUser,
          timestamp: Date.now(),
          feedback: null,
        });
        const convIndex = state.conversations.findIndex(conv => conv.id === state.currentConversation.id);
        if (convIndex !== -1) {
          state.conversations[convIndex] = { ...state.currentConversation };
        }
      }
    },
    saveFeedback(state, action) {
      const { rating, text } = action.payload;
      if (state.currentConversation) {
        state.currentConversation.feedback = { rating, text };
        const convIndex = state.conversations.findIndex(conv => conv.id === state.currentConversation.id);
        if (convIndex !== -1) {
          state.conversations[convIndex] = { ...state.currentConversation };
        }
      }
    },
    setCurrentConversation(state, action) {
      const conversation = state.conversations.find(conv => conv.id === action.payload);
      state.currentConversation = conversation ? { ...conversation } : null;
    },
    saveMessageFeedback(state, action) {
      const { messageIndex, feedback } = action.payload;
      if (state.currentConversation) {
        state.currentConversation.messages[messageIndex].feedback = feedback;
        const convIndex = state.conversations.findIndex(conv => conv.id === state.currentConversation.id);
        if (convIndex !== -1) {
          state.conversations[convIndex] = { ...state.currentConversation };
        }
      }
    },
    clearConversations(state) {
      state.conversations = [];
      state.currentConversation = null;
    },
  },
});

export const { startConversation, addMessage, saveFeedback, setCurrentConversation, saveMessageFeedback, clearConversations } = chatSlice.actions;
export default chatSlice.reducer;