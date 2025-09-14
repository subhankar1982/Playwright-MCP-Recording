#!/usr/bin/env python3
"""Example usage of Playwright MCP Recording tools."""

import asyncio
import json
from pathlib import Path
import sys

# Add src to path for imports
sys.path.insert(0, str(Path(__file__).parent / "src"))

from src.server import (
    playwright_navigate,
    playwright_screenshot,
    playwright_click,
    playwright_fill,
    playwright_evaluate,
    playwright_stop_recording,
    playwright_list_videos,
    NavigateInput,
    ScreenshotInput,
    ClickInput,
    FillInput,
    EvaluateInput,
    StopRecordingInput
)


async def example_usage():
    """Example of how to use the Playwright MCP Recording tools."""
    print("🎭 Playwright MCP Recording - Example Usage")
    print("=" * 50)
    
    try:
        # Example 1: Navigate to a website
        print("1. Navigate to example.com...")
        nav_result = await playwright_navigate(NavigateInput(
            url="https://example.com",
            record_video=True
        ))
        print(f"   Result: {json.dumps(nav_result, indent=2)}")
        
        # Example 2: Take a screenshot
        print("\n2. Take a screenshot...")
        screenshot_result = await playwright_screenshot(ScreenshotInput(
            full_page=True
        ))
        print(f"   Result: {json.dumps(screenshot_result, indent=2)}")
        
        # Example 3: Execute JavaScript
        print("\n3. Execute JavaScript...")
        js_result = await playwright_evaluate(EvaluateInput(
            script="document.title"
        ))
        print(f"   Result: {json.dumps(js_result, indent=2)}")
        
        # Example 4: Stop recording
        print("\n4. Stop video recording...")
        stop_result = await playwright_stop_recording(StopRecordingInput(
            session_name="example_session"
        ))
        print(f"   Result: {json.dumps(stop_result, indent=2)}")
        
        # Example 5: List videos
        print("\n5. List recorded videos...")
        videos_result = await playwright_list_videos()
        print(f"   Result: {json.dumps(videos_result, indent=2)}")
        
        print("\n✅ Example completed successfully!")
        
    except Exception as e:
        print(f"❌ Example failed: {e}")
        print("\nNote: This example requires Playwright browsers to be installed.")
        print("Run: playwright install")


if __name__ == "__main__":
    print("⚠️  This is an example demonstrating the MCP tool interfaces.")
    print("To run this example, you need:")
    print("  1. Playwright browsers installed: playwright install")
    print("  2. A running browser environment")
    print("\nRunning example anyway to show structure...\n")
    
    asyncio.run(example_usage())