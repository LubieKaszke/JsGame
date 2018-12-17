var WinState = function() {};



WinState.prototype = {
    menuConfig: {
        className: "inverse",
        startY: 400,
        startX: 400
      },
    init: function(){
    game.stage.backgroundColor = '#02001B';
    text = game.add.text(game.world.centerX, 200, "You Win!", titleStyle);
    },
    create: function(data){
        this.addMenuOption('Next stage', function () {
            playState.nextLevel;
            console.log("sdsa");
          });
    }
}

Phaser.Utils.mixinPrototype(WinState.prototype, mixins);