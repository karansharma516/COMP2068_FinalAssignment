/**
File: nemo.ts
Author: Karan Sharma
Description: This file class the position of the Nemo
Last Modified : March 19, 2015
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Barry = (function (_super) {
        __extends(Barry, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This constructor creates creates nemo(player) at its position
         */
        function Barry() {
            _super.call(this, assetLoader.getResult("barry"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = 80;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method updates the player position
         */
        Barry.prototype.update = function () {
            this.y = stage.mouseY;
        };
        return Barry;
    })(createjs.Bitmap);
    objects.Barry = Barry;
})(objects || (objects = {}));
//# sourceMappingURL=barry.js.map