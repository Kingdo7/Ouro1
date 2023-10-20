/*:
 * 
 * @help
 * 
 * [Touche Directionnelle]
 * system sound Cursor nomDuFichier
 * 
 * [Validation]
 * system sound Ok nomDuFichier
 * 
 * [Retour]
 * system sound Cancel nomDuFichier
 * 
 * 
 * *Exemples*
 * system sound Cursor Battle1
 * system sound Ok Buzzer1
 */

/* Version 1.0 */

(() => {
  var _Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    // insert additional processing details here
    if (command === 'system' &&
          args[0] === 'sound') {
      switch(args[1]) {
        case 'Cursor':
          $dataSystem.sounds[0].name = args[2];
          break;
        case 'Ok':
          $dataSystem.sounds[1].name = args[2];
          break;
        case 'Cancel': 
          $dataSystem.sounds[2].name = args[2];
          break;
        default:
          break;
      }
    }
  }
})();