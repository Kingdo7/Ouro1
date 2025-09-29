/*:
 * @plugindesc [v1.0.1] Applique une couleur/contour uniquement à certaines fenêtres (compatible Yanfly)
 * @author Kingdo
 *
 * @help
 * Ce plugin applique une couleur noire avec un contour sépia à certains textes du jeu,
 * spécifiés via les noms de classes de fenêtres RPG Maker (Window_XXX).
 *
 * Exemple d’usage : Window_ItemList, Window_MenuCommand, etc.
 * Ajoutez vos fenêtres dans le tableau `allowedWindows` ci-dessous.
 */

(function() {
    const textColor = '#4B382A';     // Couleur du texte
    const outlineColor = '#E6D9C3';  // Couleur du contour
    const outlineWidth = 4;          // Épaisseur du contour

    // Fenêtres ciblées — ajoute ici les classes des fenêtres où appliquer le style
    const allowedWindows = [
        'Window_ItemList',
        'Window_MenuCommand',
        'Window_Status',
        'Window_SkillList',
	'Window_ItemCategory',
	'Window_Options',
	'Window_OptionsCategory',
	'Window_SavefileList',
	'Window_Help',
        // ajoute ici d'autres noms de classes si nécessaire
    ];

    function isAllowedWindow(currentWindow) {
        if (!currentWindow || !currentWindow.constructor) return false;
        return allowedWindows.includes(currentWindow.constructor.name);
    }

    // resetTextColor
    const _resetTextColor = Window_Base.prototype.resetTextColor;
    Window_Base.prototype.resetTextColor = function() {
        if (isAllowedWindow(this)) {
            this.changeTextColor(textColor);
            if (this.contents) {
                this.contents.outlineColor = outlineColor;
                this.contents.outlineWidth = outlineWidth;
            }
        } else {
            _resetTextColor.call(this);
        }
    };

    // drawText
    const _drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
        if (SceneManager._scene && SceneManager._scene._windowLayer) {
            const topWindow = SceneManager._scene._windowLayer.children.find(win => win.contents === this);
            if (isAllowedWindow(topWindow)) {
                this.textColor = textColor;
                this.outlineColor = outlineColor;
                this.outlineWidth = outlineWidth;
            }
        }
        return _drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    };

    // drawTextEx
    const _drawTextEx = Bitmap.prototype.drawTextEx;
    Bitmap.prototype.drawTextEx = function(text, x, y, width) {
        if (SceneManager._scene && SceneManager._scene._windowLayer) {
            const topWindow = SceneManager._scene._windowLayer.children.find(win => win.contents === this);
            if (isAllowedWindow(topWindow)) {
                this.textColor = textColor;
                this.outlineColor = outlineColor;
                this.outlineWidth = outlineWidth;
            }
        }
        return _drawTextEx.call(this, text, x, y, width);
    };

    // Tu peux commenter ces lignes si tu veux garder celles de Yanfly Core
    Window_Base.prototype.standardFontSize = function() {
        return 28;
    };

    Window_Base.prototype.standardFontFace = function() {
        return 'GameFont';
    };
})();
