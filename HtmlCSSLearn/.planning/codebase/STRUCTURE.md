# Project Structure

## Directory Layout

```
HtmlCSSLearn/
├── .planning/              # GSD planning directory
│   └── codebase/           # Codebase documentation (this folder)
├── src/                    # Source application code
│   ├── App.vue             # Root component - main navigation portal
│   ├── main.js             # Application entry point
│   ├── main.css            # Global styles (@tailwind directives)
│   ├── assets/             # Static assets
│   │   ├── Font/           # Custom font files (.ttf, .otf)
│   │   ├── image/          # Image files (JPG, PNG, GIF, JPEG)
│   │   ├── Music/          # Audio files (.mp3)
│   │   ├── Vedio/          # Video files (.mp4)
│   │   └── AlipayIcon/     # Icon font files
│   └── components/         # Topic-based Vue components
│       ├── LearnSelector/          # CSS Selectors
│       │   ├── UniversalSelector.vue
│       │   ├── TagSelector.vue
│       │   ├── ClassSelector.vue
│       │   ├── IdSelector.vue
│       │   ├── GroupSonSelector.vue
│       │   ├── PseudoSelector/
│       │   ├── SelectorWeight/
│       │   ├── ChildCombinator.vue
│       │   ├── NestSelector/
│       │   └── zzz_嵌套选择器.md
│       ├── LearnDisplay/           # Flexbox & Grid
│       │   ├── Flex/
│       │   │   ├── FlexDirection.vue
│       │   │   ├── JustifyContent.vue
│       │   │   ├── AlignItems.vue
│       │   │   ├── AlignContent.vue
│       │   │   ├── FlexWrap.vue
│       │   │   ├── FlexNum.vue
│       │   │   ├── AlignSelf.vue
│       │   │   ├── Order.vue
│       │   │   ├── MarginAuto.vue
│       │   │   └── AllInExample.vue
│       │   └── Grid/
│       │       ├── GridTemplate1.vue
│       │       ├── GridTemplate2.vue
│       │       ├── GridTemplate3.vue
│       │       ├── GridTemplate4.vue
│       │       ├── GridTemplate5.vue
│       │       ├── GridTemplate6.vue
│       │       ├── GridTemplate7.vue
│       │       ├── GridTemplateAreas1.vue
│       │       ├── GridTemplateAreas2.vue
│       │       ├── GridTemplateAreas3.vue
│       │       ├── GridTemplateColumnsRows.html
│       │       ├── AutoFillAutoFit.vue
│       │       ├── AutoFillAutoFit.html
│       │       ├── ColumnCount.vue
│       │       ├── GridAutoFlow1.vue
│       │       ├── GridColumnGridRow.html
│       │       ├── JustifyItemsAlignItems.html
│       │       ├── Masonry1.vue
│       │       ├── Masonry2.vue
│       │       ├── Masonry3.vue
│       │       ├── MasonryOther2.vue
│       │       ├── UseStylus.html
│       │       └── images/
│       │           ├── a1.png
│       │           ├── a2.png
│       │           ├── a3.png
│       │           ├── a4.png
│       │           ├── a5.png
│       │           └── a6.png
│       ├── LearnBackground/      # Background Properties
│       │   ├── Background.vue
│       │   ├── BackgroundSize.vue
│       │   ├── ImageRepeatPosition.vue
│       │   ├── BackgroundAttachment1.vue
│       │   ├── BackgroundAttachment2.vue
│       │   ├── BackgroundColor.vue
│       │   └── index.vue
│       ├── LearnFont/            # Typography
│       │   ├── Color.vue
│       │   ├── FontSize.vue
│       │   ├── WeightStyle.vue
│       │   ├── TextAlign.vue
│       │   └── index.vue
│       ├── LearnScrollbar/       # Scrollbar Styling
│       │   ├── index.vue
│       │   ├── Example1.vue
│       │   ├── Example2.vue
│       │   ├── a.html
│       │   ├── b.html
│       │   ├── 1-webkit-scrollbar/
│       │   ├── 2-webkit-scrollbar-button/
│       │   ├── 3-webkit-scrollbar-track/
│       │   ├── 4-webkit-scrollbar-track-piece/
│       │   ├── 5-webkit-scrollbar-thumb/
│       │   ├── 6-webkit-scrollbar-corner/
│       │   └── 7-webkit-resizer/
│       ├── LearnSelector/        # (Already documented above)
│       ├── LearnSpacing/         # Spacing
│       │   ├── letter-spacing.vue
│       │   ├── word-spacing.vue
│       │   ├── font-kerning.html
│       │   ├── text-transform.html
│       │   ├── text-rendering.html
│       │   └── index.vue
│       ├── LearnTable/           # HTML Tables
│       │   ├── index.vue
│       │   ├── Use1.vue
│       │   ├── Use2.vue
│       │   └── Example1.vue
│       ├── LearnTagA/            # Anchor Tags
│       │   ├── index.vue
│       │   ├── BasicUsage.vue
│       │   ├── TestLiveServer/
│       │   │   ├── index.html
│       │   │   └── test.html
│       │   └── happy.jpg
│       ├── LearnTagForm/         # Form Tags
│       │   ├── index.vue
│       │   └── Example1.vue
│       ├── LearnTagImg/          # Image Tags
│       │   ├── index.vue
│       │   ├── ImgParam.vue
│       │   ├── ObjectFit.vue
│       │   ├── PicturePath.vue
│       │   ├── testImgPath.html
│       │   ├── 1.jpg
│       │   ├── img/
│       │   │   └── 1.jpg
│       │   └── cute chutian.JPEG
│       ├── LearnTagInput/        # Input Tags
│       │   ├── a.html
│       │   ├── b.html
│       │   ├── compare.html
│       │   └── index.vue
│       ├── LearnTagTextarea/     # Textarea Tags
│       │   ├── a.html
│       │   ├── b.html
│       │   ├── compare.html
│       │   ├── example1.html
│       │   ├── example2.html
│       │   ├── example3.html
│       │   ├── example4.html
│       │   ├── example5.html
│       │   └── example6.html
│       ├── LearnText-XXX/        # Text Properties
│       │   ├── text-decoration.html
│       │   ├── text-indent.html
│       │   ├── text-rendering.html
│       │   ├── text-transform.html
│       │   └── index.vue
│       ├── LearnvWebkit/         # Webkit Properties
│       │   ├── index.vue
│       │   ├── a.html
│       │   └── b.html
│       ├── LearnBoxSizing/       # Box Sizing
│       │   ├── a.html
│       │   ├── b.html
│       │   ├── c.html
│       │   ├── d.html
│       │   ├── e.html
│       │   └── inherit.html
│       ├── LearnEIFPicture/      # Sprites/Icons
│       │   ├── index.vue
│       │   ├── EIFPic.png
│       │   └── Example1.vue
│       ├── LearnCenter/          # Centering
│       │   └── index.vue
│       ├── LearnHr/              # Horizontal Rule
│       │   └── index.vue
│       ├── CommonTags/           # Common HTML Tags
│       │   └── index.vue
│       ├── ASimpleWrite/         # Simple Write Example
│       │   └── index.vue
│       ├── SpecificSymbol/       # Special Symbols
│       │   └── index.vue
│       ├── CustomList/           # Custom Lists
│       │   └── index.vue
│       └── LearnCenter/          # (Duplicate entry, reuses folder)
├── styleSheet/           # Standalone CSS examples
│   ├── CSS-内联样式/
│   ├── CSS-外部样式/
│   ├── CSS-样式继承优先级/
│   └── CSS-优先级/
├── public/               # Public static assets
│   ├── vite.svg
│   └── test.html
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Node dependencies lock file
└── README.md             # Project documentation
```

