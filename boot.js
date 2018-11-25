function Boot() {};

Boot.prototype = {


    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }


}