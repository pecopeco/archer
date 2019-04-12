cc.Class({
    extends: cc.Component,

    properties: {
        arch: {
            default: null,
            type: cc.Sprite
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
        goal: {
            default: null,
            type: cc.Prefab
        }
    },

    addArrowPool: function () {
        // 预设同屏最多五根箭
        this.arrowPool = new cc.NodePool()
        let initCount = 5
        for (let i = 0; i < initCount; ++i) {
            this.arrowPool.put(cc.instantiate(this.arrow))
        }
    },

    addBreakArrow: function (node) {
        let newArrow = cc.instantiate(this.breakArrow)
        // 添加箭体
        node.addChild(newArrow)
    },

    delayAddArrow: function (node) {
        setTimeout(() => {
            this.addArrow(node)
        }, 1000)
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

    addGoalPool: function () {
        // 预设同屏最多五个目标物
        this.goalPool = new cc.NodePool()
        let initCount = 5
        for (let i = 0; i < initCount; ++i) {
            this.goalPool.put(cc.instantiate(this.goal))
        }
    },

    addGoal: function () {
        let newGoal = null;
        // 判断对象池中是否有空闲的对象
        if (this.goalPool.size() > 0) {
            newGoal = this.goalPool.get()
        } else { // 池中备用对象不够时，用 cc.instantiate 重新创建
            newGoal = cc.instantiate(this.goal)
        }
        // 添加箭体
        this.node.addChild(newGoal)
        // 设置目标物起始位置
        let startX = (newGoal.parent.width / 2) + (newGoal.width * newGoal.scale / 2)
        let startY = (Math.random() * newGoal.parent.height / 4) + (newGoal.parent.height / 4) - (newGoal.height / 2 * newGoal.scale)
        newGoal.setPosition(cc.v2(startX, startY))
        newGoal.getComponent('goal').main = this
    },

    addScore: function () {
        this.scorePoint += 10
        this.score.string = '得分: ' + this.scorePoint
    },

    onLoad: function () {
        // 得分
        this.scorePoint = 0
        // 添加节点
        this.addGoalPool()
        setInterval(() => {
            this.addGoal()
        }, 1500)
        // 添加箭体
        this.addArrowPool()
        this.addArrow(this.arch.getComponent('arch').node)
    },

    // called every frame
    update: function (dt) {
    },
});
