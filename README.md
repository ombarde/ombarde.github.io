# Om Barde Portfolio

A story-driven, system-inspired portfolio website showcasing AI systems engineering expertise.

## Features

- **Boot Sequence**: Animated startup sequence with typing effect
- **Identity Section**: System profile card with interactive language toggles
- **Core Powers**: Interactive module diagram showcasing skills as AI modules
- **Journey Timeline**: Training epochs with scroll progress indicator
- **Projects**: System cards showing deployed AI solutions
- **Certifications**: NVIDIA and other certifications as verified badges
- **Experience**: Production logs style experience section
- **Philosophy**: Minimal, human-centered section
- **Contact**: Terminal-style connection interface

## Easter Eggs

- **Konami Code**: Enter the Konami code (↑↑↓↓←→←→BA) to activate debug mode
- **NVIDIA Logo**: Click the NVIDIA logo in the navbar for a GPU spike animation

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- CSS3 (custom styling with NVIDIA green theme)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── BootSequence.jsx      # Landing page boot sequence
│   ├── Identity.jsx           # System profile section
│   ├── CorePowers.jsx         # Skills as AI modules
│   ├── Journey.jsx            # Timeline/epochs section
│   ├── Projects.jsx           # Project cards
│   ├── Certifications.jsx     # Certification badges
│   ├── Experience.jsx         # Production logs
│   ├── Philosophy.jsx         # Philosophy section
│   ├── Contact.jsx            # Contact terminal
│   └── Navbar.jsx             # Navigation bar
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## Customization

All content is sourced from `profile.txt`. To update:
- Personal information: Edit component files directly
- Styling: Modify CSS files in each component directory
- Colors: Update CSS variables in `src/index.css`

## License

Personal portfolio project.
