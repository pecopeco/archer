cc.Class({
    extends: cc.Component,

    properties: {
		score: {
            default: null,
            type: cc.Label
        }
    },
    
    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('main')
    },
    
    //开始游戏
    startGame: function(){
        cc.director.loadScene ('main',function(){
            console.log('main is loaded')
        }) 
    },
    // called every frame
    //update: function (dt) {
    //},
});
