# Playwright-MCP-Recording

An MCP (Model Context Protocol) server that provides browser automation and recording capabilities using Playwright.

## Features

- 🚀 Launch and control browser instances
- 📹 Record browser interactions and save them as JSON
- 📸 Take screenshots (full page or viewport)
- 🖱️ Automate clicks and form filling
- 🔄 Navigate to URLs
- 📝 Track console messages during recording

## Installation

```bash
npm install
npm run build
```

To use Playwright, you'll also need to install browsers:

```bash
npx playwright install chromium
```

## Usage

This MCP server can be used with any MCP client. Add it to your MCP client configuration:

```json
{
  "mcpServers": {
    "playwright-recording": {
      "command": "node",
      "args": ["/path/to/Playwright-MCP-Recording/dist/index.js"]
    }
  }
}
```

## Available Tools

### `launch_browser`
Launch a new browser instance.

**Parameters:**
- `headless` (boolean, optional): Whether to run browser in headless mode (default: false)

### `navigate`
Navigate to a URL.

**Parameters:**
- `url` (string, required): The URL to navigate to

### `start_recording`
Start recording browser interactions. All subsequent actions will be recorded.

### `stop_recording`
Stop recording and save the recorded actions to a JSON file.

**Parameters:**
- `filename` (string, optional): Filename to save the recording (default: "recording")

### `take_screenshot`
Take a screenshot of the current page.

**Parameters:**
- `filename` (string, optional): Filename for the screenshot (default: "screenshot")
- `fullPage` (boolean, optional): Whether to capture the full page (default: false)

### `click`
Click on an element.

**Parameters:**
- `selector` (string, required): CSS selector for the element to click

### `fill`
Fill an input field with text.

**Parameters:**
- `selector` (string, required): CSS selector for the input field
- `text` (string, required): Text to fill in the field

### `close_browser`
Close the browser instance.

## Example Workflow

1. Launch browser: `launch_browser` with `headless: false`
2. Navigate to a page: `navigate` with `url: "https://example.com"`
3. Start recording: `start_recording`
4. Perform actions: `click`, `fill`, etc.
5. Take screenshot: `take_screenshot` with `filename: "result"`
6. Stop recording: `stop_recording` with `filename: "my-test"`
7. Close browser: `close_browser`

All recordings and screenshots are saved in the `recordings/` directory.

## Development

```bash
# Build the project
npm run build

# Run in development mode
npm run dev
```

## License

MIT
