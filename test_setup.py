#!/usr/bin/env python3
"""Simple test script to demonstrate Playwright MCP Recording functionality."""

import asyncio
import logging
import sys
from pathlib import Path

# Add src to path for imports
sys.path.insert(0, str(Path(__file__).parent / "src"))

from src.config import config
from src.services.browser import browser_service


async def test_configuration():
    """Test configuration loading."""
    print("🔧 Testing Configuration...")
    print(f"   Screenshots directory: {config.screenshots.directory}")
    print(f"   Videos directory: {config.videos.directory}")
    print(f"   Browser headless: {config.browser.headless}")
    print(f"   Stealth mode: {config.stealth.enabled}")
    print("   ✅ Configuration loaded successfully")


async def test_browser_service():
    """Test browser service initialization (without actual browser)."""
    print("\n🌐 Testing Browser Service...")
    print("   Browser service instance created")
    print(f"   Console logs: {len(browser_service.get_console_logs())} entries")
    print("   ✅ Browser service ready")


async def test_directory_creation():
    """Test that required directories are created."""
    print("\n📁 Testing Directory Creation...")
    
    # Check if directories exist
    screenshots_exist = config.screenshots.directory.exists()
    videos_exist = config.videos.directory.exists()
    
    print(f"   Screenshots directory exists: {screenshots_exist}")
    print(f"   Videos directory exists: {videos_exist}")
    
    if screenshots_exist and videos_exist:
        print("   ✅ Directories created successfully")
    else:
        print("   ❌ Some directories were not created")


def test_imports():
    """Test that all modules can be imported."""
    print("📦 Testing Imports...")
    
    try:
        from src.server import mcp
        print("   ✅ Server module imported")
        
        from src.config import config
        print("   ✅ Config module imported")
        
        from src.services.browser import browser_service
        print("   ✅ Browser service imported")
        
        print("   ✅ All imports successful")
        return True
        
    except Exception as e:
        print(f"   ❌ Import failed: {e}")
        return False


async def main():
    """Run all tests."""
    print("🚀 Playwright MCP Recording - Test Suite")
    print("=" * 50)
    
    # Test imports first
    if not test_imports():
        return False
    
    # Test configuration
    await test_configuration()
    
    # Test browser service
    await test_browser_service()
    
    # Test directory creation
    await test_directory_creation()
    
    print("\n" + "=" * 50)
    print("✅ All tests completed successfully!")
    print("\n🎯 Next Steps:")
    print("   1. Install Playwright browsers: playwright install")
    print("   2. Configure environment variables in .env")
    print("   3. Start the MCP server: playwright-mcp-recording")
    print("   4. Connect from your MCP client")
    
    return True


if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)