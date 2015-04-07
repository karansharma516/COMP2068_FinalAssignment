/// <reference path="states/level3.ts" />
/// <reference path="objects/bee.ts" />
/**
File: game.ts
Author: Karan Sharma and Chandan Dadral
Description: This game Nemo Fighter is created with the extensive use of javascript.
At the begining of the game user will see the two buttons, one is for the instructions
which tells the user how to play this game and about the controls and other button is
to selct the player of the game. Once user select his player then game will start and
it displays the score board at the top of the screen and also displays the message
When player wins or lost.
Last Modified : March 19, 2015

*/
/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="objects/electric.ts" />
/// <reference path="objects/background2.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="constants.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="states/level2.ts" />
/// <reference path="objects/barry.ts" />
/// <reference path="objects/missles.ts" />
/// <reference path="objects/coins.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="states/level3.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="states/gameplay.ts" />
// Game Variables
var stats = new Stats();
var canvas;
var stage;
var assetLoader;
var textureAtlas;
var fontAtlas;
// Score Variables
var finalScore = 0;
var highScore = 0;
var score;
var finalText;
var index;
var bullets = [];
var bullet;
// state variables
var currentState;
var currentStateFunction;
var stateChanged = false;
var scoreboard;
var lives = 5;
var scores = 0;
// Game Objects
var gameOver;
var menu;
var instruction;
var level_2;
var level_3;
var playGame;
// asset manifest - array of asset objects
var manifest = [
    { id: "background", src: "assets/images/background.png" },
    { id: "background2", src: "assets/images/background2.png" },
    { id: "background3", src: "assets/images/background4.png" },
    { id: "mainMenuSound", src: "assets/audio/mainMenu.mp3" },
    { id: "lifeUpSound", src: "assets/audio/lifeUp.mp3" },
    { id: "buttonHover", src: "assets/audio/hover.mp3" },
    { id: "explosionSound", src: "assets/audio/Explosion.mp3" },
    { id: "coinSound", src: "assets/audio/coin_collect.mp3" },
    { id: "backSound", src: "assets/audio/backsound.mp3" },
    { id: "buttonClick", src: "assets/audio/buttonClick.mp3" },
];
var imageData = {
    "images": ["assets/images/atlas.png"],
    "frames": [
        [704, 2, 80, 81],
        [786, 2, 80, 81],
        [332, 89, 20, 7],
        [2, 89, 31, 30],
        [35, 89, 31, 30],
        [68, 89, 31, 30],
        [101, 89, 31, 30],
        [134, 89, 31, 30],
        [167, 89, 31, 30],
        [200, 89, 31, 30],
        [233, 89, 31, 30],
        [266, 89, 31, 30],
        [299, 89, 31, 30],
        [2, 2, 60, 85],
        [64, 2, 60, 85],
        [126, 2, 60, 85],
        [188, 2, 60, 85],
        [250, 2, 60, 85],
        [312, 2, 60, 85],
        [374, 2, 60, 85],
        [436, 2, 60, 85],
        [498, 2, 60, 85],
        [560, 2, 60, 85],
        [1374, 2, 120, 49],
        [1374, 53, 120, 49],
        [1240, 2, 120, 49],
        [622, 2, 80, 82],
        [868, 2, 80, 81],
        [950, 64, 220, 56],
        [704, 85, 92, 40],
        [950, 2, 86, 60],
        [1038, 2, 200, 51],
        [1172, 55, 200, 51]
    ],
    "animations": {
        "bee": {
            "frames": [0, 1],
            "speed": .08
        },
        "bullet": [2],
        "coins": {
            "frames": [3, 5, 6, 7, 8, 9, 10, 11, 12, 4],
            "speed": .30
        },
        "enemy": {
            "frames": [13, 15, 16, 17, 18, 19, 20, 21, 22, 14],
            "speed": .10
        },
        "electric": {
            "frames": [23, 24, 25],
            "speed": .10
        },
        "barry": {
            "frames": [26, 27],
            "speed": 0.10
        },
        "instructionButton": [28],
        "missles": [29],
        "okButton": [30],
        "tryAgainButton": [31],
        "playButton": [32]
    }
};
var fontData = {
    "images": ["assets/fonts/fontAtlas.png"],
    "frames": [
        [2, 350, 62, 82],
        [434, 86, 40, 81],
        [75, 183, 59, 82],
        [132, 267, 59, 81],
        [370, 86, 62, 80],
        [255, 253, 59, 81],
        [434, 169, 27, 83],
        [69, 267, 61, 82],
        [316, 253, 59, 81],
        [199, 169, 60, 82],
        [335, 2, 62, 82],
        [66, 351, 61, 82],
        [136, 169, 61, 82],
        [129, 351, 57, 81],
        [267, 2, 66, 81],
        [362, 336, 56, 80],
        [383, 168, 49, 81],
        [86, 85, 80, 82],
        [306, 86, 62, 81],
        [427, 254, 27, 80],
        [377, 253, 48, 81],
        [2, 267, 65, 81],
        [188, 350, 52, 81],
        [86, 2, 90, 81],
        [399, 2, 62, 82],
        [2, 98, 82, 83],
        [261, 169, 59, 82],
        [2, 2, 82, 94],
        [322, 169, 59, 82],
        [242, 336, 58, 81],
        [302, 336, 58, 81],
        [241, 85, 63, 82],
        [2, 183, 71, 82],
        [178, 2, 87, 81],
        [168, 85, 71, 82],
        [420, 336, 56, 80],
        [193, 253, 60, 81]
    ],
    "animations": {
        "0": [0],
        "1": [1],
        "2": [2],
        "3": [3],
        "4": [4],
        "5": [5],
        ":": [6],
        "6": [7],
        "7": [8],
        "8": [9],
        "9": [10],
        "a": [11],
        "b": [12],
        "c": [13],
        "d": [14],
        "e": [15],
        "f": [16],
        "g": [17],
        "h": [18],
        "i": [19],
        "j": [20],
        "k": [21],
        "l": [22],
        "m": [23],
        "n": [24],
        "o": [25],
        "p": [26],
        "q": [27],
        "r": [28],
        "s": [29],
        "t": [30],
        "u": [31],
        "v": [32],
        "w": [33],
        "x": [34],
        "y": [35],
        "z": [36]
    }
};
/*
 * This function preloads all of the assets in the game.
 */
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
    textureAtlas = new createjs.SpriteSheet(imageData);
    fontAtlas = new createjs.SpriteSheet(fontData);
}
/*
 * This function initializes the game by setting up the canvas, FPS and enabling mouseover
 */
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
// UTILITY METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setupStats() {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}
/*
 * This function updates the game as it is being played.
 */
function gameLoop() {
    stats.begin(); // Begin metering
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
    stage.update();
    stats.end(); // End metering
}
/*
 * This function call the different states.
 */
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // instantiate game play screen
            playGame = new states.GamePlay();
            currentStateFunction = playGame;
            break;
        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
        case constants.INSTRUCTION_STATE:
            // instantiate game over screen
            instruction = new states.Instruction();
            currentStateFunction = instruction;
            break;
        case constants.LEVEL_2:
            // instantiate game play screen
            level_2 = new states.Level2();
            currentStateFunction = level_2;
            break;
        case constants.LEVEL_3:
            // instantiate game play screen
            level_3 = new states.Level3();
            currentStateFunction = level_3;
            break;
    }
}
//# sourceMappingURL=game.js.map