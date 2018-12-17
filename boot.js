var game = new Phaser.Game(1280, 700, Phaser.AUTO, 'game');

function Boot() {};

Boot.prototype = {

    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }


}