// Listens for capture requests from the content script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture_visible_tab") {
        // Build options - use rect if provided for full-page capture
        const options = { format: "png" };

        if (request.rect) {
            options.rect = request.rect;
        }

        if (request.scale) {
            options.scale = request.scale;
        }

        browser.tabs.captureVisibleTab(null, options)
            .then((dataUrl) => {
                sendResponse({ dataUrl: dataUrl });
            })
            .catch((error) => {
                console.error("Screenshot failed:", error);
                sendResponse({ error: error.message });
            });

        return true; // Keep channel open for async response
    }
});