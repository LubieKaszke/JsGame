var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

function Boot() {};

Boot.prototype = {

    preload: function() {
        this.game.load.image('loading','assets/loadingBar.png');
    },

    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#070055';
        game.state.start('load');
    }


}