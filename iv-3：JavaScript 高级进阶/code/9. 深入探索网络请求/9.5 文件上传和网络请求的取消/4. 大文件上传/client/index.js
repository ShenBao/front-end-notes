//设置默认切片大小为5M
const DefaultChunkSize = 5 * 1024 * 1024;

const start = async function (bigFile) {
    //生成多个切片
    const fileList = handleFileChunk(bigFile, DefaultChunkSize);
    //获取整个大文件的内容hash,方便实现秒传
    // const containerHash = await getFileHash(fileList);
    const containerHash = await getFileHash2(bigFile);
    //给每个切片添加辅助内容信息
    const chunksInfo = fileList.map(({ file }, index) => ({
        //整个文件hash
        fileHash: containerHash,
        //当前是第几个切片
        index,
        //文件个数
        fileCount: fileList.length,
        //当前切片的hash
        hash: containerHash + "-" + index,
        //切片内容
        chunk: file,
        //文件总体大小
        totalSize: bigFile.size,
        //单个文件大小
        size: file.size
    }));

    //上传所有文件
    uploadChunks(chunksInfo, bigFile.name);

};


/**
 * 
 * 获取全部文件内容hash
 * @param {any} fileList 
 */
async function getFileHash(fileList) {
    console.time("filehash")
    const spark = new SparkMD5.ArrayBuffer();
    //获取全部内容
    const result = fileList.map((item, key) => {
        return getFileContent(item.file)
    });
    try {
        const contentList = await Promise.all(result);
        for (let i = 0; i < contentList.length; i++) {
            spark.append(contentList[i]);
        }
        //生成指纹
        const res =  spark.end();
        console.timeEnd("filehash")
        return res;
    } catch (e) {
        console.log(e);
    }
}

/**
 * 
 * 获取全部文件内容hash
 * @param {any} fileList 
 */
async function getFileHash2(file) {

    console.time("filehash")
    const spark = new SparkMD5.ArrayBuffer();
    //获取全部内容
    const content = await getFileContent(file)
    try {
        spark.append(content);
        //生成指纹
        const result =  spark.end();
        console.timeEnd("filehash")
        return result;
    } catch (e) {
        console.log(e);
    }
}


/**
 * 
 * 获取文件内容
 * @param {any} file 
 * @returns 
 */
function getFileContent(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        //读取文件内容
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            //返回读取到的文件内容
            resolve(e.target.result);
        };
        fileReader.onerror = (e) => {
            reject(fileReader.error);
            fileReader.abort();
        };
    });
}

/**
 * 
 * 上传所有的分片
 * @param {any} chunks 
 * @param {any} fileName 
 */
async function uploadChunks(chunks, fileName) {
    const requestList = chunks
        .map(({ chunk, hash, fileHash, index, fileCount, size, totalSize }) => {
            //生成每个切片上传的信息
            const formData = new FormData();
            formData.append("hash", hash);
            formData.append("index", index);
            formData.append("fileCount", fileCount);
            formData.append("size", size);
            formData.append("splitSize", DefaultChunkSize);
            formData.append("fileName", fileName);
            formData.append("fileHash", fileHash);
            formData.append("chunk", chunk);
            formData.append("totalSize", totalSize);
            return { formData, index };
        })
        .map(async ({ formData, index }) =>
            singleRequest({
                url: "http://127.0.0.1:3000/uploadBigFile",
                data: formData,
            })
        );
    //全部上传
    await Promise.all(requestList);
}



/**
 * 
 * 单个文件上传
 * @param {any} {
 *     url,
 *     method="post",
 *     data,
 *     headers={},
 * } 
 * @returns 
 */
function singleRequest({
    url,
    method = "post",
    data,
    headers = {},
}) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
            xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
            resolve({
                data: e.target.response
            });
        };
    });
}



window.upload = {
    start: start
}