cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: null,
            type: cc.Label
        },
		startBtn: {
            default: null,
            type: cc.Label
        }
    },
    
    // use this for initialization
    onLoad: function () {
		if (window.Global) {
            this.score.string = '最终得分: ' + window.Global.score
            this.startBtn.string = '重新开始'
		} else {
            this.score.destroy()
        }
    }
});
