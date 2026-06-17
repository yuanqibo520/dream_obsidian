---
name: Vibrant Pulse
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#464554'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006c4b'
  on-secondary: '#ffffff'
  secondary-container: '#64f9bc'
  on-secondary-container: '#00714e'
  tertiary: '#765700'
  on-tertiary: '#ffffff'
  tertiary-container: '#956e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
---

## Brand & Style

The design system is crafted for a dynamic university student community, prioritizing energy, clarity, and social connectivity. It adopts a **Modern Macaroon** aesthetic—a fusion of clean minimalism with a playful, high-energy color palette. The UI evokes a sense of optimism and accessibility, making digital spaces feel like welcoming campus hubs.

Visual characteristics include:
- **Lively Modernism:** High-saturation accents set against a stark, cool-toned background.
- **Selective Glassmorphism:** Used strategically to create depth and hierarchy without overwhelming the user.
- **Friendly Professionalism:** Balancing "fun" elements (macaroon colors) with "functional" foundations (robust typography and generous whitespace).

## Colors

The palette is anchored by **Lavender Purple (#6366F1)** as the primary driver for action and identity, symbolizing creativity and tech-savviness. **Mint Green (#34D399)** serves as the secondary color, used for success states and growth-oriented features.

**Macaroon Accents:**
- **Pale Goose Yellow (#FBBF24):** Used for warnings, highlighting, and community badges.
- **Light Coral Pink (#FB7185):** Reserved for expressive elements like likes, hearts, or urgent notifications.

**Surface & Text:**
- The background is a crisp **Extremely Light Cool White (#F8F9FF)**, providing a high-contrast stage for the macaroon tones.
- Text utilizes **Deep Gray (#1F2937)** to ensure AA/AAA accessibility while remaining softer than pure black.

## Typography

This design system uses a dual-font strategy. **Geist** provides a technical, precise edge for headings and labels, reflecting the modern, tech-forward nature of students. **Inter** handles all body copy, ensuring maximum readability during long browsing sessions in community forums.

- Use **Negative Letter Spacing** on large headlines to create a punchy, editorial feel.
- **Weight Contrast:** Bold headings (700/800) paired with Regular body text (400) creates a clear visual hierarchy.
- **Labels:** Always use Geist for functional UI elements like tags, buttons, and navigation items.

## Layout & Spacing

The layout follows a **8px soft-grid system** to maintain mathematical harmony.

- **Mobile:** 4-column fluid grid with 20px side margins and 16px gutters.
- **Desktop:** 12-column fixed grid (max-width 1280px) with 40px margins.
- **Container Strategy:** Use generous padding (lg/xl) within cards and sections to emphasize the "clean/minimal" brand pillars. 
- **Vertical Rhythm:** Use the `base` unit (4px) as the multiplier for all component-internal spacing (e.g., icon-to-text spacing).

## Elevation & Depth

Depth is conveyed through a mix of **Selective Glassmorphism** and soft, tinted shadows.

- **Glass Surfaces:** Used for navigation bars, modals, and floating action buttons. Spec: `rgba(255, 255, 255, 0.7)` background, `12px` backdrop-blur, and a `1px` solid border in `rgba(255, 255, 255, 0.4)`.
- **Shadows:** Avoid pure black shadows. Use "Ambient Tints"—shadows colored with a 10% saturation of the primary color (#6366F1).
- **Z-Index Layers:**
  - Layer 0: Background (#F8F9FF)
  - Layer 1: Content Cards (Solid White, Low Shadow)
  - Layer 2: Glass Overlays (Nav/Floating elements)
  - Layer 3: Modals and Popovers

## Shapes

The design system utilizes a consistent **12px (0.75rem)** radius for standard components (Cards, Inputs, Buttons) to evoke a friendly, approachable feel.

- **Standard Radius:** 12px.
- **Large Components (Modals/Hero Sections):** 24px (1.5rem).
- **Full Rounded:** Used for chips, tags, and search bars to emphasize the "Macaroon" pill-shape aesthetic.
- **Interactive States:** On active/focus, borders should thicken slightly rather than changing shape.

## Components

### Buttons
- **Primary:** Lavender (#6366F1) background, white text. 12px roundedness.
- **Secondary:** Mint Green (#34D399) or ghost styles with thin borders.
- **Interaction:** Subtle 2px lift (shadow increase) on hover.

### Cards
- White background or Glassmorphism for overlays.
- 12px padding as standard; 24px for feature cards.
- Always include a 1px subtle border (#E5E7EB) to define edges against the light background.

### Input Fields
- Background: #FFFFFF.
- Border: 1px solid #D1D5DB; turns Primary Purple (#6366F1) with a 3px soft glow on focus.
- 12px roundedness.

### Chips & Tags
- Full-pill roundedness.
- Pastel backgrounds (macaroon colors at 15% opacity) with high-contrast text of the same hue.

### Lists
- Separated by clean whitespace or very thin dividers (#F3F4F6).
- Use Mint Green for "New" indicators or active status dots.

### Navigation
- Top/Bottom bars should use the Glassmorphism spec to allow content colors to bleed through subtly during scroll.