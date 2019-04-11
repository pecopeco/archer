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

    addArrow: function () {
        this.newArrow = cc.instantiate(this.arrow)
        this.arch.getComponent('arch').node.addChild(this.newArrow)
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
        this.addArrow()
    },

    // called every frame
    update: function (dt) {
        // 目标物从右往左移动
        this.newGoal.x -= dt * 100
    },
});
