/*:
 * @plugindesc Permet de modifier dynamiquement la couleur du texte système (index 16) + contour, sans casser Yanfly Core.
 * @author Kingdo
 * 
 * @command OverrideSystemText ON <couleurTexte> <couleurContour>
 * Exemple : OverrideSystemText ON #3A3A2F #D0C5A2
 * 
 * @command OverrideSystemText OFF
 */

(function() {
    let overrideActive = false;
    let customTextColor = null;
    let customOutlineColor = null;

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "OverrideSystemText") {
            if (args[0] === "ON") {
                overrideActive = true;
                customTextColor = args[1] || '#ffffff';
                customOutlineColor = args[2] || '#000000';
                console.log(`SystemText override ON : texte ${customTextColor}, contour ${customOutlineColor}`);
            } else if (args[0] === "OFF") {
                overrideActive = false;
                customTextColor = null;
                customOutlineColor = null;
                console.log("SystemText override OFF");
            }
        }
    };

    const _Window_Base_textColor = Window_Base.prototype.textColor;
    Window_Base.prototype.textColor = function(n) {
        // RPG Maker MV utilise l'index 16 pour le texte "système"
        if (overrideActive && n === 16) {
            return customTextColor;
        }
        return _Window_Base_textColor.call(this, n);
    };

    const _Window_Base_resetTextColor = Window_Base.prototype.resetTextColor;
    Window_Base.prototype.resetTextColor = function() {
        this.changeTextColor(this.textColor(16)); // force à repasser par textColor(16)
    };

    const _Window_Base_outlineColor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'strokeStyle');
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'strokeStyle', {
        get: function() {
            if (overrideActive && customOutlineColor) {
                return customOutlineColor;
            }
            return _Window_Base_outlineColor.get.call(this);
        },
        set: function(value) {
            if (overrideActive && customOutlineColor) {
                _Window_Base_outlineColor.set.call(this, customOutlineColor);
            } else {
                _Window_Base_outlineColor.set.call(this, value);
            }
        },
        configurable: true
    });

})();
