# [腾讯极客挑战赛第四期：鹅罗斯方块](https://cloud.tencent.com/developer/competition/introduction/10015)

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

## References

- [Charming2015/TetrisAI-By-Charming: 基于 Pierre Dellacherie 算法实现俄罗斯方块的人工智能](https://github.com/Charming2015/TetrisAI-By-Charming)
- [腾讯极客挑战赛第四期：鹅罗斯方块 规则分析与 Pierre Dellacherie 算法实现](https://segmentfault.com/a/1190000040460501)
- [Tetris AI – The (Near) Perfect Bot | Code My Road](https://codemyroad.wordpress.com/2013/04/14/tetris-ai-the-near-perfect-player/)
- [El-Tetris – An Improvement on Pierre Dellacherie’s Algorithm | imake](https://imake.ninja/el-tetris-an-improvement-on-pierre-dellacheries-algorithm/)
- [基于 Pierre Dellacherie 算法玩俄罗斯方块 | 青椒的博客](https://www.zhanghangkui.com/2020/09/03/tetris2/)
- [ielashi/eltetris: Tetris AI](https://github.com/ielashi/eltetris)

## Licence

Use the AGPL-3.0-or-later license due to the use of [ielashi/eltetris: Tetris AI](https://github.com/ielashi/eltetris).

NOTE: THE FILES UNDER `tetris` ARE COPYRIGHT TO Tencent Cloud.
