function Load(){}

Load.prototype ={

    preload: function() {
        game.load.image('player','assets/player.png');
        game.load.image('wall','assets/wall.png');
        game.load.image('enemy','assets/enemy.png');
        game.load.image('button','assets/menuButton.png');
        this.game.load.json('level:0', 'data/level00.json');
        this.game.load.json('level:1', 'data/level01.json');
		this.game.load.json('level:2', 'data/level02.json');
		this.game.load.json('level:3', 'data/level03.json');
		this.game.load.json('level:4', 'data/level04.json');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function(){
        // this.game.state.start('play', true, false, {level: 0});
        game.state.start('menu');
    }
}