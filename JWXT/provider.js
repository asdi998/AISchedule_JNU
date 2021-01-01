function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    const tables = dom.getElementById('mainFrame').contentWindow.document.getElementById('rightIFrame').contentWindow.document.getElementById('ReportFrameReportViewer1').contentWindow.document.getElementById('report').contentWindow.document.getElementById('oReportCell').getElementsByTagName('table')

    return tables[tables.length - 1].outerHTML
}