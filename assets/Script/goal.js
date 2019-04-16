
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // 目标掉落
    setAction: function () {
        let xLength = xLength = 10 * this.node.getChildByName("break-arrow").rotation
        var jumpUp = cc.moveBy(0.15, cc.v2(xLength, 100)).easing(cc.easeCubicActionOut())
        var jumpDown = cc.moveBy(2, cc.v2(xLength, -2000)).easing(cc.easeCubicActionIn())
        let rotation = this.node.getChildByName("break-arrow").rotation > 0 ? 180 : -180
        let actionBy = cc.rotateBy(2, rotation)
        // 同步执行旋转、移动，顺序执行先上升，后掉落
        return cc.spawn(actionBy, cc.sequence(jumpUp, jumpDown))
    },

    onLoad () {
        // 是否停止目标物从右往左移动
        this.stopMove = false
        // 防止重复射落
        this.arrowAdded = false
        // 开启碰撞检测
        let manager = cc.director.getCollisionManager()
        manager.enabled = true
    },

    // 碰撞事件监听
    onCollisionEnter: function (other, self) {
        // 避免掉落后重复射击
        if (this.arrowAdded) return
        // 得分
        this.main.addScore(10)
        // 停止原箭体飞行
        other.getComponent('arrow').fly = false
        // 添加伪箭体到射中目标物
        // this.arrowAdded = true
        // 设置目标物携带伪箭体大小、角度
        let arrowPosition = other.node.parent.convertToWorldSpaceAR(cc.v2(other.node.getPosition().x, other.node.getPosition().y + ((other.node.height / 2) - 240)))
        let breakArrowRotation = other.node.parent.rotation
        let breakArrowScale = 0.21 * (1 / self.node.scale)
        let convertPosition = self.node.convertToNodeSpaceAR(arrowPosition)
        this.main.addBreakArrow(this.node, breakArrowRotation, breakArrowScale, convertPosition)
        // 停止目标物从右往左移动，执行掉落动作
        if (this.node.children.length >= 2) {
            this.main.addScore(50)
            this.stopMove = true
            self.node.runAction(this.setAction())
        }
        // 销毁已射中原箭体，并延迟添加新箭体到弓上
        other.node.destroy()
        this.main.delayAddArrow(this.main.arch.getComponent('arch').node)
    },

    start () {
    },

    update (dt) {
        // 目标物从右往左移动
        if (!this.stopMove) {
            this.node.x -= dt * 100
        }
        // 超出屏幕，销毁目标节点
        if (this.node.x < ((-this.node.parent.width / 2) - 100) || (this.node.y < ((-this.node.parent.height / 2) - 500))) {
            this.node.destroy()
        }
    },
});
