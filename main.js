 // Create the state that will contain the whole game
 var mainState = {  
    preload: function() {  
        // Here we preload the assets
        game.load.image('player','assets/player.png');
        game.load.image('wall','assets/wall.png');
        game.load.image('enemy','assets/enemy.png');
    },

    create: function() {  
        // Here we create the game
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;


        this.cursor =game.input.keyboard.createCursorKeys();
        this.player= game.add.sprite(70,100,'player');
        this.player.body.gravity.y =600;
        this.dopp = game.add.sprite(400,100,'player');
        this.dopp.body.gravity.y=600;

        this.walls = game.add.group();
        this.enemies = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            'x         !          x',
            'x                    x',
            'x                    x',
            'x                    x',
            'x         !          x',
            'xxxxxxxxxxxxxxxxxxxxxx',
        ]

        for(var i =0; i<level.length ;i++){
            for(var j=0; j<level[i].length; j++){
                if(level[i][j] == 'x'){
                    var wall = game.add.sprite(30+20*j,30+20*i,'wall');
                    this.walls.add(wall);
                    wall.body.immovable =true;
                }
                else if(level[i][j]=='!'){
                    var enemy = game.add.sprite(30+20*j,30+20*i,'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },

    update: function() {  
        // Here we update the game 60 times per second
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player,this.enemies,this.restart,null,this);
        game.physics.arcade.collide(this.dopp, this.walls);
        game.physics.arcade.overlap(this.dopp,this.enemies,this.restart,null,this);
        game.physics.arcade.overlap(this.dopp,this.player,this.restart,null,this);
        //player
        if(this.cursor.left.isDown)
            this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown) 
            this.player.body.velocity.x = 200;
        else 
            this.player.body.velocity.x = 0;
        //doppelganger
        if(this.cursor.left.isDown)
            this.dopp.body.velocity.x = 200;
        else if (this.cursor.right.isDown) 
            this.dopp.body.velocity.x = -200;
        else 
            this.dopp.body.velocity.x = 0;

        if (this.cursor.up.isDown && this.player.body.touching.down) 
            this.player.body.velocity.y = -250;

            if (this.cursor.up.isDown && this.dopp.body.touching.down) 
            this.dopp.body.velocity.y = -250;
        
        


    },

    restart: function(){
        game.state.start('main');
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(500, 200);  
game.state.add('main', mainState);  
game.state.start('main');