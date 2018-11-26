var MainMenu = function() {};

MainMenu.prototype = {
  init: function () {
	game.stage.backgroundColor = '#3598db';
	titleStyle = { font: 'bold 60pt Revalia', fill: '#FDFFB5', align: 'center'},
	text = game.add.text(game.world.centerX, 100, "Game Title", titleStyle);
	text.anchor.set(0.5);
  },

  create: function () {
	game.stage.disableVisibilityChange = true; 
	var button=game.add.button(400, 300, 'button', this.startGame, this);
  },
  startGame: function(){
	this.game.state.start('play', true, false, {level: 0});
  }
};