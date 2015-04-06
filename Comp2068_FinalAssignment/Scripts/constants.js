/**
File: Constants.ts
Author: Karan Sharma
Description: This class has all constant variables that are used in the game
Last Modified : March 19, 2015
*/
var constants;
(function (constants) {
    // Font Constants
    constants.FONT_FAMILY = "Consolas";
    constants.FONT_SIZE = "40px";
    constants.FONT_COLOUR = "#FFFF00";
    // State Machine Constants
    constants.MENU_STATE = 0;
    constants.PLAY_STATE = 1;
    constants.GAME_OVER_STATE = 2;
    constants.INSTRUCTION_STATE = 3;
    constants.SELECT_STATE = 4;
    constants.PLAY_STATE_2 = 5;
    // Game Constants
    constants.CLOUD_NUM = 4;
    constants.LABEL_FONT = "40px Consolas";
    constants.LABEL_COLOUR = "#FFFF00";
    constants.PLANE_LIVES = 3;
})(constants || (constants = {}));
//# sourceMappingURL=constants.js.map