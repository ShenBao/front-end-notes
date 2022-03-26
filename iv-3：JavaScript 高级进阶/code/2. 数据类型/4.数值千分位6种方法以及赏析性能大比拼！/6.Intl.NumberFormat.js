function format_with_Intl(number, minimumFractionDigits, maximumFractionDigits) {
    minimumFractionDigits = minimumFractionDigits || 2;
    maximumFractionDigits = (maximumFractionDigits || 2);
    maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

    return new Intl.NumberFormat('en-us', {
        maximumFractionDigits: maximumFractionDigits || 2,
        minimumFractionDigits: minimumFractionDigits || 2
    }).format(number)
}


// 使用默认配置选项
// function format_with_Intl(number) {
//     return new Intl.NumberFormat('en-us').format(number)
// }


const print = console.log;
print(format_with_Intl(938765432.02));