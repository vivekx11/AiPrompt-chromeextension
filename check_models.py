import google.generativeai as genai

API_KEY = "AIzaSyAI0KROLv0Lqyvj6Wui3hBmuHvXc8TWvOs"
genai.configure(api_key=API_KEY)

print("Available Gemini Models:")
print("=" * 60)

try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"✓ {model.name}")
            print(f"  Display Name: {model.display_name}")
            print(f"  Description: {model.description}")
            print()
except Exception as e:
    print(f"Error: {e}")
