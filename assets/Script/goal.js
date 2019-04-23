
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // 目标被射中
    
    shootAction: function () {
        let xLength = 5 * this.node.getChildByName("break-arrow").rotation
        var jumpRight = cc.moveBy(0.5, cc.v2(xLength, 0)).easing(cc.easeCubicActionOut())
        var jumpUp = cc.moveBy(0.5, cc.v2(0, 30)).easing(cc.easeCubicActionOut())
        let light = cc.blink(0.1, 2)
        return cc.spawn(light, jumpRight, jumpUp)
    },

    // 目标掉落
    dropAction: function () {
        let xLength = xLength = 10 * this.node.children[this.node.children.length - 1].rotation
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
        // 为每种目标物单独设置掉落所需箭数、掉落分
        let dropNum, dropScore
        if (self.name.indexOf('chicken') !== -1) {
            dropNum = 1
            dropScore = 50
        } else if (self.name.indexOf('duck') !== -1) {
            dropNum = 1
            dropScore = 50
        } else if (self.name.indexOf('dinosaur') !== -1) {
            dropNum = 3
            dropScore = 100
        } else if (self.name.indexOf('fish') !== -1) {
            dropNum = 2
            dropScore = 80
        } else if (self.name.indexOf('cat') !== -1) {
            dropNum = 2
            dropScore = 80
        }
        // 得分
        this.main.addScore(10)
        // 停止原箭体飞行
        other.getComponent('arrow').fly = false
        // 设置目标物携带伪箭体大小、角度，添加伪箭体到射中目标物
        let arrowPosition = other.node.parent.convertToWorldSpaceAR(cc.v2(other.node.getPosition().x, other.node.getPosition().y + ((other.node.height / 2) - 240)))
        let breakArrowRotation = other.node.parent.rotation
        let breakArrowScale = 0.21 * (1 / self.node.scale)
        let convertPosition = self.node.convertToNodeSpaceAR(arrowPosition)
        this.main.addBreakArrow(this.node, breakArrowRotation, breakArrowScale, convertPosition)
        // 开始被射中动作
        if (this.node.children.length < dropNum) {
            self.node.runAction(this.shootAction())
        } else {
            // 到达掉落临界值，停止目标物从右往左移动，执行掉落动作
            this.arrowAdded = true
            this.main.addScore(dropScore)
            this.stopMove = true
            self.node.runAction(this.dropAction())
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
