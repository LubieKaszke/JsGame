var menuState1 = {

    create: function() {

    game.add.tileSprite(0, 0, 800, 600, 'background');

    var group = game.add.group();

    var button = game.make.button(game.world.centerX - 95, 400, 'button', this.removeGroup, this, 2, 1, 0);

    button.onInputOver.add(this.over, this);
    button.onInputOut.add(this.out, this);

    // game.input.onDown.addOnce(removeGroup, this);

    group.add(button);
    },

    removeGroup: function() {

    game.world.remove(group);

    // group.destroy();

    },

    over: function() {
    console.log('button over');
    },

    out: function() {
    console.log('button out');
    },

    actionOnClick: function() {

    console.log('button clicked');

    }
}