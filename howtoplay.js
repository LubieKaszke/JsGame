function HowToPlay(game) {};

HowToPlay.prototype = {
    
    menuConfig: {
        className: "base",
        startY: 100,
        startX: 200
      },
  preload: function () {
  },

  create: function () {
    var menuImage1 = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    var txt = game.add.text(game.world.centerX,game.world.centerY+100, 'Move with arrows', style.navitem.default);
    var txt2 = game.add.text(game.world.centerX,game.world.centerY-100, 'Join two orange puzzles together', style.navitem.inverse);
    txt.anchor.set(0.5);
    txt2.anchor.set(0.5);
    menuImage1.anchor.set(0.5);
       this.addMenuOption('Back', function () {
        game.state.start("menu");
      });

  },
  addMenuOption: function(text, callback) {
    var txt = game.add.text(game.world.centerX,game.world.centerY+200, text, style.navitem.default);
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
Phaser.Utils.mixinPrototype(HowToPlay.prototype, mixins);