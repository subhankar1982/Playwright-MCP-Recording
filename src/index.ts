#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { chromium, Browser, Page, BrowserContext } from "playwright";
import * as fs from "fs";
import * as path from "path";

// State management
let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;
let isRecording = false;
let recordingActions: Array<{ type: string; data: any; timestamp: number }> = [];

// Create recordings directory
const recordingsDir = path.join(process.cwd(), "recordings");
if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir, { recursive: true });
}

// Create MCP server
const server = new Server(
  {
    name: "playwright-mcp-recording",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "launch_browser",
        description: "Launch a new browser instance with Playwright",
        inputSchema: {
          type: "object",
          properties: {
            headless: {
              type: "boolean",
              description: "Whether to run browser in headless mode",
              default: false,
            },
          },
        },
      },
      {
        name: "navigate",
        description: "Navigate to a URL",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "The URL to navigate to",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "start_recording",
        description: "Start recording browser interactions",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "stop_recording",
        description: "Stop recording and save the recorded actions",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Filename to save the recording (without extension)",
              default: "recording",
            },
          },
        },
      },
      {
        name: "take_screenshot",
        description: "Take a screenshot of the current page",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Filename to save the screenshot (without extension)",
              default: "screenshot",
            },
            fullPage: {
              type: "boolean",
              description: "Whether to take a full page screenshot",
              default: false,
            },
          },
        },
      },
      {
        name: "click",
        description: "Click on an element",
        inputSchema: {
          type: "object",
          properties: {
            selector: {
              type: "string",
              description: "CSS selector for the element to click",
            },
          },
          required: ["selector"],
        },
      },
      {
        name: "fill",
        description: "Fill an input field with text",
        inputSchema: {
          type: "object",
          properties: {
            selector: {
              type: "string",
              description: "CSS selector for the input field",
            },
            text: {
              type: "string",
              description: "Text to fill in the field",
            },
          },
          required: ["selector", "text"],
        },
      },
      {
        name: "close_browser",
        description: "Close the browser instance",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "launch_browser": {
        if (browser) {
          return {
            content: [
              {
                type: "text",
                text: "Browser is already launched. Close it first to launch a new one.",
              },
            ],
          };
        }

        const headless = (args?.headless as boolean | undefined) ?? false;
        browser = await chromium.launch({ headless });
        context = await browser.newContext({
          recordVideo: {
            dir: recordingsDir,
          },
        });
        page = await context.newPage();

        // Set up event listeners for recording
        page.on("console", (msg) => {
          if (isRecording) {
            recordingActions.push({
              type: "console",
              data: { text: msg.text(), type: msg.type() },
              timestamp: Date.now(),
            });
          }
        });

        return {
          content: [
            {
              type: "text",
              text: `Browser launched successfully in ${headless ? "headless" : "headed"} mode.`,
            },
          ],
        };
      }

      case "navigate": {
        if (!page) {
          return {
            content: [
              { type: "text", text: "No browser page available. Launch browser first." },
            ],
          };
        }

        const url = args?.url as string;
        await page.goto(url);

        if (isRecording) {
          recordingActions.push({
            type: "navigate",
            data: { url },
            timestamp: Date.now(),
          });
        }

        return {
          content: [{ type: "text", text: `Navigated to ${url}` }],
        };
      }

      case "start_recording": {
        if (!page) {
          return {
            content: [
              { type: "text", text: "No browser page available. Launch browser first." },
            ],
          };
        }

        isRecording = true;
        recordingActions = [];

        return {
          content: [{ type: "text", text: "Recording started" }],
        };
      }

      case "stop_recording": {
        if (!isRecording) {
          return {
            content: [{ type: "text", text: "No recording in progress" }],
          };
        }

        isRecording = false;
        const filename = (args?.filename as string) || "recording";
        const filePath = path.join(recordingsDir, `${filename}.json`);

        fs.writeFileSync(filePath, JSON.stringify(recordingActions, null, 2));

        return {
          content: [
            {
              type: "text",
              text: `Recording stopped and saved to ${filePath}. Recorded ${recordingActions.length} actions.`,
            },
          ],
        };
      }

      case "take_screenshot": {
        if (!page) {
          return {
            content: [
              { type: "text", text: "No browser page available. Launch browser first." },
            ],
          };
        }

        const filename = (args?.filename as string) || "screenshot";
        const fullPage = (args?.fullPage as boolean | undefined) ?? false;
        const filePath = path.join(recordingsDir, `${filename}.png`);

        await page.screenshot({ path: filePath, fullPage });

        if (isRecording) {
          recordingActions.push({
            type: "screenshot",
            data: { filename, fullPage },
            timestamp: Date.now(),
          });
        }

        return {
          content: [
            {
              type: "text",
              text: `Screenshot saved to ${filePath}`,
            },
          ],
        };
      }

      case "click": {
        if (!page) {
          return {
            content: [
              { type: "text", text: "No browser page available. Launch browser first." },
            ],
          };
        }

        const selector = args?.selector as string;
        await page.click(selector);

        if (isRecording) {
          recordingActions.push({
            type: "click",
            data: { selector },
            timestamp: Date.now(),
          });
        }

        return {
          content: [{ type: "text", text: `Clicked on element: ${selector}` }],
        };
      }

      case "fill": {
        if (!page) {
          return {
            content: [
              { type: "text", text: "No browser page available. Launch browser first." },
            ],
          };
        }

        const selector = args?.selector as string;
        const text = args?.text as string;
        await page.fill(selector, text);

        if (isRecording) {
          recordingActions.push({
            type: "fill",
            data: { selector, text },
            timestamp: Date.now(),
          });
        }

        return {
          content: [
            {
              type: "text",
              text: `Filled element ${selector} with text: ${text}`,
            },
          ],
        };
      }

      case "close_browser": {
        if (!browser) {
          return {
            content: [{ type: "text", text: "No browser is currently open" }],
          };
        }

        if (context) {
          await context.close();
          context = null;
        }

        await browser.close();
        browser = null;
        page = null;
        isRecording = false;

        return {
          content: [{ type: "text", text: "Browser closed successfully" }],
        };
      }

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playwright MCP Recording Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
