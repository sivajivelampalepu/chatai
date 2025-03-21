# Chat Application

This is a frontend chat application built with React, Redux, and Material-UI 

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the app: `npm start`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Features
- Multiple conversation management with Redux.
- Thumbs up/down feedback for individual AI responses (visible on hover).
- Regenerate AI responses (visible on hover).
- Share conversations via a unique link.
- Feedback overview page with sorting and filtering.
- Modern design with a teal and gray color scheme, including a header with a user icon and dark mode toggle, and a footer.
- Dark mode toggle with a refined dark theme for better readability and contrast.
- Message timestamps for each chat message.
- Collapsible "Past Conversations" sidebar with an expand/collapse icon.
- Clear all conversations option in the sidebar with a styled confirmation dialog.
- Typing indicator while the AI responds.
- Copy message to clipboard functionality (visible on hover for AI messages, always visible for user messages).
- Enhanced user experience with SweetAlert2 for confirmation dialogs and notifications.
- Scrollable chat box to keep the input area and buttons fixed while messages scroll independently.

## Notes
- The AI responses are mocked in `src/api/mockApi.js` with a variety of predefined responses.
- Conversations are "saved" by logging to the console (no database required).