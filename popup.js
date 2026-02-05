// Initialize i18n strings
document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = browser.i18n.getMessage(el.dataset.i18n);
});

document.getElementById('captureBtn').addEventListener('click', async () => {
    const btn = document.getElementById('captureBtn');
    btn.textContent = browser.i18n.getMessage('processing');
    btn.disabled = true;

    try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

        if (!tab || !tab.id) {
            throw new Error("No active tab found");
        }

        // Fire and forget - don't await, close immediately
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });

        window.close();
    } catch (error) {
        console.error("Failed to execute script:", error);
        btn.textContent = browser.i18n.getMessage('error');
        btn.style.backgroundColor = "#666";

        // Reset button after delay so user can try again
        setTimeout(() => {
            btn.textContent = browser.i18n.getMessage('printButton');
            btn.style.backgroundColor = "";
            btn.disabled = false;
        }, 2000);
    }
});
