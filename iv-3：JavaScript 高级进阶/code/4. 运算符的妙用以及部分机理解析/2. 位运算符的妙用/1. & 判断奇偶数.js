function checkNum(num) {
    const result = num & 1;
    if (result == 1) {
        console.log(num, "::是一个奇数")
        return;
    } else if (result === 0) {
        console.log(num, "::是一个偶数")
        return;
    }
    console.log(num, "::未识别")
}


checkNum(0);
checkNum(1);
checkNum(5);
checkNum(12);