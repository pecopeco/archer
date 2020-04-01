# 弓箭射击游戏（移动端）

### [https://pecopeco.github.io/archer/](https://pecopeco.github.io/archer/)

基于cocos creater，游戏主程序使用js编写<br>
main控制游戏主逻辑，main下主要有三个节点：弓、箭和目标物，箭和目标物为prefab预置资源，放入对象池可重复生成和销毁<br>
每个节点有自己的生成和动作逻辑<br>

### 安装依赖

npm install leancloud-storage --save

### 发布

发布h5游戏需修改 startScene.js 中 leancloud-storage 的引入方式