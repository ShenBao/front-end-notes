import * as data from "./data.js";

const { usersInfo, scoresInfo } = data;

console.time("merge data")
for (let i = 0; i < usersInfo.length; i++) {
    var user: any = usersInfo[i];
    for (let j = 0; j < scoresInfo.length; j++) {
        var score = scoresInfo[j];
        if (user.uid == score.uid) {
            user.score = score.score;
            user.comments = score.comments;
            user.stars = score.stars;
        }
    }
}
console.timeEnd("merge data")
console.log(usersInfo);