export class sceneMenu extends Phaser.Scene
{
    constructor(){
        super('sceneMenu');
        this.click = false;
    }
    preload(){
        this.load.image('menu','assets/menu.png');
    }
    create(){
        this.add.image(800,800,'menu');
        this.cameras.main.zoom= 1;

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
  if (this.cursors.space.isDown) {
    this.click = true;

    if (this.click == true) {
      this.cameras.main.fadeOut(900, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start("scene");
      })
    }
    this.click = false;
  }
}
    
};