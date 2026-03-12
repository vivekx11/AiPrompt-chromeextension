"""
Simple icon generator for Chrome extension.
Agar PIL/Pillow installed nahi hai to: pip install pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    
    def create_icon(size, filename):
        # Create image with gradient-like color
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Draw a simple AI robot icon
        # Background circle
        center = size // 2
        radius = size // 3
        draw.ellipse([center - radius, center - radius, 
                     center + radius, center + radius], 
                     fill='white')
        
        # Eyes
        eye_size = size // 10
        eye_y = center - size // 8
        draw.ellipse([center - size//6 - eye_size, eye_y - eye_size,
                     center - size//6 + eye_size, eye_y + eye_size],
                     fill='#667eea')
        draw.ellipse([center + size//6 - eye_size, eye_y - eye_size,
                     center + size//6 + eye_size, eye_y + eye_size],
                     fill='#667eea')
        
        # Smile
        draw.arc([center - radius//2, center - radius//2,
                 center + radius//2, center + radius//2],
                 0, 180, fill='#667eea', width=size//20)
        
        img.save(filename)
        print(f"✓ Created {filename}")
    
    # Generate all three sizes
    create_icon(128, 'icon128.png')
    create_icon(48, 'icon48.png')
    create_icon(16, 'icon16.png')
    
    print("\n✅ All icons created successfully!")
    print("Ab Chrome mein extension load kar sakte hain.")
    
except ImportError:
    print("❌ Pillow library nahi mili!")
    print("\nInstall karein:")
    print("  pip install pillow")
    print("\nYa phir create_icons.html file browser mein khol kar manually download karein.")
