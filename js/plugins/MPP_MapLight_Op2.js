//=============================================================================
// MPP_MapLight_Op2.js
//=============================================================================
// Copyright (c) 2021 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc The brightness of the tile changes depending on the region.
 * @author Mokusei Penguin
 * @url 
 *
 * @base MPP_MapLight
 * @orderAfter MPP_MapLight
 *
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * â–¼ Plugin parameter details
 *  ã€‡ About light level
 *   - You can set the brightness of the tile with the region ID.
 *   - The higher the level, the brighter it becomes.
 *   
 *  ã€‡ Region ID array specification
 *   - When setting numbers in an array, you can specify numbers from n to m
 *     by writing n-m.
 *         Example: 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguinï¼ yahoo.co.jp (ï¼  is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Light Level 1 Regions
 *      @desc 
 *      @default 1,9,17,25,33,41,49,57
 *
 *  @param Light Level 2 Regions
 *      @desc 
 *      @default 2,10,18,26,34,42,50,58
 *
 *  @param Light Level 3 Regions
 *      @desc 
 *      @default 3,11,19,27,35,43,51,59
 *
 *  @param Light Level 4 Regions
 *      @desc 
 *      @default 4,12,20,28,36,44,52,60
 *
 *  @param Light Level 5 Regions
 *      @desc 
 *      @default 5,13,21,29,37,45,53,61
 *
 *  @param Light Level 6 Regions
 *      @desc 
 *      @default 6,14,22,30,38,46,54,62
 *
 *  @param Light Level 7 Regions
 *      @desc 
 *      @default 7,15,23,31,39,47,55,63
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc ãƒªãƒ¼ã‚¸ãƒ§ãƒ³ã§ãã®ã‚¿ã‚¤ãƒ«ã®æ˜Žã‚‹ã•ãŒå¤‰ã‚ã‚Šã¾ã™ã€‚
 * @author æœ¨æ˜Ÿãƒšãƒ³ã‚®ãƒ³
 * @url 
 *
 * @base MPP_MapLight
 * @orderAfter MPP_MapLight
 *
 * @help [version 1.1.0]
 * ã“ã®ãƒ—ãƒ©ã‚°ã‚¤ãƒ³ã¯RPGãƒ„ã‚¯ãƒ¼ãƒ«MVãŠã‚ˆã³MZç”¨ã§ã™ã€‚
 * 
 * â–¼ ãƒ—ãƒ©ã‚°ã‚¤ãƒ³ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ è©³ç´°
 *  ã€‡ æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«ã«ã¤ã„ã¦
 *   - ãƒªãƒ¼ã‚¸ãƒ§ãƒ³IDã§ãã®ã‚¿ã‚¤ãƒ«ã®æ˜Žã‚‹ã•ã‚’è¨­å®šã§ãã¾ã™ã€‚
 *   - ãƒ¬ãƒ™ãƒ«ãŒé«˜ã„ã»ã©æ˜Žã‚‹ããªã‚Šã¾ã™ã€‚
 *   
 *  ã€‡ ãƒªãƒ¼ã‚¸ãƒ§ãƒ³IDã®é…åˆ—æŒ‡å®š
 *   - æ•°å€¤ã‚’é…åˆ—ã§è¨­å®šã™ã‚‹éš›ã€n-m ã¨è¡¨è¨˜ã™ã‚‹ã“ã¨ã§nã‹ã‚‰mã¾ã§ã®æ•°å€¤ã‚’æŒ‡å®šã§ãã¾ã™ã€‚
 *       ä¾‹ : 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguinï¼ yahoo.co.jp (ï¼ ã¯åŠè§’)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Light Level 1 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«1ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 1,9,17,25,33,41,49,57
 *
 *  @param Light Level 2 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«2ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 2,10,18,26,34,42,50,58
 *
 *  @param Light Level 3 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«3ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 3,11,19,27,35,43,51,59
 *
 *  @param Light Level 4 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«4ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 4,12,20,28,36,44,52,60
 *
 *  @param Light Level 5 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«5ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 5,13,21,29,37,45,53,61
 *
 *  @param Light Level 6 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«6ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 6,14,22,30,38,46,54,62
 *
 *  @param Light Level 7 Regions
 *      @text æ˜Žã‚‹ã•ãƒ¬ãƒ™ãƒ«7ãƒªãƒ¼ã‚¸ãƒ§ãƒ³
 *      @desc 
 *      @default 7,15,23,31,39,47,55,63
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MapLight_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            if (item) {
                const match = /(\d+)-(\d+)/.exec(item);
                if (match) {
                    const start = +match[1];
                    const end = +match[2];
                    for (let i = start; i <= end; i++) {
                        r.push(i);
                    }
                } else {
                    r.push(+item);
                }
            }
            return r;
        }, []);
    };
    const param_LightRegions = [];
    for (let i = 1; i < 8; i++) {
        const param = parameters[`Light Level ${i} Regions`];
        param_LightRegions[i] = convertToArray(param);
    }
    
    //-------------------------------------------------------------------------
    // Tilemap

    if (Utils.RPGMAKER_NAME === 'MV') {
        
        const _Tilemap__paintAllTiles = Tilemap.prototype._paintAllTiles;
        Tilemap.prototype._paintAllTiles = function(startX, startY) {
            this._darknessLayer.clearBase();
            _Tilemap__paintAllTiles.apply(this, arguments);
        };

        const _Tilemap__paintTiles = Tilemap.prototype._paintTiles;
        Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
            _Tilemap__paintTiles.apply(this, arguments);
            this._paintDarknessBitmap(startX, startY, x, y);
        };

    } else {
        
        const _Tilemap__addAllSpots = Tilemap.prototype._addAllSpots;
        Tilemap.prototype._addAllSpots = function(startX, startY) {
            this._darknessLayer.clearBase();
            _Tilemap__addAllSpots.apply(this, arguments);
        };

        const _Tilemap__addSpot = Tilemap.prototype._addSpot;
        Tilemap.prototype._addSpot = function(startX, startY, x, y) {
            _Tilemap__addSpot.apply(this, arguments);
            this._paintDarknessBitmap(startX, startY, x, y);
        };
        
    }

    Tilemap.prototype._paintDarknessBitmap = function(startX, startY, x, y) {
        const level = this._getDarknessLevel(startX + x, startY + y);
        this._darknessLayer._paintBaseBitmap(x, y, level);
    };

    Tilemap.prototype._getDarknessLevel = function(x, y) {
        const regionId = this._readMapData(x, y, 5);
        return Math.max(param_LightRegions.findIndex(regions => {
            return regions && regions.includes(regionId);
        }), 0);
    };

    Tilemap.prototype._paintDarkness = function() {
        this._darknessLayer.bltBase();
    };

    const _Tilemap_createDarknessBitmap = Tilemap.prototype.createDarknessBitmap;
    Tilemap.prototype.createDarknessBitmap = function() {
        _Tilemap_createDarknessBitmap.call(this);
        const widthWithMargin = this.width + this._margin * 2;
        const heightWithMargin = this.height + this._margin * 2;
        const tileCols = Math.ceil(widthWithMargin / this.tileWidth) + 1;
        const tileRows = Math.ceil(heightWithMargin / this.tileHeight) + 1;
        this._darknessLayer.createBaseBitmap(tileCols, tileRows);
    };

    //-------------------------------------------------------------------------
    // ShaderTilemap
    
    if (Utils.RPGMAKER_NAME === 'MV') {

        const _ShaderTilemap__paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
        ShaderTilemap.prototype._paintAllTiles = function(startX, startY) {
            this._darknessLayer.clearBase();
            _ShaderTilemap__paintAllTiles.apply(this, arguments);
        };

        const _ShaderTilemap__paintTiles = ShaderTilemap.prototype._paintTiles;
        ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
            _ShaderTilemap__paintTiles.apply(this, arguments);
            this._paintDarknessBitmap(startX, startY, x, y);
        };

    }

    //-------------------------------------------------------------------------
    // DarknessLayer
    
    const _DarknessLayer_destroy = DarknessLayer.prototype.destroy;
    DarknessLayer.prototype.destroy = function() {
        if (this._baseBitmap) {
            this._baseBitmap.destroy();
        }
        _DarknessLayer_destroy.call(this);
    };

    DarknessLayer.prototype.createBaseBitmap = function(width, height) {
        this._baseBitmap = new Bitmap(width, height);
    };

    DarknessLayer.prototype.clearBase = function() {
        if (this._baseBitmap) {
            this._baseBitmap.clear();
        }
    };

    DarknessLayer.prototype.bltBase = function() {
        const { width:sw, height:sh } = this._baseBitmap;
        const { width:dw, height:dh } = this.bitmap;
        this.bitmap.blt(this._baseBitmap, 0, 0, sw, sh, 0, 0, dw, dh);
    };

    DarknessLayer.prototype._paintBaseBitmap = function(x, y, level) {
        const bitmap = this._baseBitmap;
        bitmap.paintOpacity = 255 * (7 - level) / 7;
        bitmap.fillRect(x, y, 1, 1, 'black');
    };

})();

