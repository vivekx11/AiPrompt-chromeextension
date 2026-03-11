// Gemini API configuration
const API_KEY = 'AIzaSyAI0KROLv0Lqyvj6Wui3hBmuHvXc8TWvOs';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhancePrompt') {
    enhancePromptWithAI(request.text)
      .then(enhancedPrompt => {
        sendResponse({ success: true, enhancedPrompt: enhancedPrompt });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Async response ke liye
  }
});

async function enhancePromptWithAI(userPrompt) {
  const prompt = `You are a helpful AI prompt engineer. The user has selected this text/prompt:

"${userPrompt}"

Please enhance this prompt to make it more clear, detailed, and effective. Make it better for getting good results from AI. Keep the core intent but add helpful details and structure.

Return ONLY the enhanced prompt, nothing else.`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.candidates[0].content.parts[0].text;
    
    return enhancedPrompt;
  } catch (error) {
    throw new Error('Failed to enhance prompt: ' + error.message);
  }
}
