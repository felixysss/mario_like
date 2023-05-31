import {scene2} from './scene2.js';

export class scene extends Phaser.Scene
{
    ;
    
    constructor(){
        super("scene");

        this.game_over = false

        let lampadaire1 = {
            on: false
        }
        //let lampadaire2 = {
            //on: false
        //}

    }

    preload(){
        this.load.image("ded",'assets/gameover.png');
        this.load.image("danger",'assets/danger.png');
        this.load.image("level",'assets/lvl1.png');
        this.load.image("Phaser_tuilesdejeu",'assets/tileset.png');
        this.load.tilemapTiledJSON('carte', 'assets/map_rue.json');
        this.load.spritesheet('perso','assets/dude.png',
            { frameWidth: 87, frameHeight: 165 });
        this.load.spritesheet('ennemi','assets/bad.png',
            {frameWidth: 314, frameHeight: 456});
    }

    

 
    create(){
        
        var lampadaireOn = true

        this.add.image(4720,895,"level");
        this.add.text(250, 100, 'Hello World', { fontFamily: 'Times' });

        this.player = this.physics.add.sprite(250, 191, 'perso');

        this.player.canBeDetected = false;

        this.ennemy= this.physics.add.sprite(399, 191, 'ennemi');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.ennemy.setBounce(0.2);
        this.ennemy.setCollideWorldBounds(true);
        
        this.danger = this.physics.add.sprite(335,191,"danger");
        this.danger.body.allowGravity = false;
        this.danger.setImmovable(true);
        this.danger.setVisible(true);

        

        //tiled
        this.carteDuNiveau= this.add.tilemap("carte");

        this.tileset = this.carteDuNiveau.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        this.calque_plateformes = this.carteDuNiveau.createLayer(
            "calque_plateformes",
            this.tileset
        );

        this.calque_plateformes_2 = this.carteDuNiveau.createLayer(
            "calque_plateformes",
            this.tileset
        );

        this.tp = this.carteDuNiveau.createLayer(
            'tp',
            this.tileset
        );


        this.calque_plateformes.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.calque_plateformes);
        this.physics.add.collider(this.ennemy, this.calque_plateformes);
        //this.physics.add.collider(this.player, this.ennemy);

        //this.physics.add.overlap(this.player, this.ded, this.danger, this.toggleLampadaire, this.playerDetection, null, this);


        //caméra
        this.physics.world.setBounds(0,0,9449,1772);
        this.cameras.main.setBounds(0,0,9449,1772);
        this.cameras.main.zoom= 1;
        this.cameras.main.startFollow(this.player);

        this.tp.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.tp, this.player, this.changeScene, null, this);

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
        //this.anims.create({
            //key: 'ennemi_idle',
            //frames: this.anims.generateFrameNumbers('ennemi', {start:0,end:3}),
            //frameRate: 7,
            //repeat: -1
        //});

        this.ded = this.add.image(800,800,"ded");
        this.ded.setVisible(false);    
    }

    update(delta, time){
        if (this.game_over) {return;}
        


        if (delta % 100 == 0){
            if (this.danger.visible) {
              this.danger.setVisible(false);
              this.danger.setOffset(1000,1000);
              this.lampadaireOn = false;
            } else {
              this.danger.setVisible(true);
              this.danger.setOffset(0,0);
              this.lampadaireOn = true;
            }
        }    

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        //c'est le perso qui bouge
        if (this.keyQ.isDown)
        {
            this.player.setVelocityX(-400);
            this.player.anims.play('left', true);  
        
        }
        else if (this.keyD.isDown)
        {
            this.player.setVelocityX(400);
            this.player.anims.play('right', true);

        }
        else{
            this.player.setVelocityX(0);
        }
        
        if (!this.keyShift.isDown && !this.keyJump.isDown && !this.keyQ.isDown && !this.keyD.isDown)
        {
            this.player.anims.play('turn', true);
        }

        if (this.keyJump.isDown && this.player.body.blocked.down)
        {
            this.player.setVelocityY(-350);
            this.player.anims.play('up',true);
        }
        else if (this.keyShift.isDown&& this.player.body.blocked.down)
        {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);

        }






        if (this.ennemy) {
            if (this.ennemy.x < 400) {
              this.ennemy.setVelocityX(80);
              //this.ennemy.anims.play('ennemy_idle', true);
            } 
            else if (this.ennemy.x > 470) {
              this.ennemy.setVelocityX(-80);
              //this.ennemy.anims.play('ennemy_idle', true);
            }
                
        }

        if (this.physics.overlap(this.player, this.danger, () => this.toggleLampadaire(this.danger), null, this)&& this.danger.on) {
            this.player.canBeDetected = true;
                    console.log("klkjdlkgj");
                    this.killplayer();
        } else {
            this.player.canBeDetected = false;

        }

        //this.toggleLampadaire(this.danger);
        //this.playerDetection(this.player, this.danger);
        
    }
    
    changeScene(player, trigger){
        this.scene.start('scene2');
    }
    
   //overlapDanger(){
        
        //this.game_over=true;
        //console.log("overlapDanger ça marche");
    //}

    toggleLampadaire(){
        if (this.danger.on == true){
            this.danger.on = false;
            this.player.canBeDetected = false;
        } else {
            this.danger.on = true;
            this.player.canBeDetected = true;
        }
    }


    //playerDetection(player, danger){
        //console.log(this.player.canBeDetected);
       // if (this.player.canBeDetected){
       //     console.log("ça marche encore");
       //     this.killplayer();
      //  }
    //}
     
    killplayer(){
        this.game_over = true;
        console.log("ça marche");
        this.ded.setVisible(true);
        this.cameras.main.zoom= 1;
    }

}
//à faire = "vrai game over"