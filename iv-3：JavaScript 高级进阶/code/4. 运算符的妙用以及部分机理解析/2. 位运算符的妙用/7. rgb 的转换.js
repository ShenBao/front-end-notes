
function colorRGBToHex(rgb){
    const rgbArr = rgb.split(/[^\d]+/);
    const color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3];
    return "#"+color.toString(16);
}

// "#CC00FF"
function colorHexToRGB(hex){
    // 转为6位的16进制 0xCC00FF
    let newHex = hex.replace("#","0x"),
        r = newHex >> 16,
        g = newHex >> 8 & 0xff,
        b = newHex & 0xff;
    return "rgb("+r+","+g+","+b+")";
}

console.log(colorHexToRGB("#CC00FF"));

console.log(colorRGBToHex("rgb(204,0,255)"));


// console.log(0xCC00FF >> 16)
// console.log(0xCC00FF >> 8)
// console.log(0xCC00FF >> 0)