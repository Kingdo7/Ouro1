/*:
 * @plugindesc [Patch] Désactive le curseur vanilla quand Galv VN Choice est actif (compatible Hime WindowSkin Changer).
 * @author Kingdo
 *
 * @help
 * ──────────────────────────────────────────────
 * UTILISATION :
 * Placez ce plugin SOUS Galv_VN_Choice et Hime_WindowSkinChanger.
 * Il supprime le curseur par défaut uniquement lorsque
 * VN Choice est actif, afin d’éviter le double affichage.
 * 
 * Quand VN Choice est OFF → le curseur normal réapparaît.
 * 
 * Aucun paramètre. Aucun appel spécial.
 * ──────────────────────────────────────────────
 */

(function() {

    // Redéfinition ciblée du curseur pour ChoiceList
    var _updateCursor = Window_ChoiceList.prototype._updateCursor;
    Window_ChoiceList.prototype._updateCursor = function() {
        if ($gameSystem.vnChoices) {
            this.setCursorRect(0, 0, 0, 0); // désactive curseur vanilla
        } else {
            _updateCursor.call(this);
        }
    };

    // Neutralisation de refreshCursor quand VNChoice est actif
    var _refreshCursor = Window_ChoiceList.prototype._refreshCursor;
    Window_ChoiceList.prototype._refreshCursor = function() {
        if ($gameSystem.vnChoices) {
            if (this._windowCursorSprite) {
                this._windowCursorSprite.visible = false;
            }
        } else {
            _refreshCursor.call(this);
        }
    };

})();
