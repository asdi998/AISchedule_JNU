function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    const tables = dom.getElementsByClassName('wut_table')

    return tables[0].outerHTML
}