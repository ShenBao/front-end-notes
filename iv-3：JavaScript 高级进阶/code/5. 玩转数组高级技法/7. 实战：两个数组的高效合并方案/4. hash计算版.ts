import * as data from "./data.js";

const { usersInfo, scoresInfo } = data;

console.time("merge data")

const scoreMap = scoresInfo.reduce((obj, cur) => {
    obj[cur.uid] = cur;
    return obj;
}, Object.create(null));


const len = scoresInfo.length;
let count = 0;
let walkCount = 0;
for (let i = usersInfo.length - 1; i >= 0; i--) {
    const user:any = usersInfo[i];
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

console.log(`合并完毕：遍历次数${walkCount}, 实际命中次数${count}, 预期命中次数${len}`)

console.log(usersInfo);