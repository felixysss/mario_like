import {scene2} from './scene2.js';
import {GameOver} from './game_over.js';

export class scene extends Phaser.Scene
{
    ;
    
    constructor(){
        super("scene");

        this.game_over = false
        this.crouch = false
        let lampadaire1 = {
            on: false
        }
        //let lampadaire2 = {
            //on: false
        //}

    }

    

    preload(){
        this.load.image("ded",'assets/gameover.png');

        this.load.image("danger",'assets/lamp.png');
        this.load.image("danger2",'assets/lamp.png');
        this.load.image("danger3",'assets/lamp.png');
        this.load.image("danger4",'assets/lamp.png');

        this.load.image("level",'assets/lvl1.png');
        this.load.image("Phaser_tuilesdejeu",'assets/tileset.png');
        this.load.tilemapTiledJSON('carte', 'assets/map_rue.json');
       
        this.load.spritesheet('perso','assets/dude.png',
            { frameWidth: 87, frameHeight: 165 });

        this.load.spritesheet('ennemi','assets/bad.png',
            {frameWidth: 314, frameHeight: 1000});
        this.load.spritesheet('ennemi2','assets/bad.png',
            {frameWidth: 314, frameHeight: 1000});
        this.load.spritesheet('ennemi3','assets/bad.png',
            {frameWidth: 314, frameHeight: 1000});

    }

    

 
    create(){

        console.log("aled")
        
        var lampadaireOn = true
        this.game_over = false;
        this.crouch = false;

        this.add.image(4720,895,"level");
        //this.add.text(250, 100, 'Hello World', { fontFamily: 'Times' });

        this.player = this.physics.add.sprite(9000, 1200, 'perso');

        this.player.canBeDetected = false;

        this.ennemy= this.physics.add.sprite(3499, 1100, 'ennemi');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.ennemy.setBounce(0.2);
        this.ennemy.setCollideWorldBounds(true);
        this.ebbe
        this.ennemy2= this.physics.add.sprite(5324, 1100, 'ennemi2');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.ennemy2.setBounce(0.2);
        this.ennemy2.setCollideWorldBounds(true);

        this.ennemy3= this.physics.add.sprite(7324, 1100, 'ennemi3');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.ennemy3.setBounce(0.2);
        this.ennemy3.setCollideWorldBounds(true);


        
        this.danger = this.physics.add.sprite(2725,1250,"danger");
        this.danger.body.allowGravity = false;
        this.danger.setImmovable(true);
        this.danger.setVisible(true);
        this.danger.setAlpha(0.5);

        this.danger2 = this.physics.add.sprite(4550,1250,"danger2");
        this.danger2.body.allowGravity = false;
        this.danger2.setImmovable(true);
        this.danger2.setVisible(true);
        this.danger2.setAlpha(0.5);

        this.danger3 = this.physics.add.sprite(6550,1250,"danger3");
        this.danger3.body.allowGravity = false;
        this.danger3.setImmovable(true);
        this.danger3.setVisible(true);
        this.danger3.setAlpha(0.5);

        this.danger4 = this.physics.add.sprite(8240,1250,"danger4");
        this.danger4.body.allowGravity = false;
        this.danger4.setImmovable(true);
        this.danger4.setVisible(true);
        this.danger4.setAlpha(0.5);
        

        

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
        this.physics.add.collider(this.ennemy2, this.calque_plateformes);
        this.physics.add.collider(this.ennemy3, this.calque_plateformes);
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
            frames: this.anims.generateFrameNumbers('perso', {start:9,end:9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', {start:10,end:10}),
            frameRate: 10,
            repeat: -1
        });
        //this.anims.create({
            //key: 'ennemi_idle',
            //frames: this.anims.generateFrameNumbers('ennemi', {start:0,end:3}),
            //frameRate: 7,
            //repeat: -1
        //});

        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier    

        this.ded = this.add.image(800,800,"ded");
        this.ded.setVisible(false); 
    }

