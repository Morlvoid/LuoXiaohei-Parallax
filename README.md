# 项目名称
LuoXiaohei Parallax Interaction.
让罗小黑在网页中对你眨眼摇头的视差小玩具。
<img width="400" alt="image" src="https://github.com/user-attachments/assets/860f0a87-7b52-41c2-8456-93e7180df248" />


## 功能特性
- 多层视差：鼠标移动时，背景、前景以不同速度移动，产生立体感。
- 点击眨眼：点击屏幕任意位置，角色会快速眨眼。
- 自动眨眼：每隔 3~8 秒随机自动眨眼，更加生动。
- 摇头触发：快速晃动鼠标或手指，角色会摇头晃脑。
- 响应式设计：适配手机和电脑屏幕。

## 技术栈
- HTML5
- CSS3（Flexbox、动画、响应式）
- JavaScript（原生）
- Parallax.js 视差库

## IP
罗小黑战记

## 快速开始
克隆本仓库。<br>
打开 index.html 即可运行。

## 自定义指南
替换图片：将 test0.png ~ test3.png 替换为你自己的 PNG 素材（需透明背景）。<br>
调整视差深度：修改 HTML 中 data-depth 属性值，数值越大移动越快。<br>
修改眨眼速度：在 script.js 中调整 setTimeout 的时间（单位毫秒）。<br>
修改晃动灵敏度：修改 shakeThreshold（次数阈值）和 moveThreshold（单次移动距离阈值）。

## 许可证
MIT
