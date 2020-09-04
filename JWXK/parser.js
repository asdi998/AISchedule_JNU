function scheduleHtmlParser(html) {
    let result = []

    let wspatt = /([1-9][0-9]?)-([1-9][0-9]?)/g

    let bbb = $('#myCourseTable .cv-right')

    for (let d = 0; d < 6; d++) {
        let re = { sections: [], weeks: [] }
        let course = $(bbb[d]).find('.cv-course-card-single')
        for (let i = 0; i < course.length; i++) {
            let course_info = course[i].children[0].children

            let ws = $(course_info[1]).text()
            re.name = $(course_info[0]).text().split('-')[0]
            re.position = $(course_info[2]).text()
            re.teacher = $(course_info[3]).text()
            re.day = (d+1).toString()

            wspatt.lastIndex = 0
            let w = wspatt.exec(ws)
            let weekBegin = Number(w[1])
            let weekEnd = Number(w[2])
            let isOdd = (ws.indexOf('单') != -1)
            let isEven = (ws.indexOf('双') != -1)
            for (let k = weekBegin; k <= weekEnd; k++) {
                if (isOdd && k % 2 == 0) {
                    continue
                } else if (isEven && k % 2 != 0) {
                    continue
                } else {
                    re.weeks.push(k)
                }
            }

            let s = wspatt.exec(ws)
            let sectionStart = Number(s[1])
            let sectionEnd = Number(s[2])
            for (let k = sectionStart; k <= sectionEnd; k++) {
                re.sections.push({
                    section: k
                })
            }
            result.push(re)
        }
    }
    console.log(result)

    return { courseInfos: result }
}