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
        }
    },

    postScore: function () {
        // 声明一个 Todo 类型
        let AV
        if (window.SAVE && window.SAVE.AV) {
            AV = window.SAVE.AV
        } else {
            AV = require('leancloud-storage')
            AV.init("2kq3azst6ToDirUHcGqAdnNp-gzGzoHsz", "lUAeHSFwalgva7GU4vpRT6Lo")
            window.SAVE = {
                AV: AV
            }
        }
        if (window.ID && window.ID.ID) {
            var todo = AV.Object.createWithoutData('Todo', window.ID.ID);
        } else {
            // 新建一个 Todo 对象
            var Todo = AV.Object.extend('Todo')
            var todo = new Todo()
            if (cc.sys.localStorage.getItem("name")) {
                todo.set('name', cc.sys.localStorage.getItem("name"))
            }
        }
        if (cc.sys.localStorage.getItem("name")) {
            todo.set('score', cc.sys.localStorage.getItem("score"))
            todo.save().then(function (todo) {
                // 成功保存之后，执行其他逻辑.
                console.log('New object created with objectId: ' + todo.id)
                window.ID = {
                    ID: todo.id
                }
            }, function (error) {
                // 异常处理
                console.error('Failed to create new object, with error message: ' + error.message)
            })
        }
    },
    
    // use this for initialization
    onLoad: function () {
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
