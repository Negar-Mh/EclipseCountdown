import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Construct the absolute file path
        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        # Wait for the header to be visible using the correct selector
        header_selector = ".glass-nav"
        await page.wait_for_selector(header_selector, state='visible')

        # Find the first icon link within the header
        icon_link_selector = f"{header_selector} .icon-link"
        icon_link = await page.query_selector(icon_link_selector)

        if icon_link:
            # Simulate a mouse down event to trigger the :active state
            bounding_box = await icon_link.bounding_box()
            if bounding_box:
                await page.mouse.move(bounding_box['x'] + bounding_box['width'] / 2, bounding_box['y'] + bounding_box['height'] / 2)
                await page.mouse.down()

        # Add a small delay to ensure the :active style is rendered
        await page.wait_for_timeout(300)

        # Locate the header element to capture it
        header_element = await page.query_selector(header_selector)

        # Take a screenshot of just the header
        screenshot_path = "verification/verification.png"
        os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
        if header_element:
            await header_element.screenshot(path=screenshot_path)
        else:
            # Fallback to full page if header not found
            await page.screenshot(path=screenshot_path)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
