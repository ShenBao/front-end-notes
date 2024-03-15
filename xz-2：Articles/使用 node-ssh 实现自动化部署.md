# 使用 node-ssh 实现自动化部署

## node-ssh

这里主要依赖一个叫 node-ssh 的工具，它是一个用于通过 SSH 协议远程执行命令、传输文件的 Node.js 库。它在 ssh2 的基础上提供了更高级别的接口，可以让我们在 Node.js 中使用 SSH 变得更简单。

首先要安装一下，如果项目使用的 typescript 的话需要安装一下它的类型文件。

```bash
pnpm add node-ssh

# typescript
pnpm add @types/node-ssh
```

安装完成之后，就可以通过 node-ssh 和我们的服务器建立连接。

```js
import { NodeSSH } from "node-ssh";
import { deployConfig } from "./config.js";

async function deploy() {
  const ssh = new NodeSSH();

  await ssh.connect(deployConfig);
  const result = await ssh.execCommand("ls");
}

deploy();
```

在这里我们先通过 new NodeSSH 创建一个 ssh 实例，然后通过 connect 跟服务器建立连接。

deployConfig 中的内容主要是这些：

```js
export const deployConfig = {
  host: '服务器ip地址',
  username: '用户名',
  password: '服务器密码'
}
```

到这一步我们已经成功和服务器建立了连接，现在我们可以通过这个连接执行一个服务器上的命令，看一下效果。

```js
import { NodeSSH } from "node-ssh";
import { deployConfig } from "./config.js";

async function deploy() {
  const ssh = new NodeSSH();

  await ssh.connect(deployConfig);
  const result = await ssh.execCommand("ls");
  console.log(`result.stdout ==> ${result.stdout}`);
  console.log(`result.stderr ==> ${result.stderr}`);
  ssh.dispose();
}

deploy();
```

这里我们通过 execCommand 执行了一个 ls 命令，查看一下服务器上的目录，如果执行成功，他的结果会放在他的标准输出(stdout)中，如果执行遇到异常，则会将失败的结果也放在失败的信息中.


```js
import { NodeSSH } from "node-ssh";
import { deployConfig } from "./config.js";
import path from "path";

async function deploy() {
  const ssh = new NodeSSH();

  await ssh.connect(deployConfig);

  const result = await ssh.putDirectory(path.resolve("./dist"), "dist");
  console.log(result);
  ssh.dispose();
}

deploy();

```

## 实现自动化部署

```js
import { NodeSSH } from "node-ssh";
import { deployConfig } from "./config.js";
import path from "path";

async function deploy() {
  const ssh = new NodeSSH();

  await ssh.connect(deployConfig);

  const result = await ssh.execCommand("ls", {
    cwd: "var/www",
  });
  const isHasBackup = result.stdout.includes("dist.bak");
  if (isHasBackup) {
    await ssh.execCommand("rm -rf dist.bak", {
      cwd: "var/www",
    });
  }
  await ssh.execCommand("mv dist dist.bak", {
    cwd: "var/www",
  });

  await ssh.putDirectory(path.resolve("./dist"), "var/www/dist");
  ssh.dispose();
}

deploy();
```




