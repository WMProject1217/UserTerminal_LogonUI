// wmtime.js Version 0.3.1 2024.1.13
// WMProject1217 Studios
const WMTime = {
    version: "0.3.1",
    CountMonthDayNumberAC: function(month, year) {
        // 获取A.C.中某年某个月的天数
        // (unsigned int)month 月
        // (long long int)year 年
        // 返回 (int)0/28/29/30/31
        if (month == 0) {
            return 31;
        } else if (month == 1) {
            if (year <= 0) {
                year = -year;
            }
            if (year >= 100) {
                if ((parseInt(year / 100)) == (year / 100)) {
                    if ((parseInt(year / 400)) == (year / 400)) {
                        return 29;
                    } else {
                        return 28;
                    }
                } else {
                    if ((parseInt(year / 4)) == (year / 4)) {
                        return 29;
                    } else {
                        return 28;
                    }
                }
            } else {
                if ((parseInt(year / 4)) == (year / 4)) {
                    return 29;
                } else {
                    return 28;
                }
            }
        } else if (month == 2) {
            return 31;
        } else if (month == 3) {
            return 30;
        } else if (month == 4) {
            return 31;
        } else if (month == 5) {
            return 30;
        } else if (month == 6) {
            return 31;
        } else if (month == 7) {
            return 31;
        } else if (month == 8) {
            return 30;
        } else if (month == 9) {
            return 31;
        } else if (month == 10) {
            return 30;
        } else if (month == 11) {
            return 31;
        } else {
            return 0;
        }
    },
    CountDayBetweenSC: function(timest, timeed) {
        // 计算S.C.中两个日期之间的天数
        // (unsigned long long int)timest = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42 起始日期
        // (unsigned long long int)timeed = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42 终止日期
        // 返回 (long long int)
        var stdsc = parseInt(timeed / 536870912) - parseInt(parseInt(timeed / 68719476736) * 128);
        var stmosc = parseInt(timeed / 68719476736) - parseInt(parseInt(timeed / 4398046511104) * 64);
        var stysc = parseInt(timeed / 4398046511104);
        var eddsc = parseInt(timest / 536870912) - parseInt(parseInt(timest / 68719476736) * 128);
        var edmosc = parseInt(timest / 68719476736) - parseInt(parseInt(timest / 4398046511104) * 64);
        var edysc = parseInt(timest / 4398046511104);
        var tempysc = stysc - edysc;
        if (stmosc >= edmosc) {
            tempmosc = stmosc - edmosc;
        } else {
            tempmosc = stmosc - edmosc + 64;
            tempysc = tempysc - 1;
        }
        if (stdsc >= eddsc) {
            tempdsc = stdsc - eddsc;
        } else {
            tempdsc = stdsc - eddsc + 128;
            tempmosc = tempmosc - 1;
        }
        if (tempmosc > 0) {
            tempmosc = tempmosc + 64;
            tempysc = tempysc - 1;
        }
        return parseInt((tempysc * 64 + tempmosc) * 128 + tempdsc);
    },
    CountDayBetweenSCStr: function(timest, timeed) {
        // 计算S.C.中两个日期之间的天数
        // (string)timest = "ysc/mosc/dsc" 起始日期
        // (string)timeed = "ysc/mosc/dsc" 终止日期
        // 返回 (long long int)
        var timestsplit = timeed.split("/");
        var stysc = parseInt(timestsplit[0]);
        var stmosc = parseInt(timestsplit[1]);
        var stdsc = parseInt(timestsplit[2]);
        var timeedsplit = timest.split("/");
        var edysc = parseInt(timeedsplit[0]);
        var edmosc = parseInt(timeedsplit[1]);
        var eddsc = parseInt(timeedsplit[2]);
        var tempysc = stysc - edysc;
        if (stmosc >= edmosc) {
            tempmosc = stmosc - edmosc;
        } else {
            tempmosc = stmosc - edmosc + 64;
            tempysc = tempysc - 1;
        }
        if (stdsc >= eddsc) {
            tempdsc = stdsc - eddsc;
        } else {
            tempdsc = stdsc - eddsc + 128;
            tempmosc = tempmosc - 1;
        }
        if (tempmosc > 0) {
            tempmosc = tempmosc + 64;
            tempysc = tempysc - 1;
        }
        return parseInt((tempysc * 64 + tempmosc) * 128 + tempdsc);
    },
    CountDayBetweenAC: function(estst, ested) {
        // 计算A.C.中两个日期之间的天数
        // (string)estst = "year/month/day" 起始日期
        // (string)ested = "year/month/day" 终止日期
        // 返回 (long long int)
        var eststsplit = estst.split("/");
        var yearst = parseInt(eststsplit[0]);
        var monthst = parseInt(eststsplit[1]);
        var dayst = parseInt(eststsplit[2]);
        var estedsplit = ested.split("/");
        var yeared = parseInt(estedsplit[0]);
        var monthed = parseInt(estedsplit[1]);
        var dayed = parseInt(estedsplit[2]);
        var days = 0;
        if (yearst <= yeared) {
            while (yearst < yeared || monthst < monthed || dayst < dayed) {
                dayst++;
                if (dayst >= this.CountMonthDayNumberAC(monthst, yearst)) {
                    monthst++;
                    dayst = 0;
                }
                if (monthst >= 12) {
                    yearst++;
                    monthst = 0;
                }
                days++;
            }
            return days;
        } else if (yearst > yeared) {
            while (yeared < yearst || monthed < monthst || dayed < dayst) {
                dayed++;
                if (dayed >= this.CountMonthDayNumberAC(monthed, yeared)) {
                    monthed++;
                    dayed = 0;
                }
                if (monthed >= 12) {
                    yeared++;
                    monthed = 0;
                }
                days++;
            }
            return -days;
        } else {
            return -2147483647;
        }
    },
    CountDateOverSC: function(standardtime, daynum) {
        // 计算S.C.中指定日期指定天数前或后的日期
        // (unsigned long long int)timest = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42 起始日期
        // (long long int)daynum 天数
        // 返回 (unsigned long long int)timeed = dsc * 2^29 + mosc * 2^36 + ysc * 2^42 终止日期
        var stdsc = parseInt(standardtime / 536870912) - parseInt(parseInt(standardtime / 68719476736) * 128);
        var stmosc = parseInt(standardtime / 68719476736) - parseInt(parseInt(standardtime / 4398046511104) * 64);
        var stysc = parseInt(standardtime / 4398046511104);
        stdsc = stdsc + daynum;
        while (stdsc < 0) {
            stmosc = stmosc - 1;
            stdsc = stdsc + 128;
            if (stmosc < 0) {
                stysc = stysc - 1;
                stmosc = stmosc + 64;
            }
        }
        while (stdsc >= 128) {
            stmosc = stmosc + 1;
            stdsc = stdsc - 128;
            if (stmosc >= 64) {
                stysc = stysc + 1;
                stmosc = stmosc - 64;
            }
        }
        var timex = stdsc * 536870912 + stmosc * 68719476736 + stysc * 4398046511104;
        return timex;
    },
    CountDateOverAC: function(standardtime, daynum) {
        // 计算A.C.中指定日期指定天数前或后的日期
        // (string)standardtime = "year/month/day" 起始日期
        // (long long int)daynum 天数
        // 返回 (string) = "year/month/day"
        if (daynum < 0) {
            daynum = -daynum;
            var stsplit = standardtime.split("/");
            var yearst = parseInt(stsplit[0]);
            var monthst = parseInt(stsplit[1]);
            var dayst = parseInt(stsplit[2]);
            var countdaynum = 0;
            while (countdaynum < daynum) {
                countdaynum = countdaynum + 1;
                if (dayst > 0) {
                    dayst = dayst - 1;
                } else {
                    monthst = monthst - 1;
                    if (monthst < 0) {
                        yearst = yearst - 1;
                        monthst = 11;
                    }
                    dayst = this.CountMonthDayNumberAC(monthst, yearst) - 1;
                }
            }
            return yearst + "/" + monthst + "/" + dayst;
        } else {
            var stsplit = standardtime.split("/");
            var yearst = parseInt(stsplit[0]);
            var monthst = parseInt(stsplit[1]);
            var dayst = parseInt(stsplit[2]);
            var countdaynum = 0;
            while (countdaynum < daynum) {
                countdaynum = countdaynum + 1;
                if (dayst < (this.CountMonthDayNumberAC(monthst, yearst) - 1)) {
                    dayst = dayst + 1;
                } else {
                    dayst = 0;
                    monthst = monthst + 1;
                    if (monthst > 11) {
                        monthst = 0;
                        yearst = yearst + 1;
                    }
                }
            }
            return yearst + "/" + monthst + "/" + dayst;
        }
    },
    SCInt2Str: function(sctimeint) {
        // 将一个S.C.时间戳转换为S.C.时间字符串
        // (unsigned long long int)sctimeint = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42
        // 返回 (string) = "ysc/mosc/dsc-hsc:msc:ssc:mssc"
        var mssc = parseInt(sctimeint) - parseInt(parseInt(sctimeint / 1024) * 1024);
        var ssc = parseInt(sctimeint / 1024) - parseInt(parseInt(sctimeint / 32768) * 32);
        var msc = parseInt(sctimeint / 32768) - parseInt(parseInt(sctimeint / 8388608) * 256);
        var hsc = parseInt(sctimeint / 8388608) - parseInt(parseInt(sctimeint / 536870912) * 64);
        var dsc = parseInt(sctimeint / 536870912) - parseInt(parseInt(sctimeint / 68719476736) * 128);
        var mosc = parseInt(sctimeint / 68719476736) - parseInt(parseInt(sctimeint / 4398046511104) * 64);
        var ysc = parseInt(sctimeint / 4398046511104);
        return ysc + "/" + mosc + "/" + dsc + "-" + hsc + ":" + msc + ":" + ssc + ":" + mssc;
    },
    SCStr2Int: function(sctimestr) {
        // 将一个S.C.时间字符串转换为S.C.时间戳
        // (string)sctimestr ="ysc/mosc/dsc-hsc:msc:ssc:mssc"
        // 返回 (unsigned long long int) = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42
        var sctimesplit = sctimestr.split("-");
        var ysc = parseInt(sctimesplit[0].split("/")[0]);
        var mosc = parseInt(sctimesplit[0].split("/")[1]);
        var dsc = parseInt(sctimesplit[0].split("/")[2]);
        var hsc = parseInt(sctimesplit[1].split(":")[0]);
        var msc = parseInt(sctimesplit[1].split(":")[1]);
        var ssc = parseInt(sctimesplit[1].split(":")[2]);
        var mssc = parseInt(sctimesplit[1].split(":")[3]);
        var wmtimenew = mssc + ssc * 1024 + msc * 32768 + hsc * 8388608 + dsc * 536870912 + mosc * 68719476736 + ysc * 4398046511104;
        return wmtimenew;
    },
    ACInt2Str: function(timeint) {
        // 将一个A.C.时间戳转换为A.C.时间字符串
        // (unsigned long long int)timeint
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var time = new Date(timeint);
        return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    },
    ACStr2Int: function(timestr) {
        // 将一个A.C.时间字符串转换为A.C.时间戳
        // (string)timestr = "year/month/day-hour:minute:second:millisecond"
        // 返回 (unsigned long long int)
        var esttimesplit = timestr.split("-");
        var yeared = parseInt(esttimesplit[0].split("/")[0]);
        var monthed = parseInt(esttimesplit[0].split("/")[1]);
        var dayed = parseInt(esttimesplit[0].split("/")[2]);
        var houred = parseInt(esttimesplit[1].split(":")[0]);
        var minuteed = parseInt(esttimesplit[1].split(":")[1]);
        var seconded = parseInt(esttimesplit[1].split(":")[2]);
        var milliseconded = parseInt(esttimesplit[1].split(":")[3]);
        let date = new Date(yeared + "-" + (monthed + 1) + "-" + (dayed + 1) + " " + houred + ":" + minuteed + ":" + seconded + "." + milliseconded);
        var time = date.getTime();
        return time;
    },
    AC2SC: function(esttime) {
        // 将一个A.C.时间转换为S.C.时间戳
        // (string)esttime = "year/month/day-hour:minute:second:millisecond"
        // 返回 (unsigned long long int) = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42
        var esttimesplit = esttime.split("-");
        var yeared = parseInt(esttimesplit[0].split("/")[0]);
        var monthed = parseInt(esttimesplit[0].split("/")[1]);
        var dayed = parseInt(esttimesplit[0].split("/")[2]);
        var houred = parseInt(esttimesplit[1].split(":")[0]);
        var minuteed = parseInt(esttimesplit[1].split(":")[1]);
        var seconded = parseInt(esttimesplit[1].split(":")[2]);
        var milliseconded = parseInt(esttimesplit[1].split(":")[3]);
        var timesc = this.CountDayBetweenAC("1616/11/16", yeared + "/" + monthed + "/" + dayed);
        timesc = timesc * 24 * 60 * 60;
        timesc = timesc + (houred - 7) * 60 * 60 + (minuteed - 12) * 60 + seconded;
        timesc = timesc * 1000 + milliseconded;
        var mssc = ((timesc / 1024 - parseInt(timesc / 1024)) * 1024);
        timesc = parseInt(timesc / 1024);
        var ssc = ((timesc / 32 - parseInt(timesc / 32)) * 32);
        timesc = parseInt(timesc / 32) + 12;
        var msc = ((timesc / 256 - parseInt(timesc / 256)) * 256);
        timesc = parseInt(timesc / 256) + 7;
        var hsc = ((timesc / 64 - parseInt(timesc / 64)) * 64);
        timesc = parseInt(timesc / 64) + 17;
        var dsc = ((timesc / 128 - parseInt(timesc / 128)) * 128);
        timesc = parseInt(timesc / 128) + 12;
        var mosc = ((timesc / 64 - parseInt(timesc / 64)) * 64);
        timesc = parseInt(timesc / 64);
        var ysc = timesc + 1616;
        var wmtimenew = mssc + ssc * 1024 + msc * 32768 + hsc * 8388608 + dsc * 536870912 + mosc * 68719476736 + ysc * 4398046511104;
        return wmtimenew;
    },
    SC2AC: function(sctime) {
        // 将一个S.C.时间戳转换为A.C.时间，需要wmmath.js中的函数
        // (unsigned long long int)sctime = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var mssced = parseInt(sctime) - parseInt(parseInt(sctime / 1024) * 1024);
        var ssced = parseInt(sctime / 1024) - parseInt(parseInt(sctime / 32768) * 32);
        var msced = parseInt(sctime / 32768) - parseInt(parseInt(sctime / 8388608) * 256);
        var hsced = parseInt(sctime / 8388608) - parseInt(parseInt(sctime / 536870912) * 64);
        var dsced = parseInt(sctime / 536870912) - parseInt(parseInt(sctime / 68719476736) * 128);
        var mosced = parseInt(sctime / 68719476736) - parseInt(parseInt(sctime / 4398046511104) * 64);
        var ysced = parseInt(sctime / 4398046511104);
        var timeac = this.CountDayBetweenSCStr("1616/12/17", ysced + "/" + mosced + "/" + dsced);
        timeac = timeac * 64 * 256 * 32;
        timeac = timeac + (hsced - 7) * 256 * 32 + (msced - 12) * 32 + ssced;
        timeac = timeac * 1024 + mssced;
        var millisecond = (timeac / 1000 - parseInt(timeac / 1000)) * 1000;
        timeac = parseInt(timeac / 1000);
        var second = (timeac / 60 - parseInt(timeac / 60)) * 60;
        timeac = parseInt(timeac / 60) + 12;
        var minute = (timeac / 60 - parseInt(timeac / 60)) * 60;
        timeac = parseInt(timeac / 60) + 7;
        var hour = (timeac / 24 - parseInt(timeac / 24)) * 24;
        timeac = parseInt(timeac / 24);
        return this.CountDateOverAC("1616/11/16", timeac) + "-" + WMMath_FloatOffsetRX(hour, 0) + ":" + WMMath_FloatOffsetRX(minute, 0) + ":" + WMMath_FloatOffsetRX(second, 0) + ":" + WMMath_FloatOffsetRX(millisecond, 0);
    },
    GetNowTimeACInt: function() {
        // 获取当前的A.C.时间戳
        // 返回 (unsigned long long int)
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000).getTime();
        return time;
    },
    GetNowTimeACLocalInt: function() {
        // 获取当前的E.S.T.时间戳
        // 返回 (unsigned long long int)
        var time = new Date().getTime();
        return time;
    },
    GetNowTimeSCInt: function() {
        // 将当前的A.C.时间转换为S.C.时间戳
        // 返回 (unsigned long long int)sctimeint = mssc + ssc * 2^10 + msc * 2^15 + hsc * 2^23 + dsc * 2^29 + mosc * 2^36 + ysc * 2^42
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
        return this.AC2SC(time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds());
    },
    GetNowTimeACStr: function() {
        // 获取当前的A.C.时间
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
        return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    },
    GetNowTimeACLocalStr: function() {
        // 获取当前的E.S.T.时间
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var time = new Date();
        return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    },
    GetNowTimeSCStr: function() {
        // 将当前的A.C.时间转换为S.C.时间字符串
        // 返回 (string) = "ysc/mosc/dsc-hsc:msc:ssc:mssc"
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
        return this.SCInt2Str(this.AC2SC(time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds()));
    },
    GetNowTimeAC: function() {
        // 获取当前的A.C.时间，此函数用作兼容保留
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
        return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    },
    GetNowTimeACLocal: function() {
        // 获取当前的E.S.T.时间，此函数用作兼容保留
        // 返回 (string) = "year/month/day-hour:minute:second:millisecond"
        var time = new Date();
        return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    },
    GetNowTimeSC: function() {
        // 将当前的A.C.时间转换为S.C.时间字符串，此函数用作兼容保留
        // 返回 (string) = "ysc/mosc/dsc-hsc:msc:ssc:mssc"
        var offsetGMT = new Date().getTimezoneOffset();
        var localDate = new Date().getTime();
        var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
        return this.SCInt2Str(this.AC2SC(time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds()));
    }
}
