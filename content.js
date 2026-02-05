(async function() {
    if (window.hasRunPrintAsIs) return;
    window.hasRunPrintAsIs = true;

    // Helper to pause execution
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 0. SAFETY DELAY
    // Wait for the popup to close completely (crucial for Android)
    await wait(600);

    // 1. Get Dimensions
    const totalHeight = document.documentElement.scrollHeight;
    const totalWidth = document.documentElement.scrollWidth;
    const dpr = window.devicePixelRatio || 1;

    // Scroll to top before capture
    window.scrollTo(0, 0);
    await wait(100);

    // 2. Try full-page capture with rect option (Firefox 82+)
    let finalImageData;

    try {
        const response = await browser.runtime.sendMessage({
            action: "capture_visible_tab",
            rect: {
                x: 0,
                y: 0,
                width: totalWidth,
                height: totalHeight
            },
            scale: dpr
        });

        if (response && response.error) {
            throw new Error(response.error);
        }

        if (response && response.dataUrl) {
            finalImageData = response.dataUrl;
        } else {
            throw new Error("No dataUrl in response");
        }
    } catch (e) {
        console.error("Full-page capture failed:", e);
        window.hasRunPrintAsIs = false;
        return;
    }

    // 3. Replace page with image & Print
    document.body.innerHTML = '';

    // Remove only styles and scripts from head, keep meta tags, title, etc.
    // const toRemove = document.head.querySelectorAll('style, link[rel="stylesheet"], script');
    // toRemove.forEach(el => el.remove());

    const imgElement = document.createElement('img');
    imgElement.src = finalImageData;
    imgElement.style.width = '100%';
    imgElement.style.height = 'auto';
    imgElement.style.display = 'block';

    const style = document.createElement('style');
    style.textContent = `
        @page { margin: 0; size: auto; }
        body { margin: 0; padding: 0; background: white; }
    `;

    // Update viewport meta if it exists, otherwise create it
    let viewportMeta = document.head.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = "viewport";
        document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = "width=device-width, initial-scale=1";

    // document.head.appendChild(style);
    document.body.appendChild(imgElement);

    await wait(500);


    window.print();
    await wait(500);
    location.reload();

})();
