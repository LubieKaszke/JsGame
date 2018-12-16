function Load(){}

var   gameOptions = {
    playMusic: true
  },
  musicPlayer,music;

Load.prototype ={

    preload: function() {
            this.loadingBar = game.make.sprite(game.world.centerX,400,"loading");
            // game.load.image('player','assets/player.png');
            game.load.image('wall','assets/block.png');
            game.load.image('enemy','assets/enemy2.png');
            game.load.image('slime','assets/slime.png');
            game.load.image('bg','assets/bg.jpg');
            this.game.load.atlasJSONHash('player', 'assets/spritesheet.png', 'assets/sprites.json');
            this.game.load.atlasJSONHash('dopp', 'assets/spritesheet1.png', 'assets/sprites1.json');
            // game.load.image('loading','assets/loadingBar.png');
            this.game.load.json('level:0', 'data/level00.json');
            this.game.load.json('level:1', 'data/level01.json');
            this.game.load.json('level:2', 'data/level02.json');
            this.game.load.json('level:3', 'data/level03.json');
            this.game.load.json('level:4', 'data/level04.json');
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            game.load.audio('music', 'assets/music.mp3');
            this.time.advancedTiming =true;
            this.load.setPreloadSprite(this.loadingBar);
        },
    create: function(){
        // this.game.state.start('play', true, false, {level: 0});
        game.state.start('menu');
    },
    addGameMusic: function () {
        musicPlayer = game.add.audio('music');
        musicPlayer.loop = true;
        musicPlayer.play();
      }
}
