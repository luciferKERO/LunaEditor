---
name: NovaCut Studio
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191c23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e0e2ec'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e0e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#10131a'
  on-background: '#e0e2ec'
  surface-variant: '#32353c'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 0.875rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.02em
  code-mono:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.5rem
  margin: 0.75rem
  space-xs: 0.125rem
  space-sm: 0.25rem
  space-md: 0.5rem
  space-lg: 0.75rem
  space-xl: 1rem
---

## Brand & Style

This design system defines a high-performance, dark-mode creative workstation built for professional non-linear video editing and AI-augmented post-production. It balances the utilitarian rigor of hardware-accelerated timeline applications with the clean clarity of modern generative tools.

### Personality & Demographics
- **Target Audience:** Technical video editors, motion designers, content engineers, and creative directors requiring maximum track density, frame-accurate control, and non-distracting UI surfaces.
- **Tone:** Focused, surgical, authoritative, and responsive. Every UI element exists to serve media preview and timeline manipulation rather than competing for visual dominance.
- **Visual Style:** Modern Workstation Minimalism. The aesthetic relies on low-contrast structural dividers (1px crisp borders), deep slate background tiers, and an electric violet primary accent that signals active playback, selection states, and AI operations.

## Colors

The palette uses low-luminance neutral planes to protect color grading neutrality, accented with functional track hues and an electric violet primary tone.

### Palette Architecture
- **Canvas Base (`#111318`):** Deepest workspace background, viewport outer matte, and main monitor backdrop.
- **Panel Surface (`#191C23`):** Docked workstation panels, media pools, inspector sidebars, and timeline housing.
- **Elevated Toolbars & Trays (`#252832`):** Transport controls, timeline playhead caps, floating toolbars, and modal headers.
- **Surface Hover / Selection (`#2E323F`):** Row interactions, scrubbing states, inactive track item hover.
- **Hairlines & Dividers (`#343844`):** Strict 1px structural separators between dock panels and ruler units.
- **Primary Accent (`#8B5CF6` / Hover: `#7C3AED`):** Playhead cursor, active tool indicator, AI copilot processing, and keyframe selection. Subtle fill uses `rgba(139, 92, 246, 0.15)`.
- **Text & Icon Hierarchy:**
  - High Emphasis: `#E6E8EF` (Timecodes, clip titles, primary values).
  - Medium Emphasis: `#969BAA` (Track labels, parameter metadata, unit marks).
  - Dim Emphasis: `#64697A` (Inactive markers, grid ticks, empty states).

### Media Track Color Taxonomy
- **Video Track (V1-V4):** `#6366F1` (Indigo/Purple)
- **Audio Track (A1-A4):** `#06B6D4` (Cyan/Teal)
- **SFX Track:** `#10B981` (Emerald)
- **Captions & Transcript:** `#F59E0B` (Amber)
- **Overlays & Graphics:** `#EC4899` (Pink)
- **System Feedback:** Success `#10B981`, Warning `#F59E0B`, Danger/Error `#EF4444`.

## Typography

Typography prioritizes legibility at dense workstation sizes (11px to 13px), utilizing `Inter` with OpenType tabular figures (`tnum`) enabled globally for frame counters, timecode inputs, and audio dB meters.

### Type Scale Rules
- **Display & Modal Titles (`headline-xl`, `headline-lg`):** Reserved for project setup modals, export configuration panels, and workspace layout selectors.
- **Panel & Dock Headers (`headline-md`, `label-sm`):** Uppercase, tracking-spaced labels (`letterSpacing: 0.02em`) designating workspace regions (e.g., `TIMELINE`, `INSPECTOR`, `AI EFFECTS`).
- **Data & Parameter Labels (`body-md`, `label-md`):** High-density control parameters such as clip speed, opacity, blend mode, and transform matrices.
- **Timecode & Precision Scrubbers (`code-mono`):** Numeric readouts representing frames (`00:14:23:08`), relying on fixed tabular widths to prevent layout jitter during scrub and playback.

## Layout & Spacing

The workstation layout employs a multi-pane split-screen architecture optimized for 1440x900 baseline displays, stretching fluidly across dual-monitor and ultrawide setups.

