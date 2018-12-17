function playState() {}
const LEVEL_COUNT = 5;
var slimeState =false;
playState.prototype = {
    menuConfig: {
        className: "invert",
        startY: 400,
        startX: 400
      },
    init: function(data){
        game.stage.backgroundColor = '#070055';
        this.sky = this.add.tileSprite(0, 0, 800, 600, 'bg');
        this.sky.fixedToCamera = true;
        game.world.enableBody = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(400, 300, 800, 600);
        game.world.setBounds(0,0,2000,2000);
        this.cursor =game.input.keyboard.createCursorKeys();
        this.level =(data.level || 0) % LEVEL_COUNT;
        console.log(data.level);
        var chasing =false;
    },
    create: function(){
        game.scale.pageAlignHorizontally = true;		
        game.scale.pageAlignVertically = true;
        game.stage.smoothed = false;
        this.cursor =game.input.keyboard.createCursorKeys();
        var lvl = this.game.cache.getJSON(`level:${this.level}`);
        
        this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
        this._loadPlayer(this.game.cache.getJSON(`level:${this.level}`));
        if(lvl.slimeStart){
            this._loadSlime(this.game.cache.getJSON(`level:${this.level}`));
            slimeState=true;
        }else{
            slimeState =false;
        }
            
        
        
        
		
    },
    update: function() {  
        this.sky.tilePosition.y = -(this.camera.y * 0.7);
        // Here we update the game 60 times per second
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player,this.enemies,this.restart,null,this);
        game.physics.arcade.collide(this.dopp, this.walls);
        game.physics.arcade.overlap(this.dopp,this.enemies,this.restart,null,this);
        game.physics.arcade.overlap(this.dopp,this.player,this.win,null,this);

        //player
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
            this.player.animations.play('walk',true);
        }
            
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('walk',true);
            this.player.flipX = false;
        }
            
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.play('idle',true);
        }
            
        //doppelganger
        if(this.cursor.left.isDown){
            this.dopp.body.velocity.x = 200;
            this.dopp.animations.play('doppwalk',true);
        }
            
        else if (this.cursor.right.isDown) {
            this.dopp.body.velocity.x = -200;
            this.dopp.animations.play('doppwalk',true);
        }
            
        else {
            this.dopp.body.velocity.x = 0;
            this.dopp.animations.play('doppidle',true);
        }
            

        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
            this.dopp.animations.play('jump',true);
        }
            

            if (this.cursor.up.isDown && this.dopp.body.touching.down) {
                this.dopp.body.velocity.y = -250;
                this.player.animations.play('doppjump',true);
            }
                console.log(this.walls);
        //slime
        if(slimeState){
            
            game.physics.arcade.collide(this.slime,this.walls);
            game.physics.arcade.collide(this.player,this.slime, function(player,slime){
                if(slime.body.touching.up && player.body.touching.down){
                    slime.kill();
                }else{
                    game.state.restart(true, false, { level: this.level });
                }
            });

            game.physics.arcade.collide(this.dopp,this.slime, function(dopp,slime){
                if(slime.body.touching.up && dopp.body.touching.down){
                    slime.kill();
                }else{
                    game.state.restart(true, false, { level: this.level });
                }
            });

        if (Math.round(this.slime.y) == Math.round(this.player.y)) {
            if (Math.round(this.player.x) > Math.round(this.slime.x)) {
                // we increase the speed from the default 80 to 200
                this.slime.body.velocity.x = 200;
            } else {
                this.slime.body.velocity.x = -200;
            }
            chasing = true;
        }
     
        if(!chasing){
            if(this.slime.body.velocity.x > 0){
                this.slime.body.velocity.x = 80;
            }
        } }
     
            
    },
    _loadLevel: function(data){
        
        this.walls = this.game.add.group();
        this.enemies = this.game.add.group();

        for(var i =0; i<data.level.length ;i++){
            for(var j=0; j<data.level[i].length; j++){
                if(data.level[i][j] == 'x'){
                    var wall = game.add.sprite(30+35*j,30+35*i,'wall');
                    wall.scale.setTo(0.5);
                    this.walls.add(wall);
                    wall.body.immovable =true;
                }
                else if(data.level[i][j]=='!'){
                    var enemy = game.add.sprite(30+35*j,30+35*i,'enemy');
                    enemy.scale.setTo(0.5);
                    this.enemies.add(enemy);
                }
            }
        }
    },
    _loadPlayer: function(data){
        this.player= game.add.sprite(data.playerStart.x,data.playerStart.y,'player','p3_stand.png');
        this.player.scale.setTo(0.5);
        
        this.player.animations.add('walk',Phaser.Animation.generateFrameNames('p3_walk',1,11,'.png',2),30,true,false);
        this.player.animations.add('idle',['p3_stand.png'],10,true,false);
        this.player.animations.add('jump',['p3_jump.png'],30,true);
        game.camera.follow(this.player);
        this.player.body.gravity.y =600;
		this.player.checkWorldBounds = true;
		this.player.events.onOutOfBounds.add(function(){
			this.restart();
		}, this);
        this.dopp = game.add.sprite(data.doppStart.x,data.doppStart.y,'dopp','p1_stand.png');
        this.dopp.scale.setTo(0.5);
        this.dopp.animations.add('doppwalk',Phaser.Animation.generateFrameNames('p1_walk',1,11,'.png',2),30,true,false);
        this.dopp.animations.add('doppidle',['p1_stand.png'],10,true,false);
        this.dopp.animations.add('doppjump',['p1_jump.png'],30,true);
        this.dopp.body.gravity.y=600;
		this.dopp.checkWorldBounds = true;
		this.dopp.events.onOutOfBounds.add(function(){
			this.restart();
		}, this);
    },
    _loadSlime: function(data){
        this.slime = game.add.sprite(data.slimeStart.x,data.slimeStart.y,'slime');
        this.slime.body.gravity.y=600;
        this.slime.enableBody=true;
        this.slime.collideWorldBounds =true;
        this.slime.body.velocity.x=80;
        // this.slime.body.bounce.y =1;
        this.slime.body.bounce.x =1;
        this.slime.body.collideWorldBounds = true;
    


    },
    win: function(){
        game.state.restart(true, false, { level: this.level + 1 });
    },
    restart: function(){
        game.state.restart(true, false, { level: this.level });
    }

}

Phaser.Utils.mixinPrototype(playState.prototype, mixins);