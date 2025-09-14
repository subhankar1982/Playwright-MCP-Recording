# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-09-14

### Added
- Initial implementation of Playwright MCP Recording server
- FastMCP-based server implementation with 9 browser automation tools
- Complete browser automation service with Playwright backend
- Video recording capabilities across multiple navigation sessions
- Screenshot capture (full page and element-specific)
- Device emulation support for mobile testing
- Stealth mode for anti-bot detection
- Console log monitoring and management
- Environment-based configuration with .env support
- Automatic directory creation for media files
- Comprehensive error handling and logging
- CLI entry point for server execution
- Complete documentation with setup instructions
- Test script for verifying installation
- Example usage script demonstrating all features
- MIT license

### Features
- **Browser Navigation**: Navigate to URLs with configurable timeouts and device emulation
- **Screenshot Capture**: Take full page or element screenshots with automatic file naming
- **Video Recording**: Record browser sessions and save with custom session names
- **Page Interactions**: Click elements and fill form fields programmatically
- **JavaScript Execution**: Execute custom JavaScript code in browser context
- **Mobile Emulation**: Full device emulation using Playwright device registry
- **Stealth Mode**: Anti-detection capabilities using playwright-stealth
- **Console Monitoring**: Capture, retrieve, and clear browser console logs
- **Configuration Management**: Environment-based configuration with sensible defaults

### Tools Available
- `playwright_navigate` - Navigate to URLs with optional device emulation and video recording
- `playwright_screenshot` - Capture screenshots of pages or specific elements
- `playwright_click` - Click elements on the page using CSS selectors
- `playwright_fill` - Fill input fields with text
- `playwright_evaluate` - Execute JavaScript code in browser context
- `playwright_stop_recording` - Stop video recording and save with custom name
- `playwright_list_videos` - List all saved video recordings
- `playwright_get_console_logs` - Retrieve console logs from current session
- `playwright_clear_console_logs` - Clear console logs

### Technical Details
- Built on FastMCP framework for robust MCP implementation
- Uses Playwright for reliable browser automation
- Pydantic models for type-safe input validation
- Organized service-based architecture
- Persistent storage for screenshots and videos
- Environment variable configuration
- Comprehensive error handling and logging
- Cross-platform compatibility

### Files Structure
- `src/server.py` - Main MCP server implementation (288 lines)
- `src/config.py` - Configuration management (152 lines)  
- `src/services/browser.py` - Browser automation service (280 lines)
- `pyproject.toml` - Package configuration
- `README.md` - Comprehensive documentation
- `.env.example` - Configuration template
- `test_setup.py` - Installation verification script
- `example_usage.py` - Usage demonstration script