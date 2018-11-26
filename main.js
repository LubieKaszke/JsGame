
var game = new Phaser.Game(900, 600, Phaser.AUTO, 'game');
game.state.add('boot', Boot);
game.state.add('load', Load);
game.state.add('menu', MainMenu);
game.state.add('play', playState);
game.state.start('boot');
