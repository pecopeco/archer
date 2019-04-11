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
        goal: {
            default: null,
            type: cc.Prefab
        }
    },

    addPool: function () {
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

    addGoal: function () {
        // 添加目标物
        this.newGoal = cc.instantiate(this.goal)
        this.node.addChild(this.newGoal)
        // 设置目标物起始位置
        this.newGoal.setPosition(cc.v2(380, 300))
        this.newGoal.getComponent('goal').main = this
    },

    addScore: function () {
        this.scorePoint += 10
        this.score.string = '得分: ' + this.scorePoint
    },

    onLoad: function () {
        // 目标节点
        this.newGoal
        // 得分
        this.scorePoint = 0
        // 添加节点
        this.addGoal()
        // 添加箭体
        this.addPool()
        this.addArrow(this.arch.getComponent('arch').node)
    },

    // called every frame
    update: function (dt) {
    },
});
