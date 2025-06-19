// wmmath.js Version 0.3.0 2024.5.2
// WMProject1217 Studios
function WMMath_abs(x) {
    // 求数的绝对值
    // (number)x 数
    // 返回 (number)
    if (x < 0) {
        return -x;
    } else {
        return x;
    }
}

function WMMath_FloatOffsetRX(x, offsav) {
    // 保留存在误差的浮点数的指定小数位数，如果处理完不足指定的小数位数，直接返回数字
    // (number)x 数
    // (unsigned short int) 小数位数
    // 返回 (number)
    offsavtx = offsav;
    tempsav = 10;
    while (offsavtx > 0) {
        tempsav = tempsav * 10;
        offsavtx = offsavtx - 1;
    }
    tempnev = parseInt(x * tempsav / 10);
    tempeto = parseInt((x - parseInt(x)) * tempsav);
    newdiffx = ((tempeto / 10) - parseInt(tempeto / 10)) * 10;
    if (newdiffx >= 5) {
        tempnev = parseInt(tempnev + 1);
    }
    return (tempnev * 10 / tempsav);
}

function WMMath_floor(x) {
    // 求不大于x的最大整数
    // (number)x 数
    // 返回 (long long int)
    if (x >= 0) {
        return parseInt(x);
    } else {
        if (parseInt(x) == x) {
            return x;
        } else {
            return (parseInt(x) - 1);
        }
    }
}

function WMMath_ceil(x) {
    // 求不小于x的最小整数
    // (number)x 数
    // 返回 (long long int)
    if (x <= 0) {
        return parseInt(x);
    } else {
        if (parseInt(x) == x) {
            return x;
        } else {
            return (parseInt(x) + 1);
        }
    }
}
