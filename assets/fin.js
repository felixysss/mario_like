export class sceneFin extends Phaser.Scene
{
    constructor(){
        super('sceneFin');
        this.click = false;
    }

    preload(){
        this.load.image('fin','assets/fin.png');
    }

    create(){
        this.add.image(800,450,'fin');
        this.cameras.main.zoom= 1;

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
  if (this.cursors.space.isDown) {
    this.click = true;

    if (this.click == true) {
      this.cameras.main.fadeOut(900, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start("sceneMenu");
      })
    }
    this.click = false;
  }
}

};