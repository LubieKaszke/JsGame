var MainMenu = function() {};

MainMenu.prototype = {
  init: function () {
	game.stage.backgroundColor = '#3598db';
	titleStyle = { font: 'bold 60pt Revalia', fill: '#FDFFB5', align: 'center'},
	text = game.add.text(game.world.centerX, 100, "Game Title", titleStyle);
	text.anchor.set(0.5);
	this.optionCount = 1;
  },

  create: function () {
	// game.stage.disableVisibilityChange = true; 
	// var button=game.add.button(400, 300, 'button', this.startGame, this);
	game.stage.disableVisibilityChange = true;

    // game.add.sprite(0, 0, 'menu-bg');
    // game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
		this.game.state.start('play', true, false, {level: 0});
    });
    this.addMenuOption('How to Play', function () {
		this.game.state.start('play', true, false, {level: 2});
    });
	
	var playMusic= gameOptions.playMusic;
	var textmode = false;

	this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
	  playMusic = !playMusic;
	  target.text = playMusic ? 'Mute Music' : 'Play Music';
	  musicPlayer.volume = playMusic ? 1 : 0;
	});

	this.addMenuOption(textmode ? 'Mode : text' : 'Mode : grahpics', function (target) {
		textmode = !textmode;
		console.log(textmode);
		console.log("TO DO");
	  });
  
	
  },
  addMenuOption: function(text, callback) {
    var txt = game.add.text(30, (this.optionCount * 80) + 200, text, style.navitem.default);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem.default);
    });
    this.optionCount ++;
  },
};

Phaser.Utils.mixinPrototype(MainMenu.prototype, mixins);