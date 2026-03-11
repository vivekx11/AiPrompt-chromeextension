// Text select hone par logo show karna
let aiButton = null;
let selectedText = '';

console.log('🤖 AI Prompt Enhancer loaded!');

document.addEventListener('mouseup', function(e) {
  console.log('Mouse up event detected');
  const selection = window.getSelection().toString().trim();
  console.log('Selected text:', selection);
  
  if (selection.length > 0) {
    selectedText = selection;
    console.log('Showing AI button at:', e.pageX, e.pageY);
    showAIButton(e.pageX, e.pageY);
  } else {
    hideAIButton();
  }
});

function showAIButton(x, y) {
  console.log('showAIButton called');
  // Pehle se button hai to remove karo
  hideAIButton();
  
  // Naya button banao
  aiButton = document.createElement('div');
  aiButton.id = 'ai-prompt-enhancer-btn';
  aiButton.innerHTML = '🤖 AI';
  aiButton.style.position = 'absolute';
  aiButton.style.left = x + 'px';
  aiButton.style.top = (y + 10) + 'px';
  aiButton.style.zIndex = '999999';
  
  console.log('Button created, appending to body');
  
  aiButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('AI button clicked!');
    processWithAI(selectedText);
  });
  
  document.body.appendChild(aiButton);
  console.log('Button appended, should be visible now');
}

function hideAIButton() {
  if (aiButton) {
    aiButton.remove();
    aiButton = null;
  }
}

async function processWithAI(text) {
  hideAIButton();
  
  // Loading indicator
  showNotification('⏳ AI se prompt enhance ho raha hai...');
  
  try {
    // Background script ko message bhejo
    chrome.runtime.sendMessage({
      action: 'enhancePrompt',
      text: text
    }, function(response) {
      if (response.success) {
        // History mein save karo
        saveToHistory(text, response.enhancedPrompt);
        
        // Enhanced prompt show karo
        showEnhancedPrompt(text, response.enhancedPrompt);
      } else {
        showNotification('❌ Error: ' + response.error);
      }
    });
  } catch (error) {
    showNotification('❌ Error: ' + error.message);
  }
}

function showEnhancedPrompt(original, enhanced) {
  // Modal banao
  const modal = document.createElement('div');
  modal.id = 'ai-prompt-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>🤖 AI Enhanced Prompt</h2>
      
      <div class="prompt-section">
        <h3>📝 Original Prompt:</h3>
        <div class="prompt-box original">${escapeHtml(original)}</div>
      </div>
      
      <div class="prompt-section">
        <h3>✨ Enhanced Prompt:</h3>
        <div class="prompt-box enhanced">${escapeHtml(enhanced)}</div>
        <button class="copy-btn" data-text="${escapeHtml(enhanced)}">📋 Copy</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close button
  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  // Copy button
  modal.querySelector('.copy-btn').addEventListener('click', function() {
    const text = this.getAttribute('data-text');
    navigator.clipboard.writeText(text);
    showNotification('✅ Copied to clipboard!');
  });
  
  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'ai-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function saveToHistory(original, enhanced) {
  chrome.storage.local.get(['promptHistory'], function(result) {
    const history = result.promptHistory || [];
    history.unshift({
      original: original,
      enhanced: enhanced,
      timestamp: new Date().toISOString()
    });
    
    // Max 50 entries rakhna
    if (history.length > 50) {
      history.pop();
    }
    
    chrome.storage.local.set({ promptHistory: history });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Click anywhere to hide button
document.addEventListener('click', function(e) {
  if (aiButton && !aiButton.contains(e.target)) {
    hideAIButton();
  }
});