## Key Directories

### `src/components/` - Component Organization
- **Learning Topics:** Each major CSS/HTML concept has its own directory
- **Sub-components:** Topic-specific examples organized as separate files
- **Examples:** `.html` files for before/after comparisons or alternative implementations
- **Consistent Pattern:** Topic directories start with "Learn" prefix

### `src/assets/` - Asset Organization
- **Fonts:** Custom font files in `Font/`
- **Images:** Visual assets in `image/`
- **Media:** Audio (`Music/`) and video (`Vedio/`)
- **Icons:** Icon font files in `AlipayIcon/`

### `styleSheet/` - Standalone CSS Examples
- Organized by CSS concept
- Contains HTML files demonstrating CSS techniques
- Examples for: inline styles, external styles, inheritance, priority

### `public/` - Static Assets
- Files served as-is without processing
- Favicon and test files

## Naming Conventions

### Component Files
- **Topic Components:** `Learn[Concept]/index.vue`
- **Sub-components:** `[ConceptName].vue` or `SubComponent.vue`
- **Example Files:** `.html` for standalone examples

### Directories
- **Topics:** `Learn[Concept]` - Clear indicator of learning content
- **Sub-directories:** Descriptive names for grouping related examples

### Variable Names (in Vue components)
- `componentsArray` - Array of component objects
- `componentId` or `componentValue` - Currently selected component
- `component` - Component reference object
