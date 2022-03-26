function format_with_toLocaleString(number, minimumFractionDigits, maximumFractionDigits) {
    minimumFractionDigits = minimumFractionDigits || 2;
    maximumFractionDigits = (maximumFractionDigits || 2);
    maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

    return number.toLocaleString("en-us", {
        maximumFractionDigits: maximumFractionDigits || 2,
        minimumFractionDigits: minimumFractionDigits || 2
    })
}


function format_with_toLocaleString(number) {
    return number.toLocaleString("en-us")
}


const print = console.log;
print(format_with_toLocaleString(938765432.02));