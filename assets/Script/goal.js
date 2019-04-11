
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    arrowMove (dt) {
        let shootArrow = this.main.arch.getComponent('arch').node.getChildByName("arrow")
        shootArrow.x -= dt * 400
        shootArrow.y -= shootArrow.getComponent('arrow').arrowRotation * dt * 7
    },

    onLoad () {
        this.arrowRun = false
    },

    start () {
    },

    update (dt) {
        let shootArrow = this.main.arch.getComponent('arch').node.getChildByName("arrow")
        // 射中物体距离计算(统一坐标系)
        let arrowPosition = shootArrow.parent.convertToWorldSpaceAR(shootArrow.getPosition())
        let goalPosition = this.node.parent.convertToWorldSpaceAR(this.node.position)
        let distance = goalPosition.sub(arrowPosition).mag()
        if (distance < 80) {
            // 得分，重建目标节点
            this.main.addScore()
            this.main.addGoal()
            this.node.destroy()
        }
        if (this.node.x < ((-this.node.parent.width / 2) - 100)) {
            // 超出屏幕，重建目标节点
            this.main.addGoal()
            this.node.destroy()
        }
        // 箭体跟随目标物移动
        // if (this.arrowRun) {
        //     this.arrowMove(dt)
        // }
    },
});
