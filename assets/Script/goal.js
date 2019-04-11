
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // 目标掉落
    setAction: function () {
        let xLength = xLength = 10 * this.node.getChildByName("break-arrow").rotation
        var jumpUp = cc.moveBy(0.2, cc.v2(xLength, 150)).easing(cc.easeCubicActionOut())
        var jumpDown = cc.moveBy(2, cc.v2(xLength, -2000)).easing(cc.easeCubicActionIn())
        var actionBy = cc.rotateBy(2, 360)
        // 同步执行旋转、移动，顺序执行先上升，后掉落
        return cc.spawn(actionBy, cc.sequence(jumpUp, jumpDown))
    },

    onLoad () {
        // 是否停止目标物从右往左移动
        this.stopMove = false
        // 防止重复射落
        this.arrowAdded = false
    },

    start () {
    },

    update (dt) {
        // 目标物从右往左移动
        if (!this.stopMove) {
            this.node.x -= dt * 100
        }
        // 射中物体距离计算(统一坐标系)
        let shootArrow = this.main.arch.getComponent('arch').node.getChildByName("arrow")
        // 箭体被销毁、已经被射落不再执行射中逻辑
        if (shootArrow && !this.arrowAdded) {
            let arrowPosition = shootArrow.parent.convertToWorldSpaceAR(shootArrow.getPosition())
            let goalPosition = this.node.parent.convertToWorldSpaceAR(this.node.position)
            let distance = goalPosition.sub(arrowPosition).mag()
            if (distance < 80) {
                // 得分
                this.main.addScore()
                // 停止原箭体飞行
                shootArrow.getComponent('arrow').fly = false
                // 添加伪箭体到射中目标物
                this.arrowAdded = true
                this.main.addBreakArrow(this.node)
                // 设置目标物携带箭体大小、角度
                console.log(this.node)
                this.node.getChildByName("break-arrow").rotation = shootArrow.parent.rotation
                this.node.getChildByName("break-arrow").setPosition(this.node.convertToNodeSpaceAR(arrowPosition))
                this.node.getChildByName("break-arrow").scale = 0.68
                this.node.getChildByName("break-arrow").setSiblingIndex(5)
                // 执行目标掉落动作
                this.stopMove = true
                this.node.runAction(this.setAction())
                // 销毁已射中原箭体，并延迟添加新箭体
                shootArrow.destroy()
                this.main.delayAddArrow(this.main.arch.getComponent('arch').node)
                // 重建目标节点
                // this.main.addGoal()
                // this.node.destroy()
            }
        }
        // 超出屏幕，重建目标节点
        if (this.node.x < ((-this.node.parent.width / 2) - 100) || (this.node.y < ((-this.node.parent.height / 2) - 500))) {
            this.main.addGoal()
            this.node.destroy()
        }
    },
});
