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

## Installation

1. Download the latest `.xpi` file from [Releases](https://github.com/lokster/print-as-is/releases)
2. Open Firefox and drag the `.xpi` file into the browser window
3. Click "Add" when prompted

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

## Localization

Available in:
- English
- Bulgarian

## License

MIT
