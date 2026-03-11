# 🔧 Troubleshooting Guide

## Button Nahi Dikh Raha? Ye Steps Follow Karo:

### Step 1: Extension Check Karo
1. Chrome mein jao: `chrome://extensions/`
2. "AI Prompt Enhancer" extension dikha?
3. Toggle switch ON hai?
4. Errors dikha rahe hain? (red text)

### Step 2: Extension Reload Karo
1. `chrome://extensions/` par jao
2. Extension ke neeche "Reload" button (🔄) par click karo
3. Page refresh karo jahan test kar rahe ho

### Step 3: Console Check Karo
1. F12 press karo (Developer Tools)
2. "Console" tab par jao
3. Kya ye messages dikhe?
   - ✅ "🤖 AI Prompt Enhancer loaded!"
   - ✅ "Mouse up event detected"
   - ✅ "Selected text: ..."
   - ✅ "Button created"

### Step 4: Test Page Use Karo
1. `test_page.html` file ko browser mein kholo
2. Text select karo
3. Console logs dekho

### Common Issues:

#### Issue 1: Extension Load Nahi Hua
**Solution:**
- Extension folder sahi select kiya?
- Manifest.json file hai folder mein?
- Icons (icon16.png, etc.) present hain?

#### Issue 2: Console Mein Errors
**Possible Errors:**
```
Refused to load the script...
```
**Solution:** Extension reload karo

```
Cannot read property...
```
**Solution:** Page refresh karo

#### Issue 3: Button Bana Par Dikha Nahi
**Solution:**
- Inspect element karo (Right click > Inspect)
- Elements tab mein search karo: `ai-prompt-enhancer-btn`
- Agar mila to CSS issue hai
- Z-index check karo

#### Issue 4: ChatGPT Par Specifically Nahi Chal Raha
**Reason:** ChatGPT ki apni shadow DOM ho sakti hai

**Solution:** Content script mein shadow DOM support add karo

### Quick Fix Commands:

```bash
# Extension folder mein jao
cd path/to/extension

# Files check karo
ls -la

# Zaruri files:
# - manifest.json
# - content.js
# - content.css
# - background.js
# - popup.html
# - popup.js
# - icon16.png
# - icon48.png
# - icon128.png
```

### Still Not Working?

1. Browser restart karo
2. Extension uninstall karke phir se install karo
3. Different website par test karo (test_page.html)
4. Console screenshot share karo

### Test Checklist:

- [ ] Extension installed hai
- [ ] Extension enabled hai
- [ ] Icons present hain
- [ ] Page refresh kiya
- [ ] Console mein "loaded" message dikha
- [ ] Text select kiya properly
- [ ] Console mein "Selected text" dikha
- [ ] F12 > Elements mein button element search kiya

### Alternative Testing:

Agar ChatGPT par nahi chal raha, pehle simple sites par test karo:
- Google.com
- Wikipedia.org
- test_page.html (local file)

Agar in par chal gaya to ChatGPT specific issue hai.
