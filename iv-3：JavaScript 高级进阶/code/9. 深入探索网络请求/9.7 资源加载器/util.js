// 获取资源
function fetchResource(url) {
  return fetch(url, {
    method: "get",
    responseType: "blob",
  })
    .then((res) => {
      // 小于200， 或者大于300
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.status + "," + res.statusText);
      }
      return res;
    })
    .then((res) => res.blob());
}

// 复制对象
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 生成blob的地址
function generateBlobUrl(blob) {
  return URL.createObjectURL(blob);
}

// 验证key，空key？ 重复的key?
function validateKey(resources) {
  let failed = false;
  // 空key检查
  const emptyKeys = resources.filter((r) => r.key == undefined || r.key == "");
  if (emptyKeys.length > 0) {
    failed = true;
    console.error("ResourceLoader validateKey: 资源都必须有key");
    return failed;
  }
  // 资源重复检查, 按照key分组
  const results = Object.create(null);
  resources.forEach((r) => {
    (results[r.key] = results[r.key] || []).push(r);
  });

  Object.keys(results).forEach((k) => {
    if (results[k].length > 1) {
      console.error(
        "key " + k + " 重复了," + results[k].map((r) => r.url).join(",")
      );
      failed = true;
    }
  });
  return failed;
}

// 版本比较
function compareVersion(v1 = "", v2 = "") {
  if (v1 == v2) {
    return 0;
  }
  const version1 = v1.split(".");
  const version2 = v2.split(".");
  const len = Math.max(version1.length, version2.length);

  while (version1.length < len) {
    version1.push("0");
  }
  while (version2.length < len) {
    version2.push("0");
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(version1[i]) || 0;
    const num2 = parseInt(version2[i]) || 0;
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

const noop = () => {};
