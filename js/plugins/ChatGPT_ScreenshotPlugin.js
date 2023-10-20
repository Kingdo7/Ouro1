/*:
 * @plugindesc Screenshot Plugin - Take a screenshot of the current map and save it to a folder. 
 * @author ChatGPT
 *
 * @param folderName
 * @text Folder Name
 * @desc The name of the folder to save the screenshots in. Default: screenshots
 * @default screenshots
 *
 * @help
 * This plugin allows you to take screenshots of the current map and save them to a folder. 
 * To take a screenshot, simply press the designated key while in-game (default: F12).
 * Screenshots will be saved in the folder specified in the plugin parameters.
 */

(function() {
    var parameters = PluginManager.parameters('ChatGPT_ScreenshotPlugin');
    var folderName = parameters['folderName'] || 'screenshots';

    function takeScreenshot() {
        // Vérifier si la variable $gameMap est définie
        if (!$gameMap) return;

        var map = $gameMap;
        var canvas = document.createElement('canvas');
        canvas.width = Graphics.boxWidth;
        canvas.height = Graphics.boxHeight;

        // Draw the map onto the canvas
        var context = canvas.getContext('2d');
        var tileWidth = map.tileWidth();
        var tileHeight = map.tileHeight();
        var width = map.width();
        var height = map.height();
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var tileId = map.tileId(x, y, 0);
                if (tileId > 0) {
                    var tileset = $gameMap.tileset();
                    // Vérifier si la variable tileset est définie
                    if (!tileset) continue;
                    var setNumber = 5 + Math.floor(tileId / 256);
                    var graphic = tileset.tilesetFlags[setNumber] & 0x10 ? $gameMap.autotileType(tileId) : tileId;
                    var dx = (graphic % 8) * tileWidth;
                    var dy = Math.floor(graphic / 8) * tileHeight;
                    context.drawImage(tileset._image, dx, dy, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
            }
        }

        // Save the screenshot to the specified folder
        var date = new Date();
        var fileName = 'screenshot_' + date.getTime() + '.png';
        var link = document.createElement('a');
        link.download = fileName;
        canvas.toBlob(function(blob) {
            link.href = URL.createObjectURL(blob);
            link.click();
        });
    }

    // Define the key to take screenshots
    Input.keyMapper[123] = 'screenshot'; // F12

    // Override the default F12 key behavior to take a screenshot instead
    var _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if (event.keyCode === 123) { // F12
            takeScreenshot();
            event.preventDefault();
        } else {
            _Input_onKeyDown.call(this, event);
        }
    };
})();
