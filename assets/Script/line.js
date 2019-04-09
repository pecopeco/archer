
cc.Class({
    extends: cc.Component,

    properties: {
        arrow: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    update (dt) {
        let ctx = this.node.getComponent(cc.Graphics)
        let arrowX = this.arrow.position.x
        let arrowY = this.arrow.position.y - (this.arrow.height / 2) + 120
        if (arrowY > -219) {
            ctx.clear()
            ctx.moveTo(-738, -220)
            ctx.lineTo(742, -220)
            ctx.stroke()
        } else {
            ctx.clear()
            ctx.moveTo(-738, -220)
            ctx.lineTo(arrowX, arrowY)
            ctx.lineTo(742, -220)
            ctx.stroke()
        }
    },
});
