cc.Class({
    extends: cc.Component,

    properties: {
        scroll: {
            default: null,
            type: cc.ScrollView
        }
    },
    
    // 显示排行榜
    showTop: function () {
        this.scroll.node.active = true
    },

    // 隐藏排行榜
    hideTop: function () {
        this.scroll.node.active = false
    },

    // use this for initialization
    onLoad: function () {
    },
    // called every frame
    //update: function (dt) {
    //},
});
