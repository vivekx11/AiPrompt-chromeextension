# 🚀 Installation Guide - AI Prompt Enhancer

## Step-by-Step Installation

### 1️⃣ Files Check Karo

Extension folder mein ye files honi chahiye:
- ✅ manifest.json
- ✅ content.js
- ✅ content.css
- ✅ background.js
- ✅ popup.html
- ✅ popup.js
- ✅ icon16.png
- ✅ icon48.png
- ✅ icon128.png

### 2️⃣ Chrome Extension Install Karo

1. **Chrome Browser kholo**

2. **Extensions page par jao:**
   - Address bar mein type karo: `chrome://extensions/`
   - Ya Menu > More Tools > Extensions

3. **Developer Mode ON karo:**
   - Top-right corner mein toggle switch dikha?
   - Use ON karo

4. **Extension Load karo:**
   - "Load unpacked" button par click karo
   - Apna extension folder select karo
   - "Select Folder" par click karo

5. **Verify karo:**
   - Extension list mein "AI Prompt Enhancer" dikha?
   - Toggle switch ON hai?
   - Koi error (red text) nahi hai?

### 3️⃣ Test Karo

**Option A: Test Page Use Karo**
1. `test_page.html` file ko browser mein kholo
2. Textarea mein text select karo
3. 🤖 button dikhna chahiye
4. F12 press karke Console check karo

**Option B: Real AI Site Par Test Karo**
1. ChatGPT (chat.openai.com) par jao
2. Input box mein kuch type karo: "mujhe calculator banana hai"
3. Text ko select karo (mouse se drag)
4. 🤖 AI button dikhega
5. Click karo → Enhanced prompt milega!

### 4️⃣ Console Check Karo (Debugging)

F12 press karo aur Console mein ye messages dekhne chahiye:

```
✅ 🤖 AI Prompt Enhancer loaded!
✅ Mouse up event detected
✅ Selected text: [your text]
✅ Button created, appending to body
✅ Button appended, should be visible now
```

Agar ye messages dikhe to extension sahi se kaam kar raha hai!

## Common Issues & Solutions

### ❌ Extension Load Nahi Ho Raha

**Problem:** "Load unpacked" par click karne ke baad error
**Solution:**
- Check karo `manifest.json` file present hai
- Check karo sab icons (icon16.png, etc.) present hain
- Folder path sahi select kiya?

### ❌ Button Nahi Dikh Raha

**Problem:** Text select karne par button nahi dikha
**Solution:**
1. Extension enabled hai? (chrome://extensions/)
2. Page refresh karo (Ctrl+R)
3. Extension reload karo (🔄 button)
4. Console mein errors check karo (F12)

### ❌ API Error Aa Raha Hai

**Problem:** "API Error: 400" ya "API key not valid"
**Solution:**
- `background.js` file kholo
- Line 2 par API key check karo
- Valid API key hai? (Google AI Studio se generate karo)

### ❌ History Nahi Dikh Rahi

**Problem:** Extension icon par click karne par history empty hai
**Solution:**
- Pehle kuch prompts enhance karo
- Storage permissions check karo
- Extension reload karo

## Features Test Karo

### ✅ Basic Selection
- Kisi bhi text ko select karo
- Button dikha? ✓

### ✅ Input Box Selection
- Textarea/input mein text type karo
- Select karo
- Button dikha? ✓

### ✅ AI Enhancement
- Button par click karo
- Loading notification dikha? ✓
- Modal open hua? ✓
- Enhanced prompt dikha? ✓

### ✅ Copy Feature
- Modal mein "Copy" button par click karo
- "Copied to clipboard" notification dikha? ✓
- Paste karke check karo (Ctrl+V)

### ✅ History
- Extension icon par click karo
- Popup open hua? ✓
- Recent prompts dikhe? ✓
- "Clear History" button kaam kar raha? ✓

## Uninstall Karna Hai?

1. `chrome://extensions/` par jao
2. "AI Prompt Enhancer" dhundo
3. "Remove" button par click karo
4. Confirm karo

## Update Karna Hai?

1. Extension folder mein files update karo
2. `chrome://extensions/` par jao
3. Extension ke neeche 🔄 "Reload" button par click karo
4. Done!

## Support

Agar koi problem ho to:
1. Console errors screenshot lo (F12)
2. Extension version check karo
3. Browser restart karo
4. Extension reinstall karo

---

**Happy Prompting! 🤖✨**
