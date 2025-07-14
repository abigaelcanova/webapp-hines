# Images Directory Structure

This directory contains all static images used in the Alexandria web app prototype.

## Directory Organization

### `/buildings/`
- Building photos and exterior shots
- Individual building images for the dropdown
- Building hero banners
- **Usage**: Building cards, hero backgrounds, dropdown avatars

### `/logos/`
- Company logos and branding assets
- Alexandria logo variations
- Partner or client logos
- **Usage**: Headers, footers, branding elements

### `/heroes/`
- Large hero/banner images
- Background images for main sections
- Landing page visuals
- **Usage**: Hero cards, section backgrounds

### `/avatars/`
- User profile pictures
- Team member photos
- Default avatar images
- **Usage**: User profiles, team sections, testimonials

### `/icons/`
- UI icons and graphics
- Custom illustration assets
- Navigation icons
- **Usage**: Buttons, navigation, UI elements

## How to Use Images

1. **Add your images** to the appropriate subdirectory
2. **Reference them** in your components using the path from `/public/`:
   ```jsx
   // Example: Image in public/images/buildings/demo-building.jpg
   <img src="/images/buildings/demo-building.jpg" alt="Demo Building" />
   ```

## Naming Convention

- Use kebab-case for filenames: `are-demo-building.jpg`
- Include descriptive names: `hero-background-main.jpg`
- Use consistent formats: `.jpg` for photos, `.png` for logos/icons, `.svg` for vectors

## Recommended Image Sizes

- **Buildings**: 1200x800px (3:2 ratio) for cards, 1920x1080px for heroes
- **Logos**: Various sizes, maintain aspect ratio
- **Heroes**: 1920x1080px or larger for full-width banners
- **Avatars**: 200x200px or 400x400px (square)
- **Icons**: 64x64px, 128x128px, or SVG for scalability 