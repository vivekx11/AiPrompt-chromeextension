// Text select hone par logo show karna.
let aiButton = null;
let selectedText = '';
let targetInputElement = null; // Input field ko track karne ke liye

console.log('🤖 AI Prompt Enhancer loaded!');

// Text selection detect karo - specifically input fields ke liye bhi
document.addEventListener('mouseup', function(e) {
  console.log('Mouse up event detected');
  
  // Selection get karo
  const selection = window.getSelection().toString().trim();
  console.log('Selected text:', selection);
  
  // Check karo ki input/textarea mein hai ya nahi
  const target = e.target;
  const isInputField = target.tagName === 'TEXTAREA' || 
                       target.tagName === 'INPUT' || 
                       target.isContentEditable ||
                       target.closest('[contenteditable="true"]');
  
  console.log('Is input field:', isInputField);
  console.log('Target element:', target.tagName);
  
  if (selection.length > 0) {
    selectedText = selection;
    // Input element ko save karo
    targetInputElement = isInputField ? (target.closest('[contenteditable="true"]') || target) : null;
    console.log('Showing AI button at:', e.pageX, e.pageY);
    showAIButton(e.pageX, e.pageY);
  } else {
    hideAIButton();
  }
});

// Input fields mein bhi selection detect karo
document.addEventListener('selectionchange', function() {
  const selection = window.getSelection().toString().trim();
  
  if (selection.length > 0) {
    const activeElement = document.activeElement;
    const isInputField = activeElement.tagName === 'TEXTAREA' || 
                        activeElement.tagName === 'INPUT' ||
                        activeElement.isContentEditable ||
                        activeElement.closest('[contenteditable="true"]');
    
    if (isInputField) {
      console.log('Selection in input field detected:', selection);
      selectedText = selection;
      // Input element ko save karo
      targetInputElement = activeElement.closest('[contenteditable="true"]') || activeElement;
      
      // Input field ke position ke basis par button show karo
      const rect = activeElement.getBoundingClientRect();
      showAIButton(rect.right + window.scrollX, rect.top + window.scrollY);
    }
  }
});

function showAIButton(x, y) {
  console.log('showAIButton called at position:', x, y);
  // Pehle se button hai to remove karo
  hideAIButton();
  
  // Naya button banao
  aiButton = document.createElement('div');
  aiButton.id = 'ai-prompt-enhancer-btn';
  aiButton.innerHTML = '🤖 AI';
  
  // Inline styles with !important
  aiButton.style.cssText = `
    position: fixed !important;
    left: ${Math.min(x, window.innerWidth - 100)}px !important;
    top: ${Math.min(y - window.scrollY + 10, window.innerHeight - 50)}px !important;
    z-index: 2147483647 !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
    padding: 10px 16px !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    font-size: 14px !important;
    font-weight: bold !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
    border: 2px solid white !important;
    font-family: Arial, sans-serif !important;
    display: block !important;
    pointer-events: auto !important;
    user-select: none !important;
  `;
  
  console.log('Button styles applied');
  
  aiButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('AI button clicked!');
    
    // Button ko loading state mein daal do
    aiButton.innerHTML = '⏳';
    aiButton.style.pointerEvents = 'none';
    
    processWithAI(selectedText);
  });
  
  document.body.appendChild(aiButton);
  console.log('Button appended to body');
  console.log('Button element:', aiButton);
  console.log('Button position:', aiButton.getBoundingClientRect());
}

function hideAIButton() {
  if (aiButton) {
    aiButton.remove();
    aiButton = null;
  }
}

