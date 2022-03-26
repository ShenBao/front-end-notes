self.importScripts("./spark-md5.min.js");

//接受主进程发送过来的数据
self.onmessage = function (e) {
    const { fileChunkList } = e.data;
    getFileHash(fileChunkList).then((hash)=>{
        self.postMessage({
            hash: hash
          });
    }).catch(()=>{
        self.postMessage({
            error: "crate hash error"
          });
    })
};



/**
 * 
 * 获取全部文件内容hash
 * @param {any} fileList 
 */
 async function getFileHash(fileList){
    const spark = new SparkMD5.ArrayBuffer();
    const result=fileList.map((item,key)=>{
        return getFileContent(item.file)
    });

    try{
        const contentList=await Promise.all(result);
        for(let i=0;i<contentList.length;i++){
            spark.append(contentList[i]);
        }
        return spark.end();
    }catch(e){
        console.log(e);
    }
}

/**
 * 
 * 获取全部文件内容
 * @param {any} file 
 * @returns 
 */
function getFileContent(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        //读取文件内容
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        fileReader.onerror = (e) => {
            reject(fileReader.error);
            fileReader.abort();
        };
    });
}
