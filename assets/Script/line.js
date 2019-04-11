
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
        let shootArrow = this.node.parent.getChildByName("arrow")
        if (!shootArrow) return
        let ctx = this.node.getComponent(cc.Graphics)
        let arrowX = shootArrow.position.x
        let arrowY = shootArrow.position.y - (shootArrow.height / 2) + 120
        ctx.clear()
        ctx.moveTo(-738, -220)
        if (arrowY < -219) {
            ctx.lineTo(arrowX, arrowY)
        }
        ctx.lineTo(742, -220)
        ctx.stroke()
    },
});
