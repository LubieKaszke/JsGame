var MainMenu = function() {};

MainMenu.prototype = {
  init: function () {
	game.stage.backgroundColor = '#070055';
	titleStyle = { font: 'bold 80px sans-serif', fill: '#ffffff', align: 'center'},
	text = game.add.text(game.world.centerX, 120, "JOIN ME", titleStyle);
	menuImage1 = game.add.sprite(230, 120, 'player');
	menuImage2 = game.add.sprite(670, 120, 'player');
	text.anchor.set(0.5);
	this.optionCount = 1;
  },

  create: function () {
	// game.stage.disableVisibilityChange = true; 
	// var button=game.add.button(400, 300, 'button', this.startGame, this);
	game.stage.disableVisibilityChange = true;
	
	menuImage1.anchor.setTo(0.5, 0.5);
	menuImage2.anchor.setTo(0.5, 0.5);

	
    this.addMenuOption('Start', function () {
		this.game.state.start('play', true, false, {level: 0});
    });
    this.addMenuOption('How to Play', function () {
		this.game.state.start('play', true, false, {level: 2});
    });
	
	var playMusic= gameOptions.playMusic;
	var textmode = 1;

	this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
	  playMusic = !playMusic;
	  target.text = playMusic ? 'Mute Music' : 'Play Music';
	  musicPlayer.volume = playMusic ? 1 : 0;
	});

	this.addMenuOption(textmode ? 'Mode : text' : 'Mode : grahpics', function (target) {
		textmode = !textmode;
		target.text = textmode ? 'Mode : text' : 'Mode : grahpics';
		console.log(textmode);
		console.log("TO DO");
	  });
  
	
  },
  update: function(){
	  menuImage1.angle++;
	  menuImage2.angle++;
  },

  addMenuOption: function(text, callback) {
		var txt = game.add.text(450, (this.optionCount * 60) + 300, text, style.navitem.default);
		txt.anchor.set(0.5);
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