
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    update (dt) {
        // 射中物体距离计算(统一坐标系)
        let arrowPosition = this.main.arrow.parent.convertToWorldSpaceAR(this.main.arrow.getPosition())
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
    },
});
