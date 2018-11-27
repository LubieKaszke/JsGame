function Boot() {};

var   gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;

Boot.prototype = {

    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }


}