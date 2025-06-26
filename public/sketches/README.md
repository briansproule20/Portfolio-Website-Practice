# Sketches Folder

This folder contains all the sketch images displayed in the Sketchbook Drawer.

## How to Add New Sketches

1. **Add your image files** to this `/public/sketches/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Recommended naming: Use descriptive kebab-case names (e.g., `ui-wireframe-concept.jpg`)

2. **Update the sketch data** in `/data/sketches.ts`:
   ```typescript
   {
     id: 9, // Next available ID
     title: "Your Sketch Title",
     description: "Description of what this sketch shows or explores.",
     image: "your-image-filename.jpg", // Just the filename, not the full path
     tags: ["Tag1", "Tag2", "Tag3"],
     date: "2024-01-20", // YYYY-MM-DD format
     aspectRatio: "landscape", // square | portrait | landscape | wide
     size: "medium" // small | medium | large
   }
   ```

3. **Aspect Ratios Guide**:
   - `square`: 1:1 ratio (perfect squares)
   - `portrait`: 3:4 ratio (taller than wide)
   - `landscape`: 4:3 ratio (wider than tall)
   - `wide`: 16:9 ratio (very wide, panoramic)

4. **Size Guide**:
   - `small`: 96px height
   - `medium`: 128px height  
   - `large`: 160px height

## Current Files Expected

Based on the current data structure, these files should be added:

- `terminal-concept.jpg`
- `logo-iterations.jpg`
- `navigation-flow.jpg`
- `color-palette.jpg`
- `component-library.jpg`
- `mobile-sketches.jpg`
- `typography-experiments.jpg`
- `icon-set.jpg`

## Tips

- **File Optimization**: Compress images for web to keep load times fast
- **Consistent Naming**: Use descriptive, lowercase, hyphenated names
- **Backup**: Keep originals elsewhere; this folder is for web-optimized versions
- **Aspect Ratios**: The drawer will automatically handle different image dimensions beautifully! 