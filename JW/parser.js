function scheduleHtmlParser(html) {
    let result = []

    let kpatt = /[0-9]{8}&nbsp;(.*)\[[0-9]{2}\]/
    let wspatt = /([1-9][0-9]?)-([1-9][0-9]?)/

    let bbb = $('.mtt_arrange_item')

    for (let u = 0; u < bbb.length; u++) {
        let re = { sections: [], weeks: [] }

        let kcmc = $($(bbb[u]).find('.mtt_item_kcmc')).text()
        let teacher = $($(bbb[u]).find('.mtt_item_jxbmc')).text()
        let room = $($(bbb[u]).find('.mtt_item_room')).text().split(',')

        re.name = kpatt.exec(kcmc)[1]
        re.teacher = teacher
        re.day = room[1].replace('星期', '')
        re.position = room[3]

        let w = wspatt.exec(room[0])
        let weekBegin = Number(w[1])
        let weekEnd = Number(w[2])
        let isOdd = (room[0].indexOf('单') != -1)
        let isEven = (room[0].indexOf('双') != -1)
        for (let k = weekBegin; k <= weekEnd; k++) {
            if (isOdd && k % 2 == 0) {
                continue
            } else if (isEven && k % 2 != 0) {
                continue
            } else {
                re.weeks.push(k)
            }
        }

        let s = wspatt.exec(room[2])
        let sectionStart = Number(s[1])
        let sectionEnd = Number(s[2])
        for (let k = sectionStart; k <= sectionEnd; k++) {
            re.sections.push({
                section: k
            })
        }

        result.push(re)
    }
    
    let obj = {}
    result = result.reduce((cur,next) => {
        obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
        return cur;
    },[])

    console.log(result)

    return { courseInfos: result }
}