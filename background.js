// Gemini API configuration
const API_KEY = 'AIzaSyAI0KROLv0Lqyvj6Wui3hBmuHvXc8TWvOs';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background: Message received:', request);
  
  if (request.action === 'enhancePrompt') {
    console.log('Background: Enhancing prompt for text:', request.text);
    
    enhancePromptWithAI(request.text)
      .then(enhancedPrompt => {
        console.log('Background: Enhancement successful');
        sendResponse({ success: true, enhancedPrompt: enhancedPrompt });
      })
      .catch(error => {
        console.error('Background: Enhancement failed:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Async response ke liye
  }
});

async function enhancePromptWithAI(userPrompt) {
  console.log('Background: API call starting...');
  
  const prompt = `You are an expert AI prompt engineer. Analyze the user's prompt and create the BEST possible version.

USER'S ORIGINAL PROMPT:
"${userPrompt}"

YOUR TASK:
1. Analyze what the user wants to achieve
2. Identify missing details, context, or clarity
3. Restructure and enhance the prompt to be:
   - Clear and specific
   - Well-structured with proper formatting
   - Include relevant constraints or requirements
   - Add helpful context
   - Specify expected output format if applicable

4. Make it production-ready and professional

IMPORTANT: Return ONLY the enhanced prompt. No explanations, no meta-commentary, just the improved prompt that the user can directly use.

ENHANCED PROMPT:`;

  try {
    console.log('Background: Fetching from API...');
    
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
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log('Background: API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Background: API error data:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Background: API response data:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid API response format');
    }
    
    const enhancedPrompt = data.candidates[0].content.parts[0].text.trim();
    console.log('Background: Enhanced prompt:', enhancedPrompt);
    
    return enhancedPrompt;
  } catch (error) {
    console.error('Background: API Error:', error);
    throw new Error('Failed to enhance prompt: ' + error.message);
  }
}
