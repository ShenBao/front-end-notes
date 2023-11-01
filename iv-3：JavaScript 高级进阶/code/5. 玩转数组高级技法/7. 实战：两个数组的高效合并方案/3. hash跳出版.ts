import * as data from "./data.js";

const { usersInfo, scoresInfo } = data;

console.time("merge data")

const scoreMap = scoresInfo.reduce((obj, cur) => {
    obj[cur.uid] = cur;
    return obj;
}, Object.create(null));


// 被合并数据的条数
const len = scoresInfo.length;
// 已合并的条数
let count = 0;
// 已遍历的次数
let walkCount = 0;
for (let i = 0; i < usersInfo.length; i++) {
    const user: any = usersInfo[i];
    const score = scoreMap[user.uid];

    walkCount++;
    if (score != null) {
        count++
        user.score = score.score;
        user.comments = score.comments;
        user.stars = score.stars;

        if (count >= len) {
            break;
        }
    }
}

console.timeEnd("merge data");

console.log(`合并完毕:遍历次数${walkCount}, 实际命中次数${count}, 预期命中次数${len}`)
console.log(usersInfo);