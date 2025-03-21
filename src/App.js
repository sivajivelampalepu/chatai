import './App.css';
import { Provider } from 'react-redux';
import store from './Store/store';
import Chatbot from './Components/Chartbot';
import { useState } from 'react';
import { Box} from '@mui/material';
import FeedbackOverview from './Components/FeedbackOverview';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ThemeProviderWrapper from './Components/ThemeProviderWrapper';

function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <>
        <Provider store={store}>
        <ThemeProviderWrapper>
          <Header/>
          <Box sx={{ flexGrow: 1 }}>
          {showFeedback ? (
            <FeedbackOverview onBack={() => setShowFeedback(false)} />
          ) : (
            <Chatbot onViewFeedback={() => setShowFeedback(true)} />
          )}
        </Box>
      <Footer/>
</ThemeProviderWrapper>
    </Provider>
    </>
  );
}

export default App;
