"""Browser service for managing Playwright instances."""

import asyncio
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any, List

from playwright.async_api import async_playwright, Browser, BrowserContext, Page, Playwright
from playwright_stealth import stealth

from ..config import config


logger = logging.getLogger(__name__)


class BrowserService:
    """Service for managing Playwright browser instances with recording capabilities."""
    
    def __init__(self):
        self.playwright: Optional[Playwright] = None
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None
        self.recording_session: Optional[str] = None
        self.console_logs: List[Dict[str, Any]] = []
        
    async def initialize(self) -> None:
        """Initialize the Playwright browser instance."""
        if self.playwright is None:
            logger.info("Initializing Playwright browser service...")
            self.playwright = await async_playwright().start()
            
            # Launch browser with configuration
            browser_args = config.browser.args.copy() if config.browser.args else []
            
            self.browser = await self.playwright.chromium.launch(
                headless=config.browser.headless,
                args=browser_args
            )
            
            # Create initial context
            await self.create_context()
            
            logger.info("Browser service initialized successfully")
    
    async def create_context(self, device_name: Optional[str] = None, record_video: bool = False) -> None:
        """Create a new browser context with optional device emulation and video recording."""
        if not self.browser:
            await self.initialize()
        
        context_options = {
            "viewport": {
                "width": config.browser.viewport_width,
                "height": config.browser.viewport_height
            },
            "locale": config.context.locale,
            "timezone_id": config.context.timezone,
            "color_scheme": config.context.color_scheme,
        }
        
        # Add device emulation if specified
        if device_name:
            device = self.playwright.devices.get(device_name)
            if device:
                context_options.update(device)
                logger.info(f"Using device emulation: {device_name}")
            else:
                logger.warning(f"Device '{device_name}' not found, using default settings")
        
        # Add video recording if enabled
        if record_video:
            video_dir = config.videos.directory
            context_options["record_video"] = {
                "dir": str(video_dir),
                "size": {
                    "width": config.videos.width,
                    "height": config.videos.height
                }
            }
            logger.info(f"Video recording enabled, saving to: {video_dir}")
        
        # Close existing context if any
        if self.context:
            await self.context.close()
        
        # Create new context
        self.context = await self.browser.new_context(**context_options)
        
        # Create new page
        if self.page:
            await self.page.close()
        
        self.page = await self.context.new_page()
        
        # Apply stealth mode if enabled
        if config.stealth.enabled:
            await stealth(self.page)
            logger.info("Stealth mode applied")
        
        # Set up console log monitoring
        self.page.on("console", self._handle_console_message)
        
        # Set timeouts
        self.page.set_default_timeout(config.timeouts.default)
        self.page.set_default_navigation_timeout(config.timeouts.navigation)
    
    def _handle_console_message(self, msg) -> None:
        """Handle console messages from the browser."""
        self.console_logs.append({
            "timestamp": datetime.now().isoformat(),
            "type": msg.type,
            "text": msg.text,
            "location": msg.location
        })
    
    async def navigate(self, url: str, wait_until: str = "networkidle") -> Dict[str, Any]:
        """Navigate to a URL."""
        if not self.page:
            await self.initialize()
        
        logger.info(f"Navigating to: {url}")
        
        try:
            response = await self.page.goto(url, wait_until=wait_until)
            
            result = {
                "url": self.page.url,
                "title": await self.page.title(),
                "status": response.status if response else None,
                "success": True
            }
            
            logger.info(f"Navigation successful: {result['title']}")
            return result
            
        except Exception as e:
            logger.error(f"Navigation failed: {str(e)}")
            return {
                "url": url,
                "title": None,
                "status": None,
                "success": False,
                "error": str(e)
            }
    
    async def screenshot(self, element_selector: Optional[str] = None, full_page: bool = False) -> str:
        """Take a screenshot and return the file path."""
        if not self.page:
            await self.initialize()
        
        timestamp = datetime.now().strftime(config.screenshots.timestamp_format)
        filename = f"screenshot_{timestamp}.png"
        filepath = config.screenshots.directory / filename
        
        try:
            if element_selector:
                element = await self.page.locator(element_selector).first
                await element.screenshot(path=str(filepath))
                logger.info(f"Element screenshot saved: {filepath}")
            else:
                await self.page.screenshot(path=str(filepath), full_page=full_page)
                logger.info(f"Page screenshot saved: {filepath}")
            
            return str(filepath)
            
        except Exception as e:
            logger.error(f"Screenshot failed: {str(e)}")
            raise
    
    async def click(self, selector: str) -> Dict[str, Any]:
        """Click an element on the page."""
        if not self.page:
            await self.initialize()
        
        try:
            await self.page.locator(selector).click()
            logger.info(f"Clicked element: {selector}")
            return {"success": True, "selector": selector}
            
        except Exception as e:
            logger.error(f"Click failed on {selector}: {str(e)}")
            return {"success": False, "selector": selector, "error": str(e)}
    
    async def fill(self, selector: str, text: str) -> Dict[str, Any]:
        """Fill an input field with text."""
        if not self.page:
            await self.initialize()
        
        try:
            await self.page.locator(selector).fill(text)
            logger.info(f"Filled element {selector} with text")
            return {"success": True, "selector": selector, "text": text}
            
        except Exception as e:
            logger.error(f"Fill failed on {selector}: {str(e)}")
            return {"success": False, "selector": selector, "text": text, "error": str(e)}
    
    async def evaluate(self, script: str) -> Any:
        """Execute JavaScript in the browser context."""
        if not self.page:
            await self.initialize()
        
        try:
            result = await self.page.evaluate(script)
            logger.info("JavaScript executed successfully")
            return result
            
        except Exception as e:
            logger.error(f"JavaScript execution failed: {str(e)}")
            raise
    
    async def stop_recording(self, session_name: Optional[str] = None) -> Optional[str]:
        """Stop video recording and save the file."""
        if not self.context:
            logger.warning("No context available for stopping recording")
            return None
        
        try:
            await self.context.close()
            
            # If recording was enabled, find the video file
            video_dir = config.videos.directory
            video_files = list(video_dir.glob("*.webm"))
            
            if video_files:
                # Get the most recent video file
                latest_video = max(video_files, key=lambda f: f.stat().st_mtime)
                
                # Rename with session name if provided
                if session_name:
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    new_name = f"{session_name}_{timestamp}.webm"
                    new_path = video_dir / new_name
                    latest_video.rename(new_path)
                    logger.info(f"Video recording saved as: {new_path}")
                    return str(new_path)
                else:
                    logger.info(f"Video recording saved as: {latest_video}")
                    return str(latest_video)
            
            # Recreate context for continued use
            await self.create_context()
            
        except Exception as e:
            logger.error(f"Failed to stop recording: {str(e)}")
            raise
        
        return None
    
    async def list_videos(self) -> List[str]:
        """List all saved video recordings."""
        video_dir = config.videos.directory
        video_files = list(video_dir.glob("*.webm"))
        return [str(f) for f in sorted(video_files, key=lambda f: f.stat().st_mtime, reverse=True)]
    
    def get_console_logs(self) -> List[Dict[str, Any]]:
        """Get console logs from the current session."""
        return self.console_logs.copy()
    
    def clear_console_logs(self) -> None:
        """Clear console logs."""
        self.console_logs.clear()
    
    async def close(self) -> None:
        """Clean up and close browser resources."""
        if self.page:
            await self.page.close()
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        
        logger.info("Browser service closed")


# Global browser service instance
browser_service = BrowserService()