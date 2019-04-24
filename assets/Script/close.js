cc.Class({
    extends: cc.Component,

    properties: {
        scroll: {
            default: null,
            type: cc.ScrollView
        },
        item: {
            default: null,
            type: cc.Prefab
        }
    },
    
    // 添加排行榜数据
    addTop: function () {
        let newArrow = cc.instantiate(this.item)
        this.scroll.content.addChild(newArrow)
    },
    
    // 显示排行榜
    showTop: function () {
        this.scroll.node.active = true
    },

    // 隐藏排行榜
    hideTop: function () {
        this.scroll.node.active = false
    },

    // 获取数据

    getData: function () {
        let AV = window.SAVE.AV
        let Query = new AV.Query("Todo")
        Query.find().then( (data) => {
            var json = JSON.parse(JSON.stringify(data))
            console.log("云端数据为:")
            console.log(json)
            json.map((item, index) => {
                this.addTop()
                let label = this.scroll.content.children[index]
                label.children[0].getComponent(cc.Label).string = index + 1
                label.children[1].getComponent(cc.Label).string = item.name
                label.children[2].getComponent(cc.Label).string = item.score
                for (let i = 0; i < 3; i++) {
                    // label.children[index].getComponent(cc.Label).node.y = -100
                }
                label.y -= 30 * index
                console.log(label)
            })
        }, (err) => {
            //错误信息 err
        })
    },

    // use this for initialization
    onLoad: function () {
        this.getData()
    },
    // called every frame
    //update: function (dt) {
    //},
});
