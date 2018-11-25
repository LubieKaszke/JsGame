
var game = new Phaser.Game(500, 500);  
game.state.add('boot', Boot);
game.state.add('load', Load);
game.state.add('menu', MainMenu);
game.state.add('gamePlay', mainState);
game.state.start('boot');