### Workstation Grid & Geometry
- **Panel Layout:** Non-wrapping CSS flexbox/grid containers separated by rigid 1px dividers (`#343844`). Standard arrangement comprises Media Bin/AI Pool (left: 280px-340px), Main Viewport/Program Monitor (center-top: flexible), Inspector/Scrubber Controls (right: 320px), and Multi-Track Timeline (bottom: 40-50% vertical viewport split).
- **Spatial Rhythm:** Tight 4px base increment (`space-sm` = 4px, `space-md` = 8px). Panels avoid generous marketing whitespace, favoring compact, information-dense tool belts.
- **Margins & Gutters:** Internal docking margins (`0.75rem`) keep controls safe from edge bezels, while gutter seams between dock partitions collapse to 1px splitter hitboxes.

## Elevation & Depth

Visual hierarchy uses tonal surface stacking paired with sharp 1px borders rather than heavy ambient drop shadows, maintaining crisp contrast against moving video playback.

### Tonal Tiers
1. **Base Tier (`#111318`):** The canvas beneath panels, monitor bezels, and ruler backgrounds.
2. **Surface Tier (`#191C23`):** Docked panel interiors, clip bins, and track lanes. Bordered by `1px solid #343844`.
3. **Elevated Tier (`#252832`):** Floating transport bars, active tab pills, timeline playhead, and contextual toolbars.
4. **Overlay / Flyout Tier (`#252832`):** Popover inspectors, context menus, and timeline clip tooltips. Accented with a hairline border (`1px solid #343844`) and a subtle, high-density drop shadow: `0 8px 24px rgba(0, 0, 0, 0.45)`.
5. **Active Focus / Scrubbing:** Clips under edit receive an outline of `1px solid #8B5CF6` and an inner glow of `inset 0 0 0 1px #8B5CF6`.

## Shapes

The interface utilizes a precision-focused, tight corner radius of 4px (`roundedness: 1`), conveying mechanical stability and maximizing usable screen real estate.

### Geometry Guidelines
- **Clip Segments & Tracks:** Fixed 4px corner radius (`0.25rem`) on bounding clip edges to clearly delineate splice cuts while maintaining continuity across tracks.
- **Buttons, Inputs & Sliders:** 4px radius for all transport buttons, numerical scrub inputs, and tool tabs.
- **Modals & Overlays:** Large dialogs use 8px (`rounded-lg`), retaining structured edges without aggressive softening.
- **Playhead Needle & Markers:** Sharp geometric shapes with zero-radius needles pointing precisely at timeline sub-frames.

## Components

### Buttons & Transport Controls
- **Primary Action (AI Process, Export):** Solid `#8B5CF6` background, `#E6E8EF` text, 4px radius, height 28px/32px, horizontal padding `space-md`. Hover state shifts to `#7C3AED`. Active state scales down subtly (0.98x).
- **Tool & Transport Buttons:** Ghost style. Default `#252832` background with `#969BAA` icon. On hover: `#2E323F` with `#E6E8EF` foreground. Active/Toggled tool (e.g., Razor, Slip, Ripple): solid `#8B5CF6` background with white icon.

### Timeline Track Clips
- **Clip Containers:** Height 32px (collapsed) to 64px (expanded waveform view). 4px border radius. 
- **Clip Themes:** Background color derived from media taxonomy at 20% opacity; top accent bar (2px) and text colored in 100% token hue (e.g., `#06B6D4` for Audio).
- **Selection State:** Active clip displays a solid `1.5px solid #8B5CF6` border and white title label.
- **Trim Handles:** 6px interactive hit targets on left/right edges with cursor indicators (`col-resize`).

### Input Fields & Parameter Scrubbers
- **Numeric Scrubbers:** Compact 24px height. Dark fill (`#111318`), hairline border (`#343844`), monospace font. Drag-to-scrub enabled horizontally, displaying an electric violet bar underneath proportional to the normalized parameter range.
- **Text Inputs:** `#111318` background, `#E6E8EF` text, 1px border. Focus state triggers `border-color: #8B5CF6` with zero fuzzy focus rings.

### Chips & AI Copilot Badges
- **Status Chips:** Height 20px, 4px radius. Subtle background `rgba(139, 92, 246, 0.15)`, text `#8B5CF6`, font weight 600, uppercase 11px label.
- **AI Processing State:** Subtle animated shimmer overlay moving across track segments with violet border pulses.

### Inspector Cards & Docked Panels
- **Panel Header:** Height 32px, background `#191C23`, border-bottom `1px solid #343844`, containing bold 11px uppercase label, window controls, and panel collapse icons.
- **Content Area:** Background `#191C23`, scrollable with 4px wide custom slate scrollbars (thumb: `#343844`, track: transparent).