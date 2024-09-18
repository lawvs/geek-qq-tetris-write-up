# 腾讯极客挑战赛第四期：鹅罗斯方块 Writeup

![image](https://user-images.githubusercontent.com/18554747/128751760-103b798b-295c-48b3-b1c1-d95973059c6b.gif)

[比赛地址](https://cloud.tencent.com/developer/competition/introduction/10015)

代码得分：`470544`

## 解题思路

搜索后可以发现一篇关于俄罗斯方块算法的文章 [El-Tetris – An Improvement on Pierre Dellacherie’s Algorithm | imake](https://imake.ninja/el-tetris-an-improvement-on-pierre-dellacheries-algorithm/)，并且文章附有使用样例和源码。

鹅罗斯方块和 [ielashi/eltetris: Tetris AI](https://github.com/ielashi/eltetris) 处理游戏的部分很接近，因此可以在简单适配后直接使用 ，后续进行调参和后续优化。

两个项目主要不同点在于棋盘和方块的存储方式不同，eltetris 采用了更难看懂但更节约内存的位存储，鹅罗斯方块采用了普通的二维数组存储，转换只要编写一个函数即可。

## 代码主流程

```
同时运行 eltetris 和鹅罗斯方块 ->

从鹅罗斯方块中获取新块，转换格式，喂给 eltetris ->

从 eltetris 中获取当前解，转换为移动操作，喂给鹅罗斯方块 ->

循环直达游戏结束 ->

从鹅罗斯方块中获取分数和操作序列 ->

手动在控制台上传分数
```

## 策略

由于堆叠方块越多，分数越高，因此调整 eltetris 的策略，在层数较低时优先使用不消行的操作，在层数叠高之后还原回默认策略。

由于鹅罗斯调整了出块策略增大了难度，eltetris 默认参数无法完全处理所有情况，在部分情况需要手动调整策略，提前把层数消低。

## 代码结构

```
.
├── README.md
├── build           // 运行后输出目录
│   ├── operate.txt // 操作记录
│   ├── score.txt   // 最终得分
│   └── upload.js   // 用于在控制台上传分数的脚本
├── package.json
├── src
│   ├── eltetris.cjs // 导出 eltetris 需要使用的接口
│   ├── eltetris.js  // 玄学调参部分和接口导出
│   ├── main.js      // 主流程
│   ├── mock.js      // 用于给 tetris mock 浏览器环境（window/canvas），避免 node 环境变量缺失报错
│   ├── tetris.js    // 导出 tetris 中的接口
│   └── utils.js     // 工具函数
├── tetris           // 鹅罗斯方块 源码
│   ├── main.js
│   ├── page-game.js
│   ├── page-intro.js
│   ├── tetris.config.js
│   ├── tetris.core.js
│   └── tetris.game.js
└── yarn.lock
```

## 赛事说明

腾讯极客挑战赛旨在为技术爱好者提供一个相互切磋、展示自我的舞台，并将“代码无所不能”的概念充分融入比赛中，每季度赛题形式均不同，比如解谜题、游戏闯关等，涵盖研发、安全、算法等各领域。

本期赛题“鹅罗斯方块”秉承了赛事一贯传统，“几乎无需写代码”，只需轻松玩几把俄罗斯方块，最后谁得分最高，谁就是冠军！

_腾讯员工请务必前往内部赛道-码客平台参赛（若仍选择外部赛道，则不参与排名及评奖）_

左移 （方向键 ←）

右移 （方向键 →）

旋转 （方向键 ↑）

下落一格 （方向键 ↓）

直接下落 （空格键）

暂停：Enter 键

重玩：Esc 键

悬停：Ctrl 键

游戏中，每下落 100 块，方块的下落速度增加一次。

当方块被消除时，玩家得分。所获得的分数与玩家一次性消除的行数，以及屏幕中已有的格子数有关。“富贵险中求”，在游戏中堆的方块越满，消除得分越高。

| 一次性消除的行数 | 得到分数        |
| ---------------- | --------------- |
| 1 行             | 已有格子数 × 1  |
| 2 行             | 已有格子数 × 3  |
| 3 行             | 已有格子数 × 6  |
| 4 行             | 已有格子数 × 10 |

例如：

现在屏幕中原有 120 个格子。下一个方块出现，此时屏幕上有 124 个格子。玩家控制这个方块一次性消除了两行，那么玩家这次得分就是：124 × 3 = 372 分。

## 参考文档

- [El-Tetris – An Improvement on Pierre Dellacherie’s Algorithm | imake](https://imake.ninja/el-tetris-an-improvement-on-pierre-dellacheries-algorithm/)
- [ielashi/eltetris: Tetris AI](https://github.com/ielashi/eltetris)
- [基于 Pierre Dellacherie 算法玩俄罗斯方块 | 青椒的博客](https://www.zhanghangkui.com/2020/09/03/tetris2/)
- [Charming2015/TetrisAI-By-Charming: 基于 Pierre Dellacherie 算法实现俄罗斯方块的人工智能](https://github.com/Charming2015/TetrisAI-By-Charming)
- [腾讯极客挑战赛第四期：鹅罗斯方块 规则分析与 Pierre Dellacherie 算法实现](https://segmentfault.com/a/1190000040460501)
- [Tetris AI – The (Near) Perfect Bot | Code My Road](https://codemyroad.wordpress.com/2013/04/14/tetris-ai-the-near-perfect-player/)
- [jhnns/rewire: Easy monkey-patching for node.js unit tests](https://github.com/jhnns/rewire)
- [Konano/geekTencent-4-Tetris](https://github.com/Konano/geekTencent-4-Tetris/)

## Licence

Use the AGPL-3.0-or-later license due to the use of [ielashi/eltetris](https://github.com/ielashi/eltetris).

NOTE: THE FILES UNDER `tetris` ARE COPYRIGHT TO Tencent Cloud.
