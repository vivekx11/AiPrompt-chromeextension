# AI Prompt Enhancer - Chrome Extension.

Kisi bhi website par text select karo aur AI se better prompt banao!

## Features ✨

- 📝 Text select karne par AI button dikhta hai
- 🤖 Gemini AI se prompt enhance hota hai
- 💾 History automatically save hoti hai
- 📋 One-click copy enhanced prompt
- 🎨 Beautiful UI with animations

## Installation 🚀

### Step 1: Icons Banao
1. `create_icons.html` file ko browser mein kholo
2. Teen icons download karo (icon16.png, icon48.png, icon128.png)
3. Downloaded icons ko extension folder mein rakho

### Step 2: Chrome mein Load Karo
1. Chrome kholo
2. Address bar mein type karo: `chrome://extensions/`
3. Top-right corner mein "Developer mode" ON karo
4. "Load unpacked" button par click karo
5. Is folder ko select karo

### Step 3: API Key Update (Optional)
Agar apna API key use karna hai:
1. `background.js` file kholo
2. Line 2 par `API_KEY` update karo

## Kaise Use Karein 📖

1. Kisi bhi website par jao (ChatGPT, Claude, Gemini, etc.)
2. Koi bhi text select karo
3. 🤖 AI button dikhega - us par click karo
4. Enhanced prompt milega with original comparison
5. Copy button se clipboard mein copy karo

## Example 🎯

**Original Prompt:**
```
mujhe ek calculator banana hai
```

**Enhanced Prompt:**
```
Create a fully functional calculator application with the following features:
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Clear and user-friendly interface
- Error handling for invalid inputs
- Responsive design that works on all devices
- Clean, well-commented code
- Modern styling with CSS
```

## Files Structure 📁

```
├── manifest.json       # Extension configuration
├── content.js          # Text selection aur UI logic
├── content.css         # Styling
├── background.js       # Gemini API integration
├── popup.html          # Extension popup UI
├── popup.js            # History management
├── icon16.png          # Small icon
├── icon48.png          # Medium icon
└── icon128.png         # Large icon
```

## Troubleshooting 🔧

### API Error
- Check karo API key valid hai
- Internet connection check karo
- API quota check karo (free tier: 60 requests/minute)

### Button Nahi Dikh Raha
- Text properly select karo
- Page refresh karo
- Extension enabled hai check karo

### History Nahi Dikh Rahi
- Extension icon par click karo
- Storage permissions check karo

## Privacy 🔒

- Sab kuch local storage mein save hota hai
- Sirf selected text API ko bhejta hai
- Koi data third-party ko nahi jata

## Support 💬

Koi problem ho to:
1. Console errors check karo (F12)
2. Extension reload karo
3. Browser restart karo

## Updates 🔄

Future features:
- Multiple AI models support
- Custom prompt templates
- Export history
- Dark mode
- Keyboard shortcuts

---

Made with ❤️ for better AI prompts!
