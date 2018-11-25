
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);


function preload() {
}

function create() {
    this.state.start("MainMenu");
}
