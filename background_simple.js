// Background script for context menu
// Get API key from storage or use default
let API_KEY = '';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Load API key from storage
chrome.storage.local.get(['geminiApiKey'], (result) => {
  if (result.geminiApiKey) {
    API_KEY = result.geminiApiKey;
    console.log('API key loaded from storage');
  } else {
    console.log('No API key found. Please set it in the extension popup.');
  }
});

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'enhancePrompt',
    title: '🤖 Enhance Prompt with AI',
    contexts: ['selection', 'editable']
  });
  
  console.log('Context menu created');
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'enhancePrompt') {
    const selectedText = info.selectionText;
    console.log('Enhancing:', selectedText);
    
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'enhance',
      text: selectedText
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'callAPI') {
    enhanceWithAPI(request.text)
      .then(result => sendResponse({ success: true, enhanced: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function enhanceWithAPI(userPrompt) {
  if (!API_KEY) {
    throw new Error('API key not configured. Please set it in the extension popup.');
  }
  
  const prompt = `You are an expert AI prompt engineer. Enhance this prompt to be more detailed, clear, and professional:

"${userPrompt}"

Return ONLY the enhanced prompt, nothing else.`;

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    throw new Error('API call failed: ' + response.status);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
}

console.log('Background script loaded');
