function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

    const ifrs = dom.getElementsByTagName("iframe");
    const frs = dom.getElementsByTagName("frame");

    if (ifrs.length) {
        for (let i = 0; i < ifrs.length; i++) {
            const dom = ifrs[i].contentWindow.document;
            iframeContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }
    }
    if (frs.length) {
        for (let i = 0; i < frs.length; i++) {
            const dom = frs[i].contentWindow.document;
            frameContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }
    }

    if (!ifrs.length && !frs.length) {
        return dom.querySelector('body').outerHTML
    }

    return dom.getElementsByTagName('html')[0].innerHTML + iframeContent + frameContent
}