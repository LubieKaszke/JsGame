function Options(game) {};

Options.prototype = {
    
    menuConfig: {
        className: "inverse",
        startY: 260,
        startX: "center"
      },
  preload: function () {
  },

  create: function () {

    this.addMenuOption('<- Back', function () {
        game.state.start("menu");
      });

  }
};
Phaser.Utils.mixinPrototype(Options.prototype, mixins);