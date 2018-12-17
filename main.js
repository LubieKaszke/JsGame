
game.state.add('boot', Boot);
game.state.add('load', Load);
game.state.add('menu', MainMenu);
game.state.add('how', HowToPlay);
// game.state.add('gameOver', GameOver);
game.state.add('play', playState);
game.state.start('boot');

