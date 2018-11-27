function playState() {}
const LEVEL_COUNT = 5;

playState.prototype = {
    init: function(data){
        game.stage.backgroundColor = '#070055';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        this.cursor =game.input.keyboard.createCursorKeys();
        this.level =(data.level || 0) % LEVEL_COUNT;
        console.log(data.level);
    },
    create: function(){
        this.cursor =game.input.keyboard.createCursorKeys();
        this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
        this._loadPlayer(this.game.cache.getJSON(`level:${this.level}`));
		
    },
    update: function() {  
        // Here we update the game 60 times per second
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player,this.enemies,this.restart,null,this);
        game.physics.arcade.collide(this.dopp, this.walls);
        game.physics.arcade.overlap(this.dopp,this.enemies,this.restart,null,this);
        game.physics.arcade.overlap(this.dopp,this.player,this.win,null,this);
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
    _loadLevel: function(data){
        
        this.walls = this.game.add.group();
        this.enemies = this.game.add.group();

        for(var i =0; i<data.level.length ;i++){
            for(var j=0; j<data.level[i].length; j++){
                if(data.level[i][j] == 'x'){
                    var wall = game.add.sprite(30+25*j,30+25*i,'wall');
                    this.walls.add(wall);
                    wall.body.immovable =true;
                }
                else if(data.level[i][j]=='!'){
                    var enemy = game.add.sprite(30+25*j,30+25*i,'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },
    _loadPlayer: function(data){
        this.player= game.add.sprite(data.playerStart.x,data.playerStart.y,'player');
        this.player.body.gravity.y =600;
		this.player.checkWorldBounds = true;
		this.player.events.onOutOfBounds.add(function(){
			this.restart();
		}, this);
        this.dopp = game.add.sprite(data.doppStart.x,data.doppStart.y,'player');
        this.dopp.body.gravity.y=600;
		this.dopp.checkWorldBounds = true;
		this.dopp.events.onOutOfBounds.add(function(){
			this.restart();
		}, this);
    },
    win: function(){
        game.state.restart(true, false, { level: this.level + 1 });
    },
    restart: function(){
        game.state.restart(true, false, { level: this.level });
    }

}