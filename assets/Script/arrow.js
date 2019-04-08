
cc.Class({
    extends: cc.Component,

    properties: {
        arch: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        // 弓箭初始位置
        this.startX = this.node.x
        this.startY = this.node.y

        // 弓箭射出开关
        this.fly = false

        // 弓箭拉出距离
        this.yLength = 0
        this.xLength = 0

        // 弓箭拉出角度
        this.arrowRotation = 0
        
        //绑定触摸弓箭事件
        this.node.on('touchstart', (e) => {
        })
        // 拉动弓箭
        this.node.on('touchmove', (e) => {
            this.yLength = e.getLocation().y - e.getStartLocation().y
            this.xLength = e.getLocation().x - e.getStartLocation().x
            // 防止拉出屏幕或点击就发射
            if (this.yLength < -180 || this.yLength > -10) return
            // 设置拉动角度
            this.arrowRotation = Math.atan(this.xLength / (this.yLength - 50)) * 180 / Math.PI
            this.node.parent.rotation = this.arrowRotation
            // 设置拉动距离
            this.node.y = this.startY + (this.yLength * 3) - ((Math.abs(this.arrowRotation) / 45) * 200)
        })
        // 拉动后放手
        this.node.on('touchend', (e) => {
            if (this.node.y > 260) return
            this.fly = true
        })
        // 拉动后放手
        this.node.on('touchcancel', (e) => {
            if (this.node.y > 260) return
            this.fly = true
        })
    },

    start () {

    },

    update (dt) {
        // 弓箭开始飞行
        if (this.fly) {
            this.node.y += 9000 * dt
            this.node.x += this.arrowRotation * dt
        }
        // 弓箭飞出屏幕重置状态
        if (this.node.y > 5000) {
            this.fly = false
            this.yLength = 0
            this.node.x = this.startX
            this.node.y = this.startY
        }
    },
});