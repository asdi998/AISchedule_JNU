function scheduleHtmlParser(html) {

    let times = []
    let cid = []
    let result = []

    let cpatt = /(.*?)[\s]*课程：(.*?)[(]([0-9]*)[)]/g
    let wpatt = /([1-9][0-9]?)至([1-9][0-9]?)/
    let ppatt = /[(]?[校南华珠深][本校文海圳][部区学校][院区)]?/

    let table = $('table:not(:has(table))', '#oReportCell').last().find('tr')
    let sectionTable = table[2].children

    for (let u = 1; u < sectionTable.length; u++) {
        if (sectionTable[u].children[0].nodeType == 1) {
            let time = sectionTable[u].children[0].children[0].nodeValue.split('-')
            time = {
                section: u,
                startTime: time[0],
                endTime: time[1]
            }
            times.push(time)
        }
    }

    for (let u = 3; u <= 9; u++) {
        for (let i = 1; i <= times.length; i++) {
            if (table[u].children[i].children[0].nodeType != 1) {
                continue
            }

            let str = table[u].children[i].children[0].children[0].nodeValue
            let courses = str.match(cpatt)

            for (let c = 0; c < courses.length; c++) {
                cpatt.lastIndex = 0
                let isOdd = false
                let isEven = false
                let week = null
                let weekBegin = 1
                let weekEnd = 18
                let course = {
                    name: '',
                    position: '',
                    teacher: '',
                    weeks: [],
                    day: (u - 2).toString(),
                    sections: []
                }

                let infos = cpatt.exec(courses[c])
                let wp = infos[1].split(' ')
                course.position = wp[0]
                if (wp.length != 1) {
                    week = wpatt.exec(wp[0])
                    course.position = wp[1]
                    isOdd = (wp[0].indexOf('单') != -1)
                    isEven = (wp[0].indexOf('双') != -1)
                    if (week != null) {
                        weekBegin = Number(week[1])
                        weekEnd = Number(week[2])
                    }
                }

                for (let k = weekBegin; k <= weekEnd; k++) {
                    if (isOdd && k % 2 == 0) {
                        continue
                    } else if (isEven && k % 2 != 0) {
                        continue
                    } else {
                        course.weeks.push(k)
                    }
                }

                course.name = infos[2]
                course.position = course.position.replace(ppatt, '')
                course.sections.push({
                    section: i
                })

                let n = cid.indexOf(course.name + course.day + course.position)
                if (n == -1) {
                    cid.push(course.name + course.day + course.position)
                    result.push(course)
                } else {
                    result[n].sections.push({
                        section: i
                    })
                }
            }
        }
    }

    return {
        courseInfos: result,
        sectionTimes: times
    }
}