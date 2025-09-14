"""Playwright MCP Recording Server implementation."""

import asyncio
import logging
from typing import Any, Dict, List, Optional

from fastmcp import FastMCP
from pydantic import BaseModel, Field

from .config import config
from .services.browser import browser_service


# Configure logging
logging.basicConfig(
    level=getattr(logging, config.logging.level),
    format=config.logging.format
)
logger = logging.getLogger(__name__)

# Create FastMCP server
mcp = FastMCP("Playwright MCP Recording")


# Pydantic models for tool inputs
class NavigateInput(BaseModel):
    url: str = Field(description="URL to navigate to")
    device: Optional[str] = Field(default=None, description="Device name for emulation (e.g., 'iPhone 13', 'iPad')")
    record_video: bool = Field(default=False, description="Enable video recording for this session")
    wait_until: str = Field(default="networkidle", description="When to consider navigation complete")


class ScreenshotInput(BaseModel):
    element_selector: Optional[str] = Field(default=None, description="CSS selector for element to screenshot")
    full_page: bool = Field(default=False, description="Take full page screenshot")


class ClickInput(BaseModel):
    selector: str = Field(description="CSS selector for element to click")


class FillInput(BaseModel):
    selector: str = Field(description="CSS selector for input element")
    text: str = Field(description="Text to fill in the input field")


class EvaluateInput(BaseModel):
    script: str = Field(description="JavaScript code to execute")


class StopRecordingInput(BaseModel):
    session_name: Optional[str] = Field(default=None, description="Name for the recording session")


@mcp.tool()
async def playwright_navigate(input: NavigateInput) -> Dict[str, Any]:
    """Navigate to a URL with optional device emulation and video recording."""
    try:
        # Create new context if device emulation or recording is requested
        if input.device or input.record_video:
            await browser_service.create_context(
                device_name=input.device,
                record_video=input.record_video
            )
        
        result = await browser_service.navigate(input.url, input.wait_until)
        
        return {
            "success": True,
            "result": result,
            "message": f"Successfully navigated to {input.url}"
        }
        
    except Exception as e:
        logger.error(f"Navigation error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to navigate to {input.url}"
        }


@mcp.tool()
async def playwright_screenshot(input: ScreenshotInput) -> Dict[str, Any]:
    """Take a screenshot of the current page or a specific element."""
    try:
        filepath = await browser_service.screenshot(
            element_selector=input.element_selector,
            full_page=input.full_page
        )
        
        return {
            "success": True,
            "filepath": filepath,
            "message": "Screenshot captured successfully"
        }
        
    except Exception as e:
        logger.error(f"Screenshot error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to capture screenshot"
        }


@mcp.tool()
async def playwright_click(input: ClickInput) -> Dict[str, Any]:
    """Click an element on the current page."""
    try:
        result = await browser_service.click(input.selector)
        
        return {
            "success": result["success"],
            "result": result,
            "message": f"Click action completed on {input.selector}"
        }
        
    except Exception as e:
        logger.error(f"Click error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to click element {input.selector}"
        }


@mcp.tool()
async def playwright_fill(input: FillInput) -> Dict[str, Any]:
    """Fill an input field with text."""
    try:
        result = await browser_service.fill(input.selector, input.text)
        
        return {
            "success": result["success"],
            "result": result,
            "message": f"Fill action completed on {input.selector}"
        }
        
    except Exception as e:
        logger.error(f"Fill error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to fill element {input.selector}"
        }


@mcp.tool()
async def playwright_evaluate(input: EvaluateInput) -> Dict[str, Any]:
    """Execute JavaScript code in the browser context."""
    try:
        result = await browser_service.evaluate(input.script)
        
        return {
            "success": True,
            "result": result,
            "message": "JavaScript executed successfully"
        }
        
    except Exception as e:
        logger.error(f"Evaluate error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to execute JavaScript"
        }


@mcp.tool()
async def playwright_stop_recording(input: StopRecordingInput) -> Dict[str, Any]:
    """Stop video recording and save the file."""
    try:
        filepath = await browser_service.stop_recording(input.session_name)
        
        if filepath:
            return {
                "success": True,
                "filepath": filepath,
                "message": "Video recording stopped and saved successfully"
            }
        else:
            return {
                "success": False,
                "message": "No active recording found or recording was not enabled"
            }
        
    except Exception as e:
        logger.error(f"Stop recording error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to stop recording"
        }


@mcp.tool()
async def playwright_list_videos() -> Dict[str, Any]:
    """List all saved video recordings."""
    try:
        videos = await browser_service.list_videos()
        
        return {
            "success": True,
            "videos": videos,
            "count": len(videos),
            "message": f"Found {len(videos)} video recordings"
        }
        
    except Exception as e:
        logger.error(f"List videos error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to list video recordings"
        }


@mcp.tool()
async def playwright_get_console_logs() -> Dict[str, Any]:
    """Get console logs from the current browser session."""
    try:
        logs = browser_service.get_console_logs()
        
        return {
            "success": True,
            "logs": logs,
            "count": len(logs),
            "message": f"Retrieved {len(logs)} console log entries"
        }
        
    except Exception as e:
        logger.error(f"Get console logs error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to get console logs"
        }


@mcp.tool()
async def playwright_clear_console_logs() -> Dict[str, Any]:
    """Clear console logs from the current session."""
    try:
        browser_service.clear_console_logs()
        
        return {
            "success": True,
            "message": "Console logs cleared successfully"
        }
        
    except Exception as e:
        logger.error(f"Clear console logs error: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to clear console logs"
        }


async def main():
    """Main entry point for the MCP server."""
    logger.info("Starting Playwright MCP Recording Server...")
    
    try:
        # Initialize browser service
        await browser_service.initialize()
        
        # Run the MCP server
        await mcp.run()
        
    except KeyboardInterrupt:
        logger.info("Server shutdown requested")
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        raise
    finally:
        # Clean up browser resources
        await browser_service.close()
        logger.info("Server shutdown complete")


def cli():
    """CLI entry point wrapper for async main."""
    asyncio.run(main())


if __name__ == "__main__":
    cli()