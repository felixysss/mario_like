import {scene} from "./assets/scene.js";
import {scene2} from "./assets/scene2.js";
import {sceneMenu} from "./assets/menu.js";


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
            gravity    : { y: 300 },
            debug: false
        }
    },
    
    scene: [sceneMenu, scene, scene2],
    pixelArt: true,


};
new Phaser.Game(config);