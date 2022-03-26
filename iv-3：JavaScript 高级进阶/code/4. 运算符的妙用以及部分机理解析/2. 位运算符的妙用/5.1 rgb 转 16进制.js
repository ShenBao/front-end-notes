function colorRGBToHex(rgb) {
  // split 的参数可以是正则
  // "rgb(204,0,255)"
  const rgbArr = rgb.split(/[^\d]+/);
  // ['', '204', '0', '255', '']    
  const color = rgbArr[1] << 16 | rgbArr[2] << 8 | rgbArr[3];
  return "#" + color.toString(16);
}

console.log(colorRGBToHex("rgb(204,0,255)"));