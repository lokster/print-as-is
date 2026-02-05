# Print As Is

A Firefox extension that captures a full-page screenshot and prints it exactly as displayed on screen.

## The Problem

When you print a web page using the browser's built-in print function, the output often looks nothing like what you see on screen:

- CSS styles get modified or removed for "print" media
- Page layouts reflow and break unpredictably
- Background colors and images disappear
- Fixed/sticky elements (headers, chat widgets) cause issues
- Dynamic content and interactive elements render incorrectly

## The Solution

Print As Is bypasses all of these issues by capturing the page as a single screenshot image, then printing that image. What you see is exactly what you get.

## Use Cases

- **Archiving web pages** - Save a permanent visual record of how a page looked at a specific moment
- **Printing receipts/confirmations** - Online orders, booking confirmations, transaction records
- **Documentation** - Capture web application interfaces, dashboards, or reports
- **Legal/compliance** - Print evidence of web content for records
- **Design review** - Print mockups or live sites exactly as rendered
- **Printing pages with complex layouts** - Single-page applications, interactive content, or pages with heavy JavaScript

## Usage

1. Navigate to the page you want to print
2. Click the Print As Is extension icon in the toolbar
3. Click "Print Page"
4. The page will be captured and the print dialog will open
5. After printing (or canceling), the page automatically reloads to restore the original content

## Requirements

- Firefox 109.0 or later

## Permissions

- `activeTab` - Access the current tab to capture and modify its content
- `scripting` - Inject the capture script into the page

## Limitations

- Very long pages may hit browser memory limits
- The captured image reflects the page state at scroll position 0 (top of page)
- Pages requiring authentication may need you to be logged in before capture

## License

MIT

---

## Development

This section provides guidance for development and for Claude Code (claude.ai/code).

### Git Commits

Do not include "Co-Authored-By" lines in commit messages.

### Workflow

There is no build system. Files are edited directly and packaged as an XPI (ZIP archive) for Firefox.

**To package the extension:**
```bash
zip -r print-as-is.xpi manifest.json popup.html popup.js background.js content.js icon.svg
```

**To test in Firefox:**
1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select manifest.json or the XPI file

**To sign for distribution:**
```bash
npm install -g web-ext
web-ext sign --api-key=YOUR_JWT_ISSUER --api-secret=YOUR_JWT_SECRET
```
Get API credentials at: https://addons.mozilla.org/developers/addon/api/key/

### Architecture

Three-tier WebExtension pattern:

1. **popup.html / popup.js** - UI layer. Button click injects content script into active tab, then closes immediately.

2. **background.js** - Service worker bridge. Handles `capture_visible_tab` messages using `browser.tabs.captureVisibleTab()` API with optional `rect` and `scale` parameters for full-page capture.

3. **content.js** - Main logic. Orchestrates the capture process:
   - Scrolls to top of page
   - Requests full-page capture using `rect` option (Firefox 82+) with document dimensions
   - Replaces body content with captured image (preserves head metadata like title, description)
   - Triggers print dialog
   - Reloads page after printing to restore original content

**Key features:**
- Single-shot full-page capture using `captureVisibleTab` with `rect` option (no scrolling/stitching needed)
- Handles device pixel ratio via `scale` option for high-DPI displays
- Preserves document head (title, meta tags, favicons)
- Auto-reloads page after print dialog closes
- `hasRunPrintAsIs` flag prevents duplicate execution
- 600ms initial delay for popup close (crucial for Android)

### Browser API

Uses Firefox's `browser` namespace (WebExtension API). Required permissions: `activeTab`, `scripting`. Minimum Firefox version: 109.0.

The `rect` option for `captureVisibleTab` requires Firefox 82+, which is covered by the 109.0 minimum.
