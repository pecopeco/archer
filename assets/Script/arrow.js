
cc.Class({
    extends: cc.Component,

    properties: {
        // 设置弓箭射出加速度
        accel: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 弓箭初始位置
        this.startX = this.node.x
        this.startY = this.node.y
        
        // 弓箭射出开关
        this.fly = false

        // 弓箭拉出垂直距离
        this.moveLength = 0

        // 弓箭拉出角度
        this.arrowRotation = 0
        
        //绑定触摸弓箭事件
        this.node.on('touchstart', (e) => {
        })
        // 拉动弓箭
        this.node.on('touchmove', (e) => {
            this.moveLength = e.getLocation().y - e.getStartLocation().y
            let x = e.getLocation().x - e.getStartLocation().x
            // 防止拉出屏幕或点击
            if (this.moveLength < -100 || this.moveLength > -10) return
            // 设置距离
            this.node.y = this.startY + this.moveLength
            // 设置角度
            this.arrowRotation = Math.atan(x / -200)*180/Math.PI
            this.node.rotation = this.arrowRotation
        })
        // 拉动后放手
        this.node.on('touchend', (e) => {
            if (this.moveLength > -10) return
            this.fly = true
        })
        // 拉动后放手
        this.node.on('touchcancel', (e) => {
            if (this.moveLength > -10) return
            this.fly = true
        })
    },

    start () {

    },

    update (dt) {
        // 弓箭开始飞行
        if (this.fly) {
            this.node.y += this.accel * dt
            this.node.x += this.arrowRotation * 60 * dt
        }

        // 弓箭飞出屏幕重置状态
        let getHeight = document.body.clientHeight
        if (this.node.y > getHeight + 80) {
            this.fly = false
            this.moveLength = 0
            this.arrowRotation = 0
            this.node.x = this.startX
            this.node.y = this.startY
            this.node.rotation = 0
        }
    },
});
