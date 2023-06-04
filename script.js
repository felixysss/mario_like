import {scene} from "./assets/scene.js";
import {scene2} from "./assets/scene2.js";
import {sceneMenu} from "./assets/menu.js";
import { GameOver } from "./assets/game_over.js";
import { sceneFin } from "./assets/fin.js";


var config = 
{
    type: Phaser.AUTO,
        scale:{
            mode: Phaser.Scale.FIT,
            width: 1600, 
            height: 900
    },
        
    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity    : { y: 300 },
            debug: true
        }
    },
    
    scene: [sceneMenu, scene, scene2, GameOver, sceneFin],
    pixelArt: true,


};
new Phaser.Game(config);