async function processWithAI(text) {
  console.log('processWithAI called with text:', text);
  hideAIButton();
  
  // Loading spinner show karo
  showLoadingSpinner();
  
  try {
    console.log('Sending message to background script...');
    
    // Background script ko message bhejo
    chrome.runtime.sendMessage({
      action: 'enhancePrompt',
      text: text
    }, function(response) {
      console.log('Response received:', response);
      
      // Loading spinner hide karo
      hideLoadingSpinner();
      
      if (chrome.runtime.lastError) {
        console.error('Chrome runtime error:', chrome.runtime.lastError);
        showNotification('❌ Error: ' + chrome.runtime.lastError.message);
        return;
      }
      
      if (response && response.success) {
        const enhancedPrompt = response.enhancedPrompt;
        console.log('Enhanced prompt received:', enhancedPrompt);
        
        // History mein save karo
        saveToHistory(text, enhancedPrompt);
        
        // Agar input field hai to directly update karo
        if (targetInputElement) {
          console.log('Updating input field...');
          updateInputField(targetInputElement, enhancedPrompt);
          showNotification('✅ Prompt enhanced successfully!');
        } else {
          console.log('Showing modal...');
          // Nahi to modal show karo
          showEnhancedPrompt(text, enhancedPrompt);
        }
      } else {
        console.error('API error:', response);
        showNotification('❌ Error: ' + (response ? response.error : 'Unknown error'));
      }
    });
  } catch (error) {
    console.error('Process error:', error);
    hideLoadingSpinner();
    showNotification('❌ Error: ' + error.message);
  }
}

function updateInputField(element, newText) {
  console.log('Updating input field with enhanced prompt');
  
  try {
    // Check element type
    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
      // Regular input/textarea
      element.value = newText;
      
      // Trigger input event for React/Vue apps
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      
    } else if (element.isContentEditable || element.getAttribute('contenteditable') === 'true') {
      // ContentEditable div (like ChatGPT)
      element.textContent = newText;
      
      // Trigger input event
      element.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    
    // Focus on element
    element.focus();
    
    console.log('Input field updated successfully');
  } catch (error) {
    console.error('Error updating input field:', error);
    // Fallback: show modal
    showEnhancedPrompt(selectedText, newText);
  }
}

function showLoadingSpinner() {
  // Spinner container banao
  const spinner = document.createElement('div');
  spinner.id = 'ai-loading-spinner';
  spinner.innerHTML = `
    <div class="spinner-overlay">
      <div class="spinner-container">
        <div class="spinner-circle"></div>
        <div class="spinner-text">🤖 AI analyzing your prompt...</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(spinner);
}

function hideLoadingSpinner() {
  const spinner = document.getElementById('ai-loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

function showEnhancedPrompt(original, enhanced) {
  // Modal banao
  const modal = document.createElement('div');
  modal.id = 'ai-prompt-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => modal.remove());
  
  // Title
  const title = document.createElement('h2');
  title.textContent = '🤖 AI Enhanced Prompt';
  
  // Original section
  const originalSection = document.createElement('div');
  originalSection.className = 'prompt-section';
  originalSection.innerHTML = '<h3>📝 Original Prompt:</h3>';
  const originalBox = document.createElement('div');
  originalBox.className = 'prompt-box original';
  originalBox.textContent = original;
  originalSection.appendChild(originalBox);
  
  // Enhanced section
  const enhancedSection = document.createElement('div');
  enhancedSection.className = 'prompt-section';
  enhancedSection.innerHTML = '<h3>✨ Enhanced Prompt:</h3>';
  const enhancedBox = document.createElement('div');
  enhancedBox.className = 'prompt-box enhanced';
  enhancedBox.textContent = enhanced;
  enhancedSection.appendChild(enhancedBox);
  
  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = '📋 Copy';
  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(enhanced);
    showNotification('✅ Copied to clipboard!');
  });
  enhancedSection.appendChild(copyBtn);
  
  // Assemble modal
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(title);
  modalContent.appendChild(originalSection);
  modalContent.appendChild(enhancedSection);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
  
  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function showNotification(message) {
  // Pehle se notification hai to remove karo
  const existingNotification = document.querySelector('.ai-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'ai-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
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
