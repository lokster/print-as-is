document.getElementById('captureBtn').addEventListener('click', async () => {
    const btn = document.getElementById('captureBtn');
    btn.textContent = "Processing...";
    btn.disabled = true;

    try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

        if (!tab || !tab.id) {
            throw new Error("No active tab found");
        }

        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });

        // Close immediately so the Android UI gets out of the way
        window.close();
    } catch (error) {
        console.error("Failed to execute script:", error);
        btn.textContent = "Error!";
        btn.style.backgroundColor = "#666";

        // Reset button after delay so user can try again
        setTimeout(() => {
            btn.textContent = "Print Page";
            btn.style.backgroundColor = "";
            btn.disabled = false;
        }, 2000);
    }
});
