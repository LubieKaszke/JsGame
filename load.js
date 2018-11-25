function Load(){}

Load.prototype ={

    preload: function() {
        game.load.image('player','assets/player.png');
        game.load.image('wall','assets/wall.png');
        game.load.image('enemy','assets/enemy.png');
        game.load.image('button','assets/menuButton.png');
    },
    create: function(){
        game.state.start('menu');
    }
}