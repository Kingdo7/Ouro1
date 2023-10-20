//=============================================================================
// ScreenshotMap.js
//=============================================================================

/*:
 * @plugindesc Takes a screenshot of the entire map including events by pressing the Print Screen key.
 * @author ChatGPT
 *
 * @help This plugin allows you to take a screenshot of the entire map, including events, 
 * by pressing the Print Screen key.
 * 
 * Plugin Commands:
 *   None
 * 
 * Note: This plugin may not work properly with certain screen resolution settings.
 */

(function() {
  var _SceneManager_snapForBackground = SceneManager.snapForBackground;
  SceneManager.snapForBackground = function() {
    var bitmap = _SceneManager_snapForBackground.call(this);
    bitmap.blt(this._scene._spriteset._tilemap._lowerBitmap, 0, 0, Graphics.width, Graphics.height, 0, 0);
    bitmap.blt(this._scene._spriteset._tilemap._upperBitmap, 0, 0, Graphics.width, Graphics.height, 0, 0);
    var sprites = this._scene._spriteset._characterSprites.concat(this._scene._spriteset._vehicleSprites);
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      var bitmap = sprite.bitmap;
      var x = sprite.x - sprite.anchor.x * bitmap.width;
      var y = sprite.y - sprite.anchor.y * bitmap.height;
      if (x >= 0 && y >= 0 && x + bitmap.width <= Graphics.width && y + bitmap.height <= Graphics.height) {
        bitmap = sprite.bitmap;
        this._backgroundBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
      }
    }
    return this._backgroundBitmap;
  };

  document.addEventListener('keydown', function(event) {
    if (event.key === 'PrintScreen') {
      var link = document.createElement('a');
      link.href = SceneManager.snap().toDataURL('image/png');
      link.download = 'screenshot.png';
      link.click();
    }
  });
})();
