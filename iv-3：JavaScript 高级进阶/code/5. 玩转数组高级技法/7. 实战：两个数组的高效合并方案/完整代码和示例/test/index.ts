import { mergeArray } from "../lib/array";

import * as data from "./data";

const { usersInfo, scoresInfo } = data;


const arr = mergeArray(usersInfo, scoresInfo, {
    sourceKey: "uid",
    targetKey: "uid",
    sKMap: {
        "score": "score.score",
        "comments": "score.comments",
        "stars": "stars"
    }
});

console.log("arr", arr);