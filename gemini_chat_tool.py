import google.generativeai as genai
import os

# Gemini API configuration
API_KEY = "AIzaSyAI0KROLv0Lqyvj6Wui3hBmuHvXc8TWvOs"
genai.configure(api_key=API_KEY)

def generate_code_from_request(user_request):
    """
    User ki request ko samajh kar code generate karta hai
    """
    try:
        # Gemini model initialize (latest stable model)
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Prompt banao jo AI ko bataye ke kya karna hai
        prompt = f"""
You are a helpful coding assistant. The user has requested: "{user_request}"

Please generate clean, working code based on this request. Include:
1. Complete, runnable code
2. Comments in Hindi/English explaining key parts
3. Any necessary imports
4. Example usage if applicable

Generate the code now:
"""
        
        # AI se response lo
        response = model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    print("=" * 60)
    print("🤖 Gemini AI Code Generator Tool")
    print("=" * 60)
    print("\nAap jo bhi code chahiye, bataiye!")
    print("Example: 'mujhe ek calculator banana hai'")
    print("Type 'exit' to quit\n")
    
    while True:
        user_input = input("👤 Aap: ").strip()
        
        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("\n👋 Dhanyavaad! Goodbye!")
            break
            
        if not user_input:
            print("⚠️ Kuch type karein!\n")
            continue
        
        print("\n🔄 AI se code generate ho raha hai...\n")
        
        # Code generate karo
        generated_code = generate_code_from_request(user_input)
        
        print("🤖 AI Response:")
        print("-" * 60)
        print(generated_code)
        print("-" * 60)
        print()

if __name__ == "__main__":
    main()
