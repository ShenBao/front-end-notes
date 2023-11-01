

/**
 * 文件分片
 * @param {*} file 文件
 * @param {*} chunkSize 分片大小
 * @returns 
 */
const handleFileChunk = function (file, chunkSize) {
    const fileChunkList = [];
    // 索引值
    let curIndex = 0;
    while (curIndex < file.size) {
        //最后一个切片以实际结束大小为准。
        const endIndex = curIndex + chunkSize < file.size ? curIndex + chunkSize : file.size;
        const curFileChunkFile = file.slice(curIndex, endIndex);
        curIndex += chunkSize;
        fileChunkList.push({ file: curFileChunkFile })
    }
    return fileChunkList;
};



