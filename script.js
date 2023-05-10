import {scene} from "./assets/scene.js";

var config = 
{
    type: Phaser.AUTO,
        scale:{
            mode: Phaser.Scale.FIT,
            width: 1600, 
            height: 1600
    },
        
    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 300 },
            debug: true
        }
    },
    
    scene: [scene],
    pixelArt: true,


};
new Phaser.Game(config);