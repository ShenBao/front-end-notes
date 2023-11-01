const fse = require("fs-extra");
const path = require("path");

/**
 * 读流,写流
 * @param path
 * @param writeStream
 * @returns
 */
const pipeStream = (path, writeStream) =>
    new Promise((resolve) => {
        const readStream = fse.createReadStream(path);
        readStream.on("end", () => {
            // fse.unlinkSync(path);
            resolve(null);
        });
        readStream.pipe(writeStream);
    });

/**
 * 
 * 合并所有切片
 * @export
 * @param {any} {
 *     filePath:文件路径包含后缀名
 *     fileHash:文件hash
 *     chunkDir:切片存放的临时目录
 *     splitSize:每个切片的大小
 *     fileCount:文件总个数
 *     totalSize:文件总大小
 * } 
 * @returns 
 */
export async function chunkMerge({
    filePath,
    fileHash,
    chunkDir,
    splitSize,
    fileCount,
    totalSize,
}) {
    const chunkPaths = await fse.readdir(chunkDir);
    //帅选合适的切片
    const filterPath = chunkPaths.filter((item) => {
        return item.includes(fileHash);
    });
    //数量不对，抛出错误
    if (filterPath.length !== fileCount) {
        console.log("合并错误");
        return;
    }
    // 根据切片下标进行排序,方便合并
    filterPath.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    await Promise.all(
        chunkPaths.map((chunkPath, index) => {
            //并发写入，需要知道开始和结束位置
            let end = (index + 1) * splitSize;
            if (index === fileCount - 1) {
                end = totalSize + 1;
            }
            return pipeStream(
                path.resolve(chunkDir, chunkPath),
                // 指定位置创建可写流
                fse.createWriteStream(filePath, {
                    start: index * splitSize,
                    end: end,
                })
            );
        })
    );
    //删除所有切片
    // fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
    return filePath;
}


/**
 * 
 * 检查切片是否可以合并
 * @export
 * @param {any} pathName 切片存储目录
 * @param {any} totalCount 大文件包含切片个数
 * @param {any} hash 大文件hash
 * @returns 
 */
export function checkFileIsMerge(pathName, totalCount, hash) {
    var dirs = [];
    //同步读取切片存储目录
    const readDir = fse.readdirSync(pathName);
    //判断目录下切片数量 小于 总切片数，不能合并
    if (readDir && readDir.length < totalCount) return false;
    //获取目录下所有真正属于该文件的切片，以大文件hash为准
    (function iterator(i) {
        if (i == readDir.length) {
            return;
        }
        const curFile = fse.statSync(path.join(pathName, readDir[i]));
        //提出目录和文件名不包含大文件hash的文件
        if (curFile.isFile() && readDir[i].includes(hash + "")) {
            dirs.push(readDir[i]);
        }
        iterator(i + 1);
    })(0);
    //数量一致，可以合并
    if (dirs.length === totalCount) {
        return true;
    }
    return false;
}