    update(delta, time){


        if (this.game_over) {return;}
        //console.log(this.player.x);
        //console.log(this.player.y);

        if (delta % 200 == 0){
            if (this.danger.visible) {
              this.danger.setVisible(false);
              this.danger.setOffset(10000,10000);
              this.lampadaireOn = false;
            } else {
              this.danger.setVisible(true);
              this.danger.setOffset(0,0);
              this.lampadaireOn = true;
            }
        }    
        if (delta % 200 == 0){
            if (this.danger2.visible) {
              this.danger2.setVisible(false);
              this.danger2.setOffset(10000,10000);
              this.lampadaireOn = false;
            } else {
              this.danger2.setVisible(true);
              this.danger2.setOffset(0,0);
              this.lampadaireOn = true;
            }
        }    
        if (delta % 200 == 0){
            if (this.danger3.visible) {
              this.danger3.setVisible(false);
              this.danger3.setOffset(10000,10000);
              this.lampadaireOn = false;
            } else {
              this.danger3.setVisible(true);
              this.danger3.setOffset(0,0);
              this.lampadaireOn = true;
            }
        }    
        if (delta % 200 == 0){
            if (this.danger4.visible) {
              this.danger4.setVisible(false);
              this.danger4.setOffset(10000,10000);
              this.lampadaireOn = false;
            } else {
              this.danger4.setVisible(true);
              this.danger4.setOffset(0,0);
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
            this.player.setSize(0, 0);
            this.player.setVelocityX(-400);
            this.player.anims.play('left', true);  
        
        }
        else if (this.keyD.isDown)
        {
            this.player.setSize(0, 0);
            this.player.setVelocityX(400);
            this.player.anims.play('right', true);

        }
        else{
            this.player.setSize(0, 0);
            this.player.setVelocityX(0);
        }
        
        if (!this.keyShift.isDown && !this.keyJump.isDown && !this.keyQ.isDown && !this.keyD.isDown)
        {
            this.player.setSize(0, 0);
            this.player.anims.play('turn', true);
        }

        if (this.keyJump.isDown && this.player.body.blocked.down)
        {
            this.player.setSize(0, 0);
            this.player.setVelocityY(-350);
            this.player.anims.play('up',true);
        }
        else if (this.keyShift.isDown)
        {
            this.crouch=true;
            this.player.setSize(87, 101);
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);

        }

        if (this.ennemy) {
            if (this.ennemy.x < 3500) {
              this.ennemy.setVelocityX(80);
              //this.ennemy.anims.play('ennemy_idle', true);
            } 
            else if (this.ennemy.x > 4000) {
              this.ennemy.setVelocityX(-80);
              //this.ennemy.anims.play('ennemy_idle', true);
            }
                
        }
        if (this.ennemy2) {
            if (this.ennemy2.x < 5325) {
              this.ennemy2.setVelocityX(80);
              //this.ennemy.anims.play('ennemy_idle', true);
            } 
            else if (this.ennemy2.x > 5825) {
              this.ennemy2.setVelocityX(-80);
              //this.ennemy.anims.play('ennemy_idle', true);
            }
                
        }
        if (this.ennemy3) {
            if (this.ennemy3.x < 7325) {
              this.ennemy3.setVelocityX(80);
              //this.ennemy.anims.play('ennemy_idle', true);
            } 
            else if (this.ennemy3.x > 7525) {
              this.ennemy3.setVelocityX(-80);
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
        if (this.physics.overlap(this.player, this.danger2, () => this.toggleLampadaire(this.danger2), null, this)&& this.danger2.on) {
            this.player.canBeDetected = true;
                    console.log("klkjdlkgj");
                    this.killplayer();
        } else {
            this.player.canBeDetected = false;

        }

        if (this.physics.overlap(this.player, this.danger3, () => this.toggleLampadaire(this.danger3), null, this)&& this.danger3.on) {
            this.player.canBeDetected = true;
                    console.log("klkjdlkgj");
                    this.killplayer();
        } else {
            this.player.canBeDetected = false;

        }

        if (this.physics.overlap(this.player, this.danger4, () => this.toggleLampadaire(this.danger4), null, this)&& this.danger4.on) {
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

    //changeSceneMenu(){
        //this.scene.start('menu');
    //}
    
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
        this.scene.start("GameOver")
    }

}
//à faire = "vrai game over"