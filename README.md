# Wedding Website

A beautiful, elegant wedding website with modern animations, interactive features, and a sophisticated beige/green/white color scheme.

## ✨ Features

### Core Sections
- 🎭 **Hero Section** - Eye-catching landing with couple names and optional background image
- ⏰ **Countdown Timer** - Live countdown to the wedding day
- 👰🤵 **Couple Profiles** - Dedicated sections for bride and groom with photo placeholders
- 🖼️ **Gallery** - Photo grid with 3D hover effects and animations
- 📍 **Venue** - Interactive Google Maps with venue details and directions
- 📝 **RSVP Form** - Complete form with validation and success confirmation

### Interactive Features
- 🎵 **Background Music Player** - Floating music control with play/pause toggle
- ✨ **Advanced Animations** - Parallax effects, fade-ins, and smooth transitions
- 📱 **Fully Responsive** - Optimized for all devices
- 🎨 **Ripple Effects** - Interactive button animations
- 🔄 **Scroll Animations** - Elements animate as you scroll

## 🚀 Quick Start

1. Open [`index.html`](index.html) in any modern web browser
2. Customize the content following the guide below
3. Add your photos and details
4. Deploy to your hosting service

## 📝 Customization Guide

### 1. Update Wedding Details

Replace placeholders in [`index.html`](index.html):

- `[Bride]` and `[Groom]` - Short names (e.g., "Sarah" & "John")
- `[Bride Name]` and `[Groom Name]` - Full names for hero section
- `[Bride Full Name]` and `[Groom Full Name]` - Complete names
- `[Date]` - Wedding date (e.g., "June 15, 2026")
- `[Month Day, Year]` - Full date format
- `[Time]` - Wedding time (e.g., "3:00 PM")
- `[Venue Name]` - Location name

### 2. Add Background Image to Hero Section

To add a background image behind the bride and groom names:

1. Place your image in the project folder
2. Open [`styles.css`](styles.css:130)
3. Uncomment lines 130-141 and update the image path:

```css
.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('your-image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.3;  /* Adjust for visibility */
    z-index: 0;
}
```

4. Optionally adjust the overlay opacity at line 148 for better image visibility (increase to 0.5-0.7)

### 3. Add Photos

**Bride and Groom Photos:**
```html
<!-- Replace placeholder divs in index.html -->
<div class="person-image bride-image">
    <img src="path/to/bride-photo.jpg" alt="Bride Name" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

**Gallery Photos:**
Replace the 6 gallery placeholder divs with your images:
```html
<div class="gallery-image">
    <img src="path/to/photo.jpg" alt="Description" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### 4. Update Countdown Timer

Change the wedding date in [`script.js`](script.js:4) (line 4):

```javascript
const weddingDate = new Date(2026, 5, 15, 15, 0, 0).getTime();
// Format: (Year, Month-1, Day, Hour, Minute, Second)
// Note: Month is 0-indexed (0 = January, 5 = June)
```

### 5. Configure Venue & Google Maps

1. Update venue details in [`index.html`](index.html:267) (around line 267)
2. Get your Google Maps embed code:
   - Go to [Google Maps](https://www.google.com/maps)
   - Search for your venue
   - Click "Share" → "Embed a map"
   - Copy the iframe src URL
   - Replace the URL in [`index.html`](index.html:289) (around line 289)

### 6. Customize Background Music

The music player uses a royalty-free track by default. To change:

1. Find or purchase royalty-free music
2. Update the audio source in [`index.html`](index.html:28) (line 28):
```html
<source src="your-music-file.mp3" type="audio/mpeg">
```

**Note:** Music is muted by default and requires user interaction to play.

### 7. Connect RSVP Form

The form currently logs data to the console. To collect responses:

**Option A - Email Service (Easiest):**
- Use [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/)
- Follow their setup instructions
- Update form action or JavaScript in [`script.js`](script.js:145)

**Option B - Google Sheets:**
- Create a Google Apps Script web app
- Update the form submission handler in [`script.js`](script.js:145)

**Option C - Custom Backend:**
- Set up your own server (Node.js, Python, etc.)
- Create an API endpoint
- Update form submission code

### 8. Adjust Colors (Optional)

Modify CSS variables in [`styles.css`](styles.css:2) (lines 2-14):

```css
:root {
    --primary-beige: #F5F1E8;
    --secondary-beige: #E8DCC4;
    --sage-green: #8B9D83;
    --dark-green: #5F7161;
    --forest-green: #3D5A4C;
    /* ... etc */
}
```

## 🎨 Color Palette

- **Primary Beige**: #F5F1E8 - Main background
- **Secondary Beige**: #E8DCC4 - Accent backgrounds
- **Sage Green**: #8B9D83 - Primary accent
- **Dark Green**: #5F7161 - Secondary accent
- **Forest Green**: #3D5A4C - Text and dark elements
- **White**: #FFFFFF - Clean highlights

## 📁 File Structure

```
wedding-website/
├── index.html          # Main HTML structure with all sections
├── styles.css          # Complete styling and animations
├── script.js           # Interactive functionality
└── README.md           # This documentation
```

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- Intersection Observer API for efficient scroll animations
- CSS transforms for smooth animations
- Optimized for Core Web Vitals
- Lazy loading ready
- No external dependencies (except Google Fonts)

## 💡 Tips

- Use high-quality photos (at least 1200x800px) for best results
- Test on multiple devices to ensure responsive design works well
- Keep bios concise and heartfelt (2-3 sentences)
- Consider adding more sections based on your needs
- Optimize images before uploading (use tools like TinyPNG)
- Test the music player on different browsers

## 🚀 Deployment

Deploy to any static hosting service:

- **GitHub Pages**: Free, easy setup
- **Netlify**: Drag and drop deployment
- **Vercel**: Fast and free
- **Firebase Hosting**: Google's hosting solution

## 📋 Checklist

Before going live:

- [ ] Replace all placeholder text with actual information
- [ ] Add all photos (couple, gallery)
- [ ] Update countdown timer date
- [ ] Configure Google Maps with correct venue
- [ ] Test RSVP form submission
- [ ] Test background music on different browsers
- [ ] Check responsive design on mobile devices
- [ ] Verify all links work correctly
- [ ] Test on multiple browsers
- [ ] Optimize images for web

## 🎵 Music Credits

Default music: "Romantic" by Bensound (royalty-free)
- Website: [Bensound.com](https://www.bensound.com)
- License: Creative Commons

**Important:** If using different music, ensure you have proper licenses or use royalty-free tracks.

## 📄 License

Free to use and customize for your personal wedding website. Attribution appreciated but not required.

## 🙏 Credits

- **Design & Development**: Made with Bob
- **Fonts**: Google Fonts (Cormorant Garamond, Montserrat)
- **Icons**: SVG inline icons
- **Music**: Bensound (royalty-free)

---

**Made with 💚 for your special day**

For questions or customization help, refer to the inline comments in the code files.