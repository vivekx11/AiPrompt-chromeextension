// Load saved API key
chrome.storage.local.get(['geminiApiKey'], function(result) {
  if (result.geminiApiKey) {
    document.getElementById('apiKey').value = result.geminiApiKey;
  }
});

// Save API key
document.getElementById('saveKey').addEventListener('click', function() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const statusDiv = document.getElementById('status');
  
  if (!apiKey) {
    statusDiv.className = 'status error';
    statusDiv.textContent = '❌ Please enter an API key';
    return;
  }
  
  chrome.storage.local.set({ geminiApiKey: apiKey }, function() {
    statusDiv.className = 'status success';
    statusDiv.textContent = '✅ API key saved successfully!';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  });
});

// History load karo
function loadHistory() {
  chrome.storage.local.get(['promptHistory'], function(result) {
    const history = result.promptHistory || [];
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
      historyList.innerHTML = '<div class="no-history">Abhi tak koi history nahi hai</div>';
      return;
    }
    
    historyList.innerHTML = '';
    
    // Latest 10 entries dikhao
    history.slice(0, 10).forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      
      const date = new Date(item.timestamp);
      const timeStr = date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      div.innerHTML = `
        <div class="timestamp">${timeStr}</div>
        <div class="text"><strong>Original:</strong> ${escapeHtml(item.original.substring(0, 50))}...</div>
        <div class="text"><strong>Enhanced:</strong> ${escapeHtml(item.enhanced.substring(0, 50))}...</div>
      `;
      
      historyList.appendChild(div);
    });
  });
}

// Clear history
document.getElementById('clear-history').addEventListener('click', function() {
  if (confirm('History clear karna chahte hain?')) {
    chrome.storage.local.set({ promptHistory: [] }, function() {
      loadHistory();
    });
  }
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Page load par history load karo
loadHistory();
