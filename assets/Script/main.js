cc.Class({
    extends: cc.Component,

    properties: {
        arch: {
            default: null,
            type: cc.Sprite
        },
        time: {
            default: null,
            type: cc.Label
        },
        score: {
            default: null,
            type: cc.Label
        },
        arrow: {
            default: null,
            type: cc.Prefab
        },
        breakArrow: {
            default: null,
            type: cc.Prefab
        },
        goal1: {
            default: null,
            type: cc.Prefab
        },
        goal2: {
            default: null,
            type: cc.Prefab
        },
        goal3: {
            default: null,
            type: cc.Prefab
        },
        goal4: {
            default: null,
            type: cc.Prefab
        },
        goal5: {
            default: null,
            type: cc.Prefab
        }
    },

    addBreakArrowPool: function () {
        // 预设同屏最多五根箭
        this.breakArrowPool = new cc.NodePool()
        let initCount = 5
        for (let i = 0; i < initCount; ++i) {
            this.breakArrowPool.put(cc.instantiate(this.breakArrow))
        }
    },

    addBreakArrow: function (node, rotation, scale, convertPosition) {
        let newArrow = null;
        // 判断对象池中是否有空闲的对象
        if (this.breakArrowPool.size() > 0) {
            newArrow = this.breakArrowPool.get()
        } else { // 池中备用对象不够时，用 cc.instantiate 重新创建
            newArrow = cc.instantiate(this.breakArrow)
        }
        // 添加箭体
        newArrow.rotation = rotation
        newArrow.scale = scale
        newArrow.setPosition(convertPosition)
        node.addChild(newArrow)
    },

    addArrowPool: function () {
        // 预设同屏最多五根箭
        this.arrowPool = new cc.NodePool()
        let initCount = 5
        for (let i = 0; i < initCount; ++i) {
            this.arrowPool.put(cc.instantiate(this.arrow))
        }
    },

    addArrow: function (node) {
        let newArrow = null;
        // 判断对象池中是否有空闲的对象
        if (this.arrowPool.size() > 0) {
            newArrow = this.arrowPool.get()
        } else { // 池中备用对象不够时，用 cc.instantiate 重新创建
            newArrow = cc.instantiate(this.arrow)
        }
        // 添加箭体
        node.addChild(newArrow)
    },

    delayAddArrow: function (node) {
        setTimeout(() => {
            if (!node.getChildByName("arrow")) {
                this.addArrow(node)
            }
        }, 100)
    },

    addGoal: function () {
        // 随机添加目标物
        this.addGoalTime = setInterval(() => {
            let maxNum = 5
            let goalIndex = Math.round(Math.random() * (maxNum - 1)) + 1
            let goal = this['goal' + goalIndex]
            let newGoal = cc.instantiate(goal)
            this.node.addChild(newGoal)
            // 设置目标物起始位置
            let startX = (this.node.width / 2) + (newGoal.width * newGoal.scale / 2)
            let startY = (Math.random() * this.node.height / 4) + (this.node.height / 4) - (newGoal.height / 2 * newGoal.scale)
            newGoal.setPosition(cc.v2(startX, startY))
            newGoal.getComponent('goal').main = this
        }, 1500)
    },

    timing: function () {
        let timeLine = 60
        let timeout = setInterval(() => {
            if (timeLine === 0) {
                this.pause()
                clearInterval(timeout)
                return
            }
            timeLine -= 1
            this.time.string = '倒计时: ' + timeLine
        }, 1000)
    },

    pause: function () {
        window.Global = {
			score: this.scorePoint
		}
        cc.director.loadScene ('start', function(){})
        clearInterval(this.addGoalTime)
    },

    // start: function () {
    // },

    addScore: function (num) {
        this.scorePoint += num
        this.score.string = '得分: ' + this.scorePoint
    },

    onLoad: function () {
        // 开始倒计时
        this.timing()
        // 得分
        this.scorePoint = 0
        // 添加目标物
        this.addGoal()
        // 添加箭体
        this.addBreakArrowPool()
        this.addArrowPool()
        this.addArrow(this.arch.getComponent('arch').node)
    },

    // called every frame
    update: function (dt) {
    },
});
