
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // 目标掉落
    setAction: function () {
        let xLength = xLength = 10 * this.node.getChildByName("arrow").rotation
        var jumpUp = cc.moveBy(0.2, cc.v2(xLength, 150)).easing(cc.easeCubicActionOut())
        var jumpDown = cc.moveBy(2, cc.v2(xLength, -2000)).easing(cc.easeCubicActionIn())
        var actionBy = cc.rotateBy(2, 360)
        // 同步执行旋转、移动，顺序执行先上升，后掉落
        return cc.spawn(actionBy, cc.sequence(jumpUp, jumpDown))
    },

    onLoad () {
        // 是否停止目标物从右往左移动
        this.stopMove = false
        // 防止重复添加箭体条件
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
        if (!shootArrow) return
        let arrowPosition = shootArrow.parent.convertToWorldSpaceAR(shootArrow.getPosition())
        let goalPosition = this.node.parent.convertToWorldSpaceAR(this.node.position)
        let distance = goalPosition.sub(arrowPosition).mag()
        if (distance < 60) {
            // 得分
            this.main.addScore()
            // 停止原箭体飞行
            shootArrow.getComponent('arrow').fly = false
            // 添加伪箭体到射中目标物
            if (!this.arrowAdded) {
                this.arrowAdded = true
                this.main.addArrow(this.node)
                // 设置目标物携带箭体大小、角度
                this.node.getChildByName("arrow").rotation = shootArrow.parent.rotation
                this.node.getChildByName("arrow").setPosition(this.node.convertToNodeSpaceAR(arrowPosition))
                this.node.getChildByName("arrow").scale = 0.68
                this.node.getChildByName("arrow").setSiblingIndex(5)
            }
            // 执行目标掉落动作
            this.stopMove = true
            this.node.runAction(this.setAction())
            // 销毁已射中原箭体，并1秒后在弓上添加新箭体
            shootArrow.destroy()
            setTimeout(() => {
                if (!this.main.arch.getComponent('arch').node.getChildByName("arrow")) {
                    this.main.addArrow(this.main.arch.getComponent('arch').node)
                }
                // 允许目标被多次射中
                // this.arrowAdded = false
            }, 1000)
            // 重建目标节点
            // this.main.addGoal()
            // this.node.destroy()
        }
        if (this.node.x < ((-this.node.parent.width / 2) - 100) || (this.node.y < ((-this.node.parent.height / 2) - 500))) {
            // 超出屏幕，重建目标节点
            this.main.addGoal()
            this.node.destroy()
        }
    },
});
