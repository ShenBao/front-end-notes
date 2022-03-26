const usersInfo = Array.from({ length: 200 }, (val, index) => {
    return {
        uid: `${index + 1}`,
        name: `user-name-${index}`,
        age: index + 10,
        avatar: `http://www.my-avatar.com/${index + 1}`
    }
});

const scoresInfo = Array.from({ length: 180 }, (val, index) => {
    return {
        uid: `${index + 1}`,
        score: ~~(Math.random() * 10000),
        comments: ~~(Math.random() * 10000),
        stars: ~~(Math.random() * 1000)
    }
});

console.log("模拟第一次请求数据：", usersInfo);
console.log("模拟第二次请求数据：", scoresInfo);