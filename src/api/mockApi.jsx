// src/api/mockApi.js
export const getAIResponse = (userMessage) => {
    return new Promise((resolve) => {
      // Simulate a random delay between 500ms and 1500ms to mimic typing
      setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase().trim();
        let response;
  
        // Expanded mock responses with more categories
        const responses = {
          greetings: {
            keywords: ['hello', 'hi', 'hey'],
            replies: [
              'Hi there! How can I make your day even better?',
              'Hello! What’s on your mind today?',
              'Hey! Nice to see you—how can I help?',
            ],
          },
          farewells: {
            keywords: ['bye', 'goodbye', 'see you'],
            replies: [
              'Take care! Come back anytime you want to chat.',
              'Goodbye! I’ll be here if you need me!',
              'See you later—stay awesome!',
            ],
          },
          questions: {
            time: {
              keywords: ['what time is it', 'what is the time', 'time'],
              replies: () => `It’s currently ${new Date().toLocaleTimeString()}. What’s next on your schedule?`,
            },
            weather: {
              keywords: ['how’s the weather', 'what’s the weather like', 'weather'],
              replies: [
                'I’d say it’s sunny with a chance of witty replies! How’s it where you are?',
                'Looks like a perfect day for a chat—how’s the weather on your end?',
                'It might be cloudy with a chance of fun—how’s it looking where you are?',
              ],
            },
            help: {
              keywords: ['help', 'can you help me', 'i need help'],
              replies: [
                'Of course I can help! What do you need assistance with?',
                'I’m here for you—what kind of help do you need?',
                'Let’s solve this together—what’s the issue?',
              ],
            },
          },
          mood: {
            keywords: ['how are you', 'are you okay', 'how you doing'],
            replies: [
              'I’m doing great, thanks for asking! How about you?',
              'I’m feeling awesome—how about you?',
              'I’m in a fantastic mood! How are you holding up?',
            ],
          },
          joke: {
            keywords: ['tell me a joke', 'joke', 'make me laugh'],
            replies: [
              'Why did the computer go to school? It wanted to improve its *byte*!',
              'What do you call a bear with no socks on? Barefoot!',
              'Why don’t skeletons fight in school? They don’t have the guts for it!',
            ],
          },
          compliment: {
            keywords: ['you’re awesome', 'you’re great', 'nice job'],
            replies: [
              'Thanks, you’re pretty awesome too!',
              'Aw, you’re making me blush—thanks!',
              'I appreciate that! You’re great too!',
            ],
          },
          fact: {
            keywords: ['tell me a fact', 'fact', 'did you know'],
            replies: [
              'Did you know the sun is 93 million miles away from Earth? Pretty far, right?',
              'Here’s a fun fact: Honey never spoils—it’s a natural preservative!',
              'Did you know octopuses have three hearts and can change color to blend in?',
            ],
          },
          math: {
            keywords: ['what is', 'calculate', 'solve'],
            replies: () => {
              // Simple math solver for basic addition/subtraction
              const match = lowerMessage.match(/what is (\d+) (plus|minus) (\d+)/);
              if (match) {
                const num1 = parseInt(match[1]);
                const operator = match[2];
                const num2 = parseInt(match[3]);
                if (operator === 'plus') {
                  return `${num1} plus ${num2} is ${num1 + num2}. Need help with another calculation?`;
                } else if (operator === 'minus') {
                  return `${num1} minus ${num2} is ${num1 - num2}. Got another math problem for me?`;
                }
              }
              return 'I can help with simple math! Try asking something like "What is 5 plus 3?"';
            },
          },
          food: {
            keywords: ['food', 'hungry', 'what should i eat'],
            replies: [
              'How about some pizza? It’s always a good choice!',
              'I’m thinking pasta—what’s your favorite food?',
              'If you’re hungry, maybe try a sandwich! What do you feel like eating?',
            ],
          },
          motivation: {
            keywords: ['i’m tired', 'i’m sad', 'motivate me'],
            replies: [
              'You’ve got this! Take a deep breath and tackle one thing at a time—you’re stronger than you think!',
              'I’m sorry you’re feeling down. You’re amazing, and I believe in you—let’s do this together!',
              'It’s okay to feel tired. How about a quick break, then we’ll get back to it with full energy?',
            ],
          },
          default: [
            'Hmm, I’m not sure how to respond to that. Could you say more?',
            'Interesting! Can you tell me more about that?',
            'I’m curious—could you elaborate a bit?',
            'That’s a new one for me! Can you give me more details?',
          ],
        };
  
        // Find a matching response
        if (responses.greetings.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.greetings.replies[Math.floor(Math.random() * responses.greetings.replies.length)];
        } else if (responses.farewells.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.farewells.replies[Math.floor(Math.random() * responses.farewells.replies.length)];
        } else if (responses.questions.time.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.questions.time.replies();
        } else if (responses.questions.weather.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.questions.weather.replies[Math.floor(Math.random() * responses.questions.weather.replies.length)];
        } else if (responses.questions.help.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.questions.help.replies[Math.floor(Math.random() * responses.questions.help.replies.length)];
        } else if (responses.mood.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.mood.replies[Math.floor(Math.random() * responses.mood.replies.length)];
        } else if (responses.joke.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.joke.replies[Math.floor(Math.random() * responses.joke.replies.length)];
        } else if (responses.compliment.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.compliment.replies[Math.floor(Math.random() * responses.compliment.replies.length)];
        } else if (responses.fact.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.fact.replies[Math.floor(Math.random() * responses.fact.replies.length)];
        } else if (responses.math.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.math.replies();
        } else if (responses.food.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.food.replies[Math.floor(Math.random() * responses.food.replies.length)];
        } else if (responses.motivation.keywords.some(k => lowerMessage.includes(k))) {
          response = responses.motivation.replies[Math.floor(Math.random() * responses.motivation.replies.length)];
        } else {
          response = responses.default[Math.floor(Math.random() * responses.default.length)];
        }
  
        resolve(response);
      }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
    });
  };
  
  export const saveConversation = (conversation) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Conversation saved:', conversation);
        resolve({ success: true });
      }, 500);
    });
  };