// Simple & Reliable Version - Context Menu + Keyboard
console.log('🤖 AI Prompt Enhancer loaded! Right-click selected text or press Ctrl+Shift+E');

// Listen for messages from background script (context menu)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enhance') {
    enhanceText(request.text);
  }
});

// Keyboard shortcut
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
    e.preventDefault();
    console.log('Keyboard shortcut triggered');
    enhanceSelectedText();
  }
});

async function enhanceSelectedText() {
  let text = '';
  const activeElement = document.activeElement;
  
  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    text = start !== end ? activeElement.value.substring(start, end) : activeElement.value;
  } else {
    text = window.getSelection().toString();
  }
  
  text = text.trim();
  
  if (!text) {
    showNotification('⚠️ Please select some text!');
    return;
  }
  
  await enhanceText(text);
}

async function enhanceText(text) {
  console.log('Enhancing:', text);
  showNotification('⏳ Enhancing prompt...');
  
  try {
    // Call API via background script
    chrome.runtime.sendMessage(
      { action: 'callAPI', text: text },
      (response) => {
        if (response.success) {
          const enhanced = response.enhanced;
          console.log('Enhanced:', enhanced);
          updateOrCopy(enhanced);
        } else {
          showNotification('❌ Error: ' + response.error);
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    showNotification('❌ Error: ' + error.message);
  }
}

function updateOrCopy(enhanced) {
  const activeElement = document.activeElement;
  
  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
    activeElement.value = enhanced;
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.focus();
    showNotification('✅ Prompt enhanced!');
  } else if (activeElement && activeElement.isContentEditable) {
    activeElement.textContent = enhanced;
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.focus();
    showNotification('✅ Prompt enhanced!');
  } else {
    navigator.clipboard.writeText(enhanced);
    showNotification('✅ Enhanced prompt copied to clipboard!');
  }
}

function showNotification(message) {
  const existing = document.getElementById('ai-enhancer-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.id = 'ai-enhancer-notification';
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '15px 25px',
    borderRadius: '8px',
    zIndex: '999999999',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  });
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

console.log('✅ Ready! Right-click text or press Ctrl+Shift+E');

