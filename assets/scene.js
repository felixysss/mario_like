export class scene extends Phaser.Scene
{
    constructor(){
        super("scene");
    }
    
    cursors;
    player;

    preload(){
        this.load.image("level",'assets/level.png');
        this.load.image("Phaser_tuilesdejeu",'assets/tuilesJeu.png');
        this.load.tilemapTiledJSON('carte', 'assets/map.json');
        this.load.spritesheet('perso','assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ennemi','assets/ennemi.png',
            {frameWidth: 32, frameHeight: 32});
    }
    
    create(){
        this.add.image(800,800,"level");
        this.player = this.physics.add.sprite(225, 0, 'perso');
        this.ennemy= this.physics.add.sprite(399, 0, 'ennemi');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.ennemy.setBounce(0.2);
        this.ennemy.setCollideWorldBounds(true);


        

        //tiled
        const carteDuNiveau= this.add.tilemap("carte");

        const tileset = carteDuNiveau.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        const calque_plateformes = carteDuNiveau.createLayer(
            "calque_plateformes",
            tileset
        );

        const calque_plateformes_2 = carteDuNiveau.createLayer(
            "calque_plateformes",
            tileset
        );

        calque_plateformes.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, calque_plateformes);
        this.physics.add.collider(this.ennemy, calque_plateformes);
        this.physics.add.collider(this.player, this.ennemy);

        //caméra
        this.physics.world.setBounds(0,0,1600,1600);
        this.cameras.main.setBounds(0,0,1600,1600);
        this.cameras.main.zoom= 5;
        this.cameras.main.startFollow(this.player);

        //clavier
        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 
        //anim
        this.anims.create({
            // la key c'est l'identifiant, tu la nomme comme tu veux
            key: 'left', 
            // ici le premier argument c'est le nom que t'as mis quand t'importe la spritesheet
            // le deuxième argument c'est pour dire a quel frame l'anim commence et end (ça commence a zero)
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 10,
            // le repeat en -1 c'est pour dire que ça loop (je crois)
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', {start:9,end:11}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', {start:9,end:11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'ennemi_idle',
            frames: this.anims.generateFrameNumbers('ennemi', {start:0,end:3}),
            frameRate: 7,
            repeat: -1
        });



    }

    update(){
        
        //---keyboard---);

        //c'est le perso qui bouge
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);  
        
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);

        }
        else{
            this.player.setVelocityX(0);
        }
        
        if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown)
        {
            this.player.anims.play('turn', true);
        }

        if (this.cursors.up.isDown&& this.player.body.blocked.down)
        {
            this.player.setVelocityY(-200);
            this.player.anims.play('up',true);
        }
        else if (this.cursors.down.isDown&& this.player.body.blocked.down)
        {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);

        }

        if (this.ennemy) {
            if (this.ennemy.x < 400) {
              this.ennemy.setVelocityX(80);
              this.ennemy.anims.play('ennemy_idle', true);
            } 
            else if (this.ennemy.x > 470) {
              this.ennemy.setVelocityX(-80);
              this.ennemy.anims.play('ennemy_idle', true);
            }
                
        }

    }


    //changeScene(player, trigger){
        //this.scene.start('sceneCroisement');
    //}
    
}