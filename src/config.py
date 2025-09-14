"""Configuration management for Playwright MCP Recording."""

import os
from pathlib import Path
from typing import List, Optional

from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class BrowserConfig(BaseModel):
    """Browser configuration settings."""
    
    headless: bool = Field(
        default_factory=lambda: os.getenv("BROWSER_HEADLESS", "false").lower() == "true",
        description="Run browser in headless mode"
    )
    viewport_width: int = Field(
        default_factory=lambda: int(os.getenv("BROWSER_VIEWPORT_WIDTH", "1280")),
        description="Browser viewport width"
    )
    viewport_height: int = Field(
        default_factory=lambda: int(os.getenv("BROWSER_VIEWPORT_HEIGHT", "720")),
        description="Browser viewport height"
    )
    args: List[str] = Field(
        default_factory=lambda: os.getenv("BROWSER_ARGS", "").split(",") if os.getenv("BROWSER_ARGS") else [],
        description="Additional browser arguments"
    )


class ContextConfig(BaseModel):
    """Browser context configuration settings."""
    
    locale: str = Field(
        default_factory=lambda: os.getenv("BROWSER_LOCALE", "en-US"),
        description="Browser locale"
    )
    timezone: str = Field(
        default_factory=lambda: os.getenv("BROWSER_TIMEZONE", "UTC"),
        description="Browser timezone"
    )
    permissions: List[str] = Field(
        default_factory=lambda: os.getenv("BROWSER_PERMISSIONS", "").split(",") if os.getenv("BROWSER_PERMISSIONS") else [],
        description="Browser permissions"
    )
    color_scheme: str = Field(
        default_factory=lambda: os.getenv("BROWSER_COLOR_SCHEME", "light"),
        description="Browser color scheme"
    )


class TimeoutConfig(BaseModel):
    """Timeout configuration settings."""
    
    default: int = Field(
        default_factory=lambda: int(os.getenv("DEFAULT_TIMEOUT", "30000")),
        description="Default timeout in milliseconds"
    )
    navigation: int = Field(
        default_factory=lambda: int(os.getenv("NAVIGATION_TIMEOUT", "30000")),
        description="Navigation timeout in milliseconds"
    )
    page_load_check: int = Field(
        default_factory=lambda: int(os.getenv("PAGE_LOAD_CHECK_TIMEOUT", "5000")),
        description="Page load check timeout in milliseconds"
    )
    network_idle: int = Field(
        default_factory=lambda: int(os.getenv("NETWORK_IDLE_TIMEOUT", "2000")),
        description="Network idle timeout in milliseconds"
    )


class ScreenshotConfig(BaseModel):
    """Screenshot configuration settings."""
    
    directory: Path = Field(
        default_factory=lambda: Path(os.getenv("SCREENSHOT_DIRECTORY", "~/.playwright-mcp-recording/screenshots")).expanduser(),
        description="Directory to save screenshots"
    )
    timestamp_format: str = Field(
        default_factory=lambda: os.getenv("SCREENSHOT_TIMESTAMP_FORMAT", "%Y%m%d_%H%M%S"),
        description="Timestamp format for screenshot filenames"
    )


class VideoConfig(BaseModel):
    """Video recording configuration settings."""
    
    directory: Path = Field(
        default_factory=lambda: Path(os.getenv("VIDEO_DIRECTORY", "~/.playwright-mcp-recording/videos")).expanduser(),
        description="Directory to save videos"
    )
    width: int = Field(
        default_factory=lambda: int(os.getenv("VIDEO_WIDTH", "1280")),
        description="Video width"
    )
    height: int = Field(
        default_factory=lambda: int(os.getenv("VIDEO_HEIGHT", "720")),
        description="Video height"
    )


class StealthConfig(BaseModel):
    """Stealth mode configuration settings."""
    
    enabled: bool = Field(
        default_factory=lambda: os.getenv("STEALTH_MODE", "true").lower() == "true",
        description="Enable stealth mode for anti-detection"
    )


class LoggingConfig(BaseModel):
    """Logging configuration settings."""
    
    level: str = Field(
        default_factory=lambda: os.getenv("LOG_LEVEL", "INFO"),
        description="Logging level"
    )
    format: str = Field(
        default_factory=lambda: os.getenv("LOG_FORMAT", "%(asctime)s - %(name)s - %(levelname)s - %(message)s"),
        description="Logging format"
    )


class Config(BaseModel):
    """Main configuration class."""
    
    browser: BrowserConfig = Field(default_factory=BrowserConfig)
    context: ContextConfig = Field(default_factory=ContextConfig)
    timeouts: TimeoutConfig = Field(default_factory=TimeoutConfig)
    screenshots: ScreenshotConfig = Field(default_factory=ScreenshotConfig)
    videos: VideoConfig = Field(default_factory=VideoConfig)
    stealth: StealthConfig = Field(default_factory=StealthConfig)
    logging: LoggingConfig = Field(default_factory=LoggingConfig)
    
    default_mobile_device: str = Field(
        default_factory=lambda: os.getenv("DEFAULT_MOBILE_DEVICE", "iPhone 13"),
        description="Default mobile device for emulation"
    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Ensure directories exist
        self.screenshots.directory.mkdir(parents=True, exist_ok=True)
        self.videos.directory.mkdir(parents=True, exist_ok=True)


# Global configuration instance
config = Config()