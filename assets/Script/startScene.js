cc.Class({
    extends: cc.Component,

    properties: {
        highScore: {
            default: null,
            type: cc.Label
        },
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
            this.score.string = '本局得分: ' + window.Global.score
            this.startBtn.string = '重新开始'
		} else {
            this.score.destroy()
        }
        if (cc.sys.localStorage.getItem("score")) {
            this.highScore.string = '历史最高得分: ' + cc.sys.localStorage.getItem("score")
        } else {
            this.highScore.destroy()
        }
    }
});
