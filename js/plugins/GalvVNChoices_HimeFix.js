/*:
 * @plugindesc Patch: Corrige l’apparition du curseur avec Galv Visual Novel Choices + Hime Windowskin Change.
 * @author Kingdo
 * @help
 * Placez ce plugin SOUS Galv_VisualNovelChoices et SOUS Hime_WindowskinChange.
 */

(function() {
    // --- Fonction utilitaire pour cacher le curseur ---
    function hideVNChoiceCursor(win) {
        if ($gameSystem.vnChoices && win instanceof Window_ChoiceList && win._windowCursorSprite) {
            win._windowCursorSprite.visible = false;
        }
    }

    // 1. On patch le refreshWindowskins de Hime pour recacher le curseur après reload
    var _refreshWindowskins = WindowLayer.prototype.refreshWindowskins;
    WindowLayer.prototype.refreshWindowskins = function() {
        _refreshWindowskins.call(this);
        for (var i = 0; i < this.children.length; i++) {
            hideVNChoiceCursor(this.children[i]);
        }
    };

    // 2. On patch aussi le update de Window_ChoiceList (par sécurité)
    var _update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function() {
        _update.call(this);
        hideVNChoiceCursor(this);
    };
})();
