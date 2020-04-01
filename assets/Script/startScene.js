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
        user: {
            default: null,
            type: cc.Label
        },
		startBtn: {
            default: null,
            type: cc.Label
        },
        scroll: {
            default: null,
            type: cc.ScrollView
        }
    },

    postScore: function () {
        // 声明一个 Todo 类型
        let AV
        if (window.SAVE && window.SAVE.AV) {
            AV = window.SAVE.AV
        } else {
            // 正常引入方式
            // AV = require('leancloud-storage/dist/av-weapp-min')
            // 微信小游戏引入方式
            AV = require('leancloud-storage/dist/av-weapp-min')
            AV.init({
                appId: "v4Jsx81rnqnfEINFBDSi8UWq-MdYXbMMI",
                appKey: "L9EjMN8owFXcA8dHJONu7NVp"
            })
            window.SAVE = {
                AV: AV
            }
        }
        if (cc.sys.localStorage.getItem("id")) {
            var todo = AV.Object.createWithoutData('Todo', cc.sys.localStorage.getItem("id"))
        } else {
            // 新建一个 Todo 对象
            var Todo = AV.Object.extend('Todo')
            var todo = new Todo()
            if (cc.sys.localStorage.getItem("name")) {
                todo.set('name', cc.sys.localStorage.getItem("name"))
            }
        }
        if (cc.sys.localStorage.getItem("name")) {
            todo.set('score', Number(cc.sys.localStorage.getItem("score")))
            todo.save().then((todo) => {
                // 成功保存之后，执行其他逻辑.
                console.log('New object created with objectId: ' + todo.id)
                cc.sys.localStorage.setItem("id", todo.id)
            }, (error) => {
                // 异常处理
                console.log('错误信息:' + error.message)
            })
        }
    },
    
    // use this for initialization
    onLoad: function () {
        // 隐藏排行榜
        this.scroll.node.active = false
        // 更新本局得分
		if (window.Global) {
            this.score.string = '本局得分: ' + window.Global.score
            this.startBtn.string = '重新开始'
		} else {
            this.score.destroy()
        }
        // 更新历史得分
        if (cc.sys.localStorage.getItem("score")) {
            this.highScore.string = '历史最高得分: ' + cc.sys.localStorage.getItem("score")
        } else {
            this.highScore.destroy()
        }
        // 显示名字
        if (cc.sys.localStorage.getItem("name")) {
            this.user.string = cc.sys.localStorage.getItem("name")
        }
        // 数据存储
        this.postScore()
    }
})
