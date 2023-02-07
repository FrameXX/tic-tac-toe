class Player {
    constructor(defaults) {
        log(`creating player ${defaults.id} with name ${defaults.name}`, 1);
        this.id = defaults.id;
        this.position = defaults.position;
        this.name = defaults.name;
        this.symbol = defaults.symbol;
        this.hue = defaults.hue;
        this.computer = defaults.computer;
        this.mistakeRate = defaults.mistakeRate;
        this.agressivity = defaults.agressivity;
        this.lastCellCoords = defaults.lastCellCoords;
        playersOrder.push(this.id);
        this.setHue();
        this.createDOM();
    }

    createDOM(newDOM = true) {
        if (newDOM) {
            var animator = document.createElement("div");
            animator.id = `${this.position}-player-animator`;
            animator.setAttribute("class", "player-animator");
        } else {
            var animator = document.getElementById(`${this.position}-player-animator`);
        }
        if (newDOM) {
            document.getElementById("players").append(animator);
        }
        var symbol = getSymbolElementString(this.symbol, 35, this.id);
        animator.innerHTML = `<div class="player" id="${this.position}-player" style="background-color: hsl(var(--${this.id}-hue), var(--back-accent)); border-color: hsl(var(--${this.id}-hue), var(--symbol-accent)); transition: none;"><div class="icon-options"><div class="symbol-name"><button id="${this.id}-symbol-button" class="symbol-button" style="-webkit-tap-highlight-color: hsla(var(--${this.id}-hue), var(--symbol-accent), 20%);">${symbol}</button><input class="player-name-input" id="${this.id}-player-name-input" type="text" spellcheck="false"></div><div class="options"><div class="range-option"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill=var(--text-color)><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M12,2L6.35,7.56l0,0C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2z"/></g></svg></div><div class="value"><div class="title">Hue</div><div class="input"><input class="range" title="hue"id="${this.id}-hue-range" type="range" min="0" max="360"><input class="number" type="number" id="${this.id}-hue-value"></div></div></div><div class="bottom-descriptor">Hue of the player and his symbol. Can be set from 0 to up to 360 degrees.</div><div class="check-option"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill=var(--text-color)><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/></svg></div><div class="value"><div class="title">Computer</div><div class="input"><input type="checkbox" title="computer" id="${this.id}-computer-check"></div></div></div><div class="bottom-descriptor">An algorythm will make decisions on where to place symbol instead of a player.</div><div id="${this.id}-computer-options-wrapper"><div id="${this.id}-computer-options"><div class="range-option"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill=var(--text-color)><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg></div><div class="value"><div class="title">Mistake rate</div><div class="input"><input class="range" title="mistake rate"id="${this.id}-mistake-rate-range" type="range" min="0" max="100"><input class="number" type="number" id="${this.id}-mistake-rate-value"></div></div></div><div class="bottom-descriptor">The bigger the value is the bigger is the chance of algorythm choosing not so optimal placement for its symbol.</div><div class="range-option"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill=var(--text-color)><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,21h-1l1-7H7.5c-0.88,0-0.33-0.75-0.31-0.78C8.48,10.94,10.42,7.54,13.01,3h1l-1,7h3.51c0.4,0,0.62,0.19,0.4,0.66 C12.97,17.55,11,21,11,21z"/></g></svg></div><div class="value"><div class="title">Agressivity</div><div class="input"><input class="range" title="agressivity"id="${this.id}-agressivity-range" type="range" min="50" max="150"><input class="number" type="number" id="${this.id}-agressivity-value"></div></div></div><div class="bottom-descriptor">The bigger the value is the more important its own successes become for algorythm compared to successes of the oponent.</div></div></div></div><div class="button-options"><button style="background-color: hsl(var(--${this.id}-hue), var(--top-accent))" title="move player ${this.name} up" id="${this.id}-move-player-up"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="hsl(var(--${this.id}-hue), var(--back-accent))"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg></button><button style="background-color: hsl(var(--${this.id}-hue), var(--top-accent))" title="delete player ${this.name}" id="${this.id}-delete-player"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="hsl(var(--${this.id}-hue), var(--back-accent))"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/></svg></button><button style="background-color: hsl(var(--${this.id}-hue), var(--top-accent))" title="move player ${this.name} down" id="${this.id}-move-player-down"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="hsl(var(--${this.id}-hue), var(--back-accent))"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></button></div></div></div>`;
        animator.style.height = (getComputedStyle(document.getElementById(`${this.position}-player`)).height.replace("px", "")*1 + 45) + "px";
        setTimeout(function() {
            document.getElementById(`${this.id}-player-name-input`).value = this.name;
            this.setValueListeners();
        }.bind(this), 200);
        this.updateDOMSize();
    }

    updateDOMSize() {
        var animator = document.getElementById(`${this.position}-player-animator`);
        animator.style.opacity = 1;
        animator.style.height = (getComputedStyle(document.getElementById(`${this.position}-player`)).height.replace("px", "")*1 + 45) + "px";
    }

    setHue() {
        cssVariables.style.setProperty(`--${this.id}-hue`, this.hue);
        if (typeof game != "undefined") {
            if (game.playing == this.id) {
                changeHue(this.hue);
            }
        }
    }

    get lastCell() {
        if (this.lastCellCoords != null) {
            return grid.cells[this.lastCellCoords[0]][this.lastCellCoords[1]];
        } else {
            return null;
        }
    }

    highlightLastCell() {
        if (this.lastCell != null) {
            this.lastCell.highlight(this.id);
        }
    }

    cancelLastCellHighlight() {
        if (this.lastCell != null) {
            this.lastCell.cancelHighlight();
        }
    }

    setValueListeners() {
        log(`setting value listeners for player ${this.id}`, 2);
        var rangeValuePairs = [{optionDOM: "hue", optionJS: "hue", multiplier: 1, player: this.id}, {optionDOM: "mistake-rate", optionJS: "mistakeRate", multiplier: 100, player: this.id}, {optionDOM: "agressivity", optionJS: "agressivity", multiplier: 100, player: this.id}];
        assignRangeValueListeners(rangeValuePairs);
        optionRangeValuePairs = optionRangeValuePairs.concat(rangeValuePairs);
        var checkboxes = [{optionDOM: "computer", optionJS: "computer", disablesOptions: {options: "computer", onValue: false}, player: this.id}];
        assignCheckboxListeners(checkboxes);
        optionCheckboxes = optionCheckboxes.concat(checkboxes);
        document.getElementById(`${this.id}-player-name-input`).addEventListener("input", this.updateName.bind(this));
        document.getElementById(`${this.id}-symbol-button`).addEventListener("click", this.changeSymbol.bind(this));
        document.getElementById(`${this.id}-delete-player`).addEventListener("click", this.deletePlayer.bind(this));
        document.getElementById(`${this.id}-move-player-up`).addEventListener("click", this.movePlayerIndex.bind(this, true));
        document.getElementById(`${this.id}-move-player-down`).addEventListener("click", this.movePlayerIndex.bind(this, false));
        setCurrentOptionValues();
    }

    changeSymbol() {
        configuration.soundEffects && soundEffects.placeSymbol.play();
        this.symbol = Object.keys(symbols)[getTotalIndex(Object.keys(symbols).indexOf(this.symbol)  + 1, Object.keys(symbols))];
        let symbolElement = stringToHTML(getSymbolElementString(this.symbol, 35, this.id, "transform: scale(4); opacity: 0; transition: transform 160ms linear, opacity 160ms linear;"));
        let symbolButton = document.getElementById(`${this.id}-symbol-button`);
        symbolButton.innerHTML = "";
        symbolButton.append(symbolElement);
        getComputedStyle(symbolElement).opacity;
        symbolElement.style.opacity = 1;
        symbolElement.style.transform = "";
        for (const row of grid.cells) {
            row.forEach(cell => {
                if (cell.captured == this.id) {
                    cell.removeSymbol();
                    cell.placeSymbol(this.id);
                }
            });
        }
        if (game.playing == this.id) {
            bannerMessage(getSymbolElementString(this.symbol, 30, game.playing) + `<div style="margin-left: 10px;">plays</div>`);
        }
        saveData();
    }

    updateName() {
        this.name = document.getElementById(`${this.id}-player-name-input`).value;
        document.getElementById(`${this.id}-move-player-up`).setAttribute("title", `move player ${this.name} up`);
        document.getElementById(`${this.id}-delete-player`).setAttribute("title", `delete player ${this.name}`);
        document.getElementById(`${this.id}-move-player-down`).setAttribute("title", `move player ${this.name} down`);
        saveData();
        log(`name of player ${this.id} updated to ${this.name}`, 3);
    }

    deletePlayer() {
        if (playersOrder.length > 2 && game.playing != this.id) {
            this.deleteDom();
            this.cancelLastCellHighlight();

            let indexesToRemove;
            indexesToRemove = [];
            for (const [index, pair] of optionRangeValuePairs.entries()) {
                if (pair.player == this.id) {
                    indexesToRemove.push(index);
                }
            }
            while(indexesToRemove.length) {
                optionRangeValuePairs.splice(indexesToRemove.pop(), 1);
            }

            indexesToRemove = [];
            for (const [index, pair] of optionCheckboxes.entries()) {
                if (pair.player == this.id) {
                    indexesToRemove.push(index);
                }
            }
            while(indexesToRemove.length) {
                optionCheckboxes.splice(indexesToRemove.pop(), 1);
            }

            for (let index = this.position + 1; index < playersOrder.length; index++) {
                document.getElementById(`${index}-player-animator`).id = `${index - 1}-player-animator`;
                document.getElementById(`${index}-player`).id = `${index - 1}-player`;
                players[playersOrder[index]].position = index - 1;
            }

            for (const row of grid.cells) {
                for (cell of row) {
                    if (cell.captured == this.id) {
                        cell.removeSymbol();
                    }
                }
            }

            playersOrder.splice(this.position, 1);
            delete players[this.id];
            saveData();
        } else {
            if (playersOrder.length <= 2) {
                showToast("At least 2 players need to be in the game.", `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="hsl(var(--hue), var(--top-accent))"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"/></svg>`);
            } else {
                showToast("This player currently plays his/her turn.", `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="hsl(var(--hue), var(--top-accent))"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M7,11v2h10v-2H7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/></g></g></svg>`);
            }
        }
    }

    movePlayerIndex(up) {
        let indexMove;
        if (up) {
            indexMove = -1;
        } else {
            indexMove = 1;
        }
        log(`${this.id} will be moving to index ${getTotalIndex(this.position + indexMove, playersOrder)}`, 2);
        const switchedPlayer = players[playersOrder[getTotalIndex(this.position + indexMove, playersOrder)]];
        log(`switching positions between ${this.id} and ${switchedPlayer.id}`, 2);
        this.deleteDom(true);
        switchedPlayer.deleteDom(true);
        const origThisPosition = this.position;
        const origSwitcherPosition = switchedPlayer.position;
        switchedPlayer.position = origThisPosition;
        this.position = origSwitcherPosition;
        playersOrder[origThisPosition] = switchedPlayer.id;
        playersOrder[origSwitcherPosition] = this.id;
        setTimeout(function() {
            this.createDOM(false);
            switchedPlayer.createDOM(false);
        }.bind(this), 250);
    }

    deleteDom(indexSwitch = false) {
        const animator = document.getElementById(`${this.position}-player-animator`);
        animator.style.opacity = 0;
        animator.style.height = 0;
        if (!indexSwitch) {
            setTimeout(function() {
                animator.remove();
            }, 250);
        }
    }
}

class Cell {
    constructor(defaults) {
        log(`creating cell with defaults: ${JSON.stringify(defaults)}`, 5);
        this.captured = defaults.captured;
        this.symbolElement = null
        this.row = defaults.row;
        this.column = defaults.column
        if (this.captured != null) {
            this.placeSymbol(this.captured);
        }
    }

    placeSymbol(playerId) {
        if (this.symbolElement != null) {
            throw new Error(`Tryed to place symbol on row ${this.row} and column ${this.column} that already has symbol.`);
        } else {
            this.element.style.cursor = "not-allowed";
            this.symbolElement = stringToHTML(getSymbolElementString(players[playerId].symbol, grid.cellSize - 6, playerId, "transform: scale(4); opacity: 0; transition: transform 160ms linear, opacity 160ms linear;"));
            this.element.append(this.symbolElement);
            getComputedStyle(this.symbolElement).opacity;
            this.symbolElement.style.opacity = 1;
            this.symbolElement.style.transform = "";
            this.captured = playerId;
        }
    }

    removeSymbol() {
        if (this.symbolElement == null) {
            throw new Error(`Tryed to remove non-existent symbol on row ${this.row} and column ${this.column}.`);
        } else {
            this.element.style.cursor = "pointer";
            this.symbolElement.style.transform = "scale(4)";
            this.symbolElement.style.opacity = 0;
            setTimeout(function(symbolElement) {
                symbolElement.remove();
            }.bind(this, this.symbolElement), 170);
            this.symbolElement = null;
            this.captured = null;
        }
    }

    highlight(playerId) {
        this.element.style.backgroundColor = `hsl(var(--${playerId}-hue), var(--back-accent))`;
        this.element.style.animation = "pulse 1500ms linear infinite";
    }

    cancelHighlight() {
        this.element.style.backgroundColor = "";
        this.element.style.animation = "";
    }

    get element() {
        return document.getElementById(`cell-${this.row}-${this.column}`);
    }
}

function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
}

// initiate global objects
const soundEffects = {placeSymbol: new Howl({ src: ["audio/place-symbol.ogg"] }), removeSymbol: new Howl({ src: ["audio/remove-symbol.ogg"] })};
navigator.touchscreen = matchMedia("(pointer: coarse)").matches;
maxLogDepth = 0;
cssVariables = document.querySelector(":root");
expanded = {players: false};
menuOpened = false;
menuStyle = null;
mode = "play";
players = {};
playersOrder = [];
functionRequests = {};
if (navigator.cookieEnabled) {
    storage = "localStorage";
} else {
    storage = "globalStorage";
    showToast("Cookies zakázány -> Jakékoli změny se v příští relaci neobnoví.", `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="hsl(var(--hue), var(--top-accent))"><g><rect fill="none" height="24" width="24"/></g><g><g><circle cx="10.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="13.5" r="1.5"/><circle cx="15" cy="15" r="1"/><path d="M21.95,10.99c-1.79-0.03-3.7-1.95-2.68-4.22c-2.97,1-5.78-1.59-5.19-4.56C7.11,0.74,2,6.41,2,12c0,5.52,4.48,10,10,10 C17.89,22,22.54,16.92,21.95,10.99z M12,20c-4.41,0-8-3.59-8-8c0-3.31,2.73-8.18,8.08-8.02c0.42,2.54,2.44,4.56,4.99,4.94 c0.07,0.36,0.52,2.55,2.92,3.63C19.7,16.86,16.06,20,12,20z"/></g></g></svg>`)
}
globalStorage = {
    getItem(id) {
        return this.values[id];
    }, setItem(id, value) {
        this.values[id] = value;
    }, clear() {
        for (const item of Object.keys(this.values)) {
            delete this.values[item];
        }
    }, values: {}
}
playGrid = document.getElementById("play-grid");

// used for generating color shades based on hue
const saturationLight = {back: [100, 93], top: [24, 14], symbolDark: [80, 42], symbolLight: [100, 40]};

const symbols = {cross: `<svg version="1.1" viewBox="0.0 0.0 256.0 256.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l256.0 0l0 256.0l-256.0 0l0 -256.0z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l256.0 0l0 256.0l-256.0 0z" fill-rule="evenodd"/><path fill="#cc0000" d="m0.0053503937 227.29182l228.0 -228.0l27.999985 28.0l-227.99998 228.0z" fill-rule="evenodd"/><path fill="#cc0000" d="m227.99176 256.68982l-228.0 -228.0l28.0 -28.0l228.0 228.0z" fill-rule="evenodd"/></g></svg>`, circle: `<svg version="1.1" viewBox="0.0 0.0 256.0 256.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l256.0 0l0 256.0l-256.0 0l0 -256.0z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l256.0 0l0 256.0l-256.0 0z" fill-rule="evenodd"/><path fill="#6aa84f" d="m7.6115484E-6 128.00002l0 0c0 -70.692444 57.307552 -128.0 127.99999 -128.0l0 0c33.947723 0 66.50502 13.485676 90.509674 37.490334c24.004654 24.004654 37.490326 56.56196 37.490326 90.50967l0 0c0 70.692444 -57.30754 128.00002 -128.0 128.00002l0 0c-70.692444 0 -127.99999 -57.30757 -127.99999 -128.00002zm42.54464 0l0 0c0 47.195694 38.259666 85.45537 85.45535 85.45537c47.195694 0 85.45537 -38.259674 85.45537 -85.45537c0 -47.195694 -38.259674 -85.45536 -85.45537 -85.45536l0 0c-47.195686 0 -85.45535 38.259666 -85.45535 85.45536z" fill-rule="evenodd"/><path stroke="#6aa84f" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m7.6115484E-6 128.00002l0 0c0 -70.692444 57.307552 -128.0 127.99999 -128.0l0 0c33.947723 0 66.50502 13.485676 90.509674 37.490334c24.004654 24.004654 37.490326 56.56196 37.490326 90.50967l0 0c0 70.692444 -57.30754 128.00002 -128.0 128.00002l0 0c-70.692444 0 -127.99999 -57.30757 -127.99999 -128.00002zm42.54464 0l0 0c0 47.195694 38.259666 85.45537 85.45535 85.45537c47.195694 0 85.45537 -38.259674 85.45537 -85.45537c0 -47.195694 -38.259674 -85.45536 -85.45537 -85.45536l0 0c-47.195686 0 -85.45535 38.259666 -85.45535 85.45536z" fill-rule="evenodd"/></g></svg>`, snowcon: `<svg version="1.1" viewBox="0.0 0.0 256.0 256.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l256.0 0l0 256.0l-256.0 0l0 -256.0z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l256.0 0l0 256.0l-256.0 0z" fill-rule="evenodd"/><path fill="#3d85c6" d="m112.76912 3.1653543l31.62204 0l0 249.66928l-31.62204 0z" fill-rule="evenodd"/><path fill="#3d85c6" d="m3.1653543 143.371l0 -31.622055l249.66928 0l0 31.622055z" fill-rule="evenodd"/><path fill="#3d85c6" d="m29.140959 50.921158l22.33071 -22.330708l176.47244 176.47244l-22.330704 22.330704z" fill-rule="evenodd"/><path fill="#3d85c6" d="m50.921444 227.42561l-22.33071 -22.330719l176.47244 -176.47244l22.330719 22.33071z" fill-rule="evenodd"/></g></svg>`};
const hues = {cross: 0, circle: 102, snowcone: 208}

function getSymbolElementString(id, size, playerId, style = "") {
    let symbol = stringToHTML(symbols[id]);
    symbol.setAttribute("width", `${size}px`);
    symbol.setAttribute("height", `${size}px`);
    return symbol.outerHTML.replace(/(?<=fill=")#(?!000000)(?:[a-f]|[0-9]){6}/gm, `hsl(var(--${playerId}-hue), var(--symbol-accent))`).replace("<svg ", `<svg style="${style}" `);
}

// actions after window resize
addEventListener("resize", function () {
    updateMenuStyle();
    requestFunction(updateGridTransforms, 200, "updateGridTransforms");
    if (expanded.players) {
        updatePlayerDOMSizes();
    }
    updateOpenedExpanders();
});

matchMedia('(prefers-color-scheme: dark)').addEventListener("change", updateTheme);
matchMedia("(pointer: coarse)").addEventListener("change", function() {
    navigator.touchscreen = matchMedia("(pointer: coarse)").matches;
});

new ResizeObserver(requestFunction.bind(null, updateExpanderSize.bind(null ,"players"), 100, "updatePlayersSize")).observe(document.getElementById("expand-players-content"));

function updatePlayerDOMSizes() {
    for (const player of playersOrder) {
        players[player].updateDOMSize();
    }
}

optionRangeValuePairs = [{ optionDOM: "grid-rows", optionJS: "gridRows", multiplier: 1, player: null}, { optionDOM: "grid-columns", optionJS: "gridColumns", multiplier: 1, player: null}, { optionDOM: "border-part", optionJS: "borderPart", multiplier: 100, player: null}, { optionDOM: "optimal-cell-size", optionJS: "optimalCellSize", multiplier: 1, player: null}, { optionDOM: "win-combo", optionJS: "winCombo", multiplier: 1, player: null},];
assignRangeValueListeners(optionRangeValuePairs);

function addNewPlayer(first = false, computer = false) {
    const id = getRandomId(4);
    const position = playersOrder.length;
    players[id] = new Player({id: id, position: position, name: `Player ${position + 1}`, symbol: Object.keys(symbols)[getTotalIndex(position, Object.keys(symbols))], hue: Object.values(hues)[getTotalIndex(position, Object.values(hues))], computer: computer, mistakeRate: 0.2, agressivity: 1, lastCellCoords: null});
    if (!first) {
        saveData();
    }
}

function assignRangeValueListeners(pairs) {
    log("assigning range-value listeners", 3);
    for (const pair of pairs) {
        if (pair.player === null) {
            document.getElementById(`${pair.optionDOM}-range`).addEventListener("input", updateOptionRangeValuePair.bind(null, pair, "range"));
            document.getElementById(`${pair.optionDOM}-value`).addEventListener("input", updateOptionRangeValuePair.bind(null, pair, "value"));
        } else {
            document.getElementById(`${pair.player}-${pair.optionDOM}-range`).addEventListener("input", updateOptionRangeValuePair.bind(null, pair, "range"));
            document.getElementById(`${pair.player}-${pair.optionDOM}-value`).addEventListener("input", updateOptionRangeValuePair.bind(null, pair, "value"));
        }
    }
}

function updateOptionRangeValuePair(pair, origin) {
    let applyedTo;
    if (origin == "range") {
        applyedTo = "value";
    } else {
        applyedTo = "range";
    }
    if (pair.player === null) {
        let value = document.getElementById(`${pair.optionDOM}-${origin}`).value/pair.multiplier;
        configuration[pair.optionJS] = value;
        document.getElementById(`${pair.optionDOM}-${applyedTo}`).value = Math.round(value*pair.multiplier*10)/10;
    } else {
        let value = document.getElementById(`${pair.player}-${pair.optionDOM}-${origin}`).value/pair.multiplier;
        players[pair.player][pair.optionJS] = value;
        document.getElementById(`${pair.player}-${pair.optionDOM}-${applyedTo}`).value = Math.round(value*pair.multiplier*10)/10;
        if (pair.optionDOM == "hue") {
            players[pair.player].setHue();
        }
    }
    updateData();
}

optionCheckboxes = [{optionDOM: "show-cell-indexes", optionJS: "showCellIndexes", disablesOptions: {}, player: null}, {optionDOM: "auto-grid-sizes", optionJS: "autoGridSizes", disablesOptions: {options: "grid-sizes", onValue: true}, player: null}, {optionDOM: "rotate-grid", optionJS: "rotateGrid", disablesOptions: {}, player: null}, {optionDOM: "sound-effects", optionJS: "soundEffects", disablesOptions: {}, player: null}];
assignCheckboxListeners(optionCheckboxes);

function assignCheckboxListeners(checkboxes) {
    log("assigning checkbox listeners", 3);
    for (const checkbox of checkboxes) {
        let element;
        if (checkbox.player === null) {
            element = document.getElementById(`${checkbox.optionDOM}-check`);
        } else {
            element = document.getElementById(`${checkbox.player}-${checkbox.optionDOM}-check`);
        }
        element.addEventListener("click", updateOptionCheckbox.bind(null, checkbox));
    }
}

function updateOptionCheckbox(checkbox) {
    let value;
    if (checkbox.player === null) {
        value = document.getElementById(`${checkbox.optionDOM}-check`).checked;
        configuration[checkbox.optionJS] = value;
    } else {
        value = document.getElementById(`${checkbox.player}-${checkbox.optionDOM}-check`).checked;
        players[checkbox.player][checkbox.optionJS] = value;
    }
    updateCheckboxDisablers(checkbox);
    updateData();
}

optionSelects = [{optionDOM: "theme", optionJS: "theme", player: null}, {optionDOM: "confirm-turn", optionJS: "confirmTurn", player: null}];
assignSelectListeners(optionSelects);

function assignSelectListeners(selects) {
    log("assigning select listeners", 3);
    for (const select of optionSelects) {
        log(`assigning select listeners for: ${JSON.stringify(select)}`, 4);
        let element;
        if (select.player === null) {
            element = document.getElementById(`${select.optionDOM}-select`);
        } else {
            element = document.getElementById(`${select.player}-${select.optionDOM}-select`);
        }
        element.addEventListener("change", updateOptionSelect.bind(null, select));
    }
}

function updateOptionSelect(select) {
    let value;
    if (select.player === null) {
        value = document.getElementById(`${select.optionDOM}-select`).value;
        configuration[select.optionJS] = value;
    } else {
        value = document.getElementById(`${select.player}-${select.optionDOM}-select`).value;
        players[select.player][select.optionJS] = value;
    }
    updateData();
}

function updateCheckboxDisablers(checkbox) {
    let value;
    if (checkbox.player === null) {
        value = document.getElementById(`${checkbox.optionDOM}-check`).checked;
    } else {
        value = document.getElementById(`${checkbox.player}-${checkbox.optionDOM}-check`).checked;
    }
    if (Object.keys(checkbox.disablesOptions).length !== 0) {
        if (value == checkbox.disablesOptions.onValue) {
            if (checkbox.player === null) {
                document.getElementById(`${checkbox.disablesOptions.options}-options`).setAttribute("class", "disabled");
                document.getElementById(`${checkbox.disablesOptions.options}-options-wrapper`).setAttribute("class", "not-allowed");
            } else {
                document.getElementById(`${checkbox.player}-${checkbox.disablesOptions.options}-options`).setAttribute("class", "disabled");
                document.getElementById(`${checkbox.player}-${checkbox.disablesOptions.options}-options-wrapper`).setAttribute("class", "not-allowed");
            }
        } else {
            if (checkbox.player === null) {
                document.getElementById(`${checkbox.disablesOptions.options}-options`).removeAttribute("class");
                document.getElementById(`${checkbox.disablesOptions.options}-options-wrapper`).removeAttribute("class");
            } else {
                document.getElementById(`${checkbox.player}-${checkbox.disablesOptions.options}-options`).removeAttribute("class");
                document.getElementById(`${checkbox.player}-${checkbox.disablesOptions.options}-options-wrapper`).removeAttribute("class");
            }
        }
    }
}

function setCurrentOptionValues() {
    log("setting current option values", 2);
    for (const pair of optionRangeValuePairs) {
        if (pair.player === null) {
            document.getElementById(`${pair.optionDOM}-value`).value = configuration[pair.optionJS]*pair.multiplier;
        } else {
            document.getElementById(`${pair.player}-${pair.optionDOM}-value`).value = players[pair.player][pair.optionJS]*pair.multiplier;
        }
        updateOptionRangeValuePair(pair, "value");
    }
    for (const checkbox of optionCheckboxes) {
        if (checkbox.player === null) {
            document.getElementById(`${checkbox.optionDOM}-check`).checked = configuration[checkbox.optionJS];
        } else {
            document.getElementById(`${checkbox.player}-${checkbox.optionDOM}-check`).checked = players[checkbox.player][checkbox.optionJS];
        }
        updateCheckboxDisablers(checkbox);
    }
    for (const select of optionSelects) {
        if (select.player === null) {
            document.getElementById(`${select.optionDOM}-select`).value = configuration[select.optionJS];
        } else {
            document.getElementById(`${select.player}-${select.optionDOM}-select`).value = players[select.player][select.optionJS];
        }
    }
}

if (window[storage].getItem("storageUsed") == null) {
    window[storage].setItem("storageUsed", true)
    resetStorage();
    expandPart("players");
    addNewPlayer(true);
    addNewPlayer(true, true);
    delayedClosePlayersExpander();
    startNewGame();
} else {
    restoreData();
}
updateMenuStyle();
setCurrentOptionValues();
saveData();

function startNewGame(user = false) {
    if (!user || configuration.confirmTurn == "never" || (configuration.confirmTurn == "touchscreen" && !navigator.touchscreen) || !(game.won == null) || confirm("Are you sure you want to start a new game? Current game will be lost.")) {
        log("starting new game", 1);
        grid = {rotated: false, cellSize: configuration.optimalCellSize, cells: []}
        game = {turn: 0, won: null, playing: playersOrder[0], id: getRandomId(4)};
        if (configuration.autoGridSizes) {
            gridCounts = getOptimalGridCounts()
            grid.rows = gridCounts[0];
            grid.columns = gridCounts[1];
        } else {
            grid.rows = configuration.gridRows;
            grid.columns = configuration.gridColumns;
        }
        grid.cells = createEmptyGridCells();
        writeGrid();
        for (player in players) {
            players[player].lastCellCoords = null;
        }
        initGame();
    }
}

function createEmptyGridCells() {
    cells = []
    for (row = 0; row < grid.rows; row++) {
        cells.push([]);
        for (column = 0; column < grid.columns; column++) {
            cells[row].push(new Cell({captured: null, row: row, column: column}));
        }
    }
    return cells;
}

function delayedClosePlayersExpander() {
    setTimeout(function() {
        log("closing player expander after delay", 3);
        expandPart("players");
        setTimeout(function() {
            document.getElementById("expand-players-animator").style.height = 0;
        }, 100);
    }, 500);
}

function initGame() {
    log("initiating game", 1);
    transitionPlayGrid();
    requestFunction(updateGridTransforms, 200, "updateGridTransforms");
    updateGridStyles();
    updateData();
    if (game.won != null) {
        if (game.won == "") {
            gameEnd(true);
        } else {
            let player = players[game.won];
            game.playing = player.id;
            changeHue(player.hue);
            gameEnd(false, getWinCells(player.lastCell));
        }
    } else {
        turn();
    }
}

function turn() {
    log("starting turn", 2);
    game.playing = playersOrder[getTotalIndex(game.turn, playersOrder)];
    let currentPlayer = players[game.playing];
    changeHue(currentPlayer.hue);
    bannerMessage(getSymbolElementString(currentPlayer.symbol, 30, game.playing) + `<div style="margin-left: 10px;">plays</div>`);
    if (currentPlayer.computer) {
        playGrid.style.pointerEvents = "none";
        let moves = buildMoves(game.playing);
        setTimeout(function(fromGame) {
            if (fromGame.id == game.id) {
                let mistake = getRandomNumber(1, 1/currentPlayer.mistakeRate**2) == 1, chosenCell;
                if (mistake) {
                    log("computer player made a mistake", 2);
                    chosenCell = moves[Math.round(getRandomNumber(1, Math.max(1, currentPlayer.mistakeRate*3.5)))].cell;
                } else {
                    chosenCell = moves[0].cell;
                }
                nextTurn(chosenCell);
            }
        }.bind(null, structuredClone(game)), getRandomNumber(800, 1600));
    } else {
        playGrid.style.pointerEvents = "all";
    }
}

function nextTurn(chosenCell) {
    log("preparing for next turn", 2);
    let currentPlayer = players[game.playing];
    currentPlayer.cancelLastCellHighlight();
    configuration.soundEffects && soundEffects.placeSymbol.play();
    chosenCell.placeSymbol(game.playing);
    currentPlayer.lastCellCoords = [chosenCell.row, chosenCell.column];
    currentPlayer.highlightLastCell();
    if (!currentPlayer.computer && (configuration.confirmTurn == "always" || (configuration.confirmTurn == "touchscreen" && navigator.touchscreen))) {
        playGrid.style.pointerEvents = "none";
        transitionTurnConfirm(chosenCell);
    } else {
        finalizeTurn(chosenCell);
    }
}

function finalizeTurn(chosenCell) {
    log("finalizing turn", 2);
    let winCells = getWinCells(chosenCell);
    log(`checking win combo from cell ${chosenCell.row}, ${chosenCell.column}`, 3);
    if (winCells) {
        gameEnd(false, winCells);
    } else if (getEmptyGridCells().length == 0) {
        gameEnd(true);
    } else {
        game.turn += 1;
        saveData();
        turn();
    }
}

function gameEnd(draw, winCells) {
    let currentPlayer = players[game.playing];
    playGrid.style.pointerEvents = "none";
    if (!draw) {
        log("player won - ending game", 3);
        game.won = game.playing;
        bannerMessage(getSymbolElementString(currentPlayer.symbol, 30, game.playing) + `<div style="margin-left: 10px;">won</div>`);
        for (const cell of winCells) {
            cell.highlight(game.playing);
            cell.symbolElement.style.transform = "scale(3)";
            setTimeout(function(fromGame, cell) {
                cell.symbolElement.style.transform = "scale(1)";
            }.bind(null, structuredClone(game), cell), 170);
        }
    } else {
        log("not enough space on grid - ending game", 3);
        game.won = "";
        bannerMessage("draw");
    }
    saveData();
}

function transitionTurnConfirm(chosenCell) {
    let shownRight, shownLeft, hiddenRight, hiddenLeft;
    if (typeof chosenCell != "undefined") {
        log("showing confirmation buttons", 2);
        shownRight = document.getElementById("play-fab-play-svg");
        shownLeft = document.getElementById("menu-fab-open-svg");
        hiddenRight = document.getElementById("play-fab-confirm-svg");
        hiddenLeft = document.getElementById("menu-fab-close-svg");
        document.getElementById("right-main-button").onclick = confirmTurn.bind(null, chosenCell);
        document.getElementById("left-main-button").onclick = cancelTurn.bind(null, chosenCell);
        bannerMessage("confirm turn");
    } else {
        log("hiding confirmation buttons", 2);
        shownRight = document.getElementById("play-fab-confirm-svg");
        shownLeft = document.getElementById("menu-fab-close-svg");
        hiddenRight = document.getElementById("play-fab-play-svg");
        hiddenLeft = document.getElementById("menu-fab-open-svg");
        document.getElementById("right-main-button").onclick = startNewGame;
        document.getElementById("left-main-button").onclick = openMenu;
    }
    shownRight.style.opacity = 0;
    shownLeft.style.opacity = 0;
    setTimeout(function () {
        shownRight.style.display = "none";
        shownLeft.style.display = "none";
        hiddenRight.style.display = "block";
        hiddenLeft.style.display = "block";
        getComputedStyle(hiddenRight).opacity;
        getComputedStyle(hiddenLeft).opacity;
        hiddenRight.style.opacity = 1;
        hiddenLeft.style.opacity = 1;
    }, 160);
}

function confirmTurn(chosenCell) {
    transitionTurnConfirm();
    finalizeTurn(chosenCell);
}

function cancelTurn(chosenCell) {
    configuration.soundEffects && soundEffects.removeSymbol.play();
    let currentPlayer = players[game.playing];
    currentPlayer.cancelLastCellHighlight();
    chosenCell.removeSymbol();
    currentPlayer.lastCellCoords = null;
    playGrid.style.pointerEvents = "all";
    transitionTurnConfirm();
    bannerMessage(getSymbolElementString(currentPlayer.symbol, 30, game.playing) + `<div style="margin-left: 10px;">plays</div>`);
}

function playerPlaceSymbol(row, column) {
    let chosenCell = grid.cells[row][column];
    if (chosenCell.captured != null) {
        showToast("Cell is already captured.", `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="hsl(var(--hue), var(--top-accent))"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M7,11v2h10v-2H7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/></g></g></svg>`);
    } else {
        configuration.soundEffects && soundEffects.placeSymbol.play();
        log("player placed symbol", 2);
        nextTurn(chosenCell);
    }
}

function buildMoves(playerId) {
    log("building moves", 3);
    moves = [];
    moveCells = getEmptyGridCells();
    for (const cell of moveCells) {
        moves.push({cell: cell, points: getAllCellPoints(cell, playerId)});
    }
    log(moves, 4);
    return moves.sort(compareMoves);
}

function compareMoves(a, b) {
    if (a.points < b.points) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }
    return 0;
}

function getEmptyGridCells() {
    cells = [];
    for (const row of grid.cells) {
        for (cell of row) {
            if (cell.captured == null) {
                cells.push(cell);
            }
        }
    }
    return cells;
}

function getAllCellPoints(cell, playerId) {
    const playerPoints = getCellPoints(cell, playerId);
    log(`cell points in cell ${cell.row}, ${cell.column} are ${playerPoints} for ${playerId}`, 4);
    let opponentsPoints = 0;
    for (const opponentId of playersOrder) {
        if (opponentId != playerId) {
            opponentsPoints += getCellPoints(cell, opponentId);
            log(`cell points in cell ${cell.row}, ${cell.column} are ${opponentsPoints} for ${opponentId}`, 4);
        }
    }
    opponentsPoints = opponentsPoints/(playersOrder.length - 1)/players[playerId].agressivity;
    allCellPoints = (playerPoints + opponentsPoints) / 2;
    log(`all cell points in cell ${cell.row}, ${cell.column} are ${allCellPoints} for ${playerId}`, 4);
    return allCellPoints;
}

function getWinCells(cell) {
    log(`getting win symbol from cell ${cell.row}, ${cell.column} for ${game.playing}`, 5);
    let row, column, win = false, winCells = {axis0: [cell], axis45: [cell], axis90: [cell], axis135: [cell]}, currentWinCells;

    for (rowAdd = -1; rowAdd <= 1; rowAdd++)  {
        log(`rowAdd: ${rowAdd}`, 5);

        if (win !== false) {
            break;
        }

        for (columnAdd = -1; columnAdd <= 1; columnAdd++)  {
            log(`columnAdd: ${columnAdd}`, 5);

            if (rowAdd == 0 && columnAdd == 0) {
                continue;
            }
            if (win !== false) {
                break;
            }

            row = cell.row;
            column = cell.column;
            currentWinCells = `axis${getAxis(rowAdd, columnAdd)}`;
            while (Math.abs(cell.row - row) < configuration.winCombo - 1 && Math.abs(cell.column - column) < configuration.winCombo - 1) {

                row += rowAdd;
                column += columnAdd;

                if (row < 0 || row >= grid.rows || column < 0 || column >= grid.columns) {
                    break;
                }

                log(`checking cell: ${row}, ${column}`, 5);
                let cellPoints = getSingleCellPoints(grid.cells[row][column], game.playing, 1);
                if (cellPoints <= 0) {
                    break;
                } else if (cellPoints == 50) {
                    log(`adding winCell to ${currentWinCells}`, 5);
                    winCells[currentWinCells].push(grid.cells[row][column]);
                }
                if (winCells[currentWinCells].length == configuration.winCombo) {
                    if (checkCellComboOrder(winCells[currentWinCells])) {
                        win = winCells[currentWinCells];
                        break;
                    }
                }
            }
        }
    }
    return win;
}

function checkCellComboOrder(winCells) {
    let rows = [], columns = [];
    const order = Array.from(
        {length: configuration.winCombo},
        (_, index) => index + 1
    );
    
    winCells.forEach(cell => {
        rows.push(cell.row);
        columns.push(cell.column);
    });
    const smallestRow = Math.min(...rows);
    const smallestColumn = Math.min(...columns);
    rows = Array.from(rows, row => row - (smallestRow - 1));
    columns = Array.from(columns, column => column - (smallestColumn - 1));
    rows.sort();
    columns.sort();
    rows = rows.slice(0, 5);
    columns = columns.slice(0, 5);

    return rows.every((row, index) => row == order[index]) || columns.every((column, index) => column == order[index]);
}

function getCellPoints(cell, playerId) {
    log(`getting cell points in cell ${cell.row}, ${cell.column} for ${playerId}`, 5);
    let points = 0, multipliers = {axis0: 1, axis45: 1, axis90: 1, axis135: 1}, row, column, inferiority, currentAxis, cellPoints, addPoints, localMultiplier, winCellMultiplier, pointsBefore;

    if (cell.captured != null) {
        throw new Error("Cannot get cell points of already captured cell.")
    } else {
        for (rowAdd = -1; rowAdd <= 1; rowAdd++)  {
            log(`rowAdd: ${rowAdd}`, 5);

            for (columnAdd = -1; columnAdd <= 1; columnAdd++)  {
                log(`columnAdd: ${columnAdd}`, 5);

                if (rowAdd == 0 && columnAdd == 0) {
                    continue;
                }

                row = cell.row, column = cell.column;
                inferiority = 1;
                currentAxis = `axis${getAxis(rowAdd, columnAdd)}`;
                localMultiplier = multipliers[currentAxis];
                winCellMultiplier = 1;
                pointsBefore = points;
                while (Math.abs(cell.row - row) < configuration.winCombo - 1 && Math.abs(cell.column - column) < configuration.winCombo - 1) {

                    row += rowAdd;
                    column += columnAdd;

                    if (row < 0 || row >= grid.rows || column < 0 || column >= grid.columns) {
                        break;
                    }

                    log(`checking cell: ${row}, ${column}`, 5);
                    cellPoints = getSingleCellPoints(grid.cells[row][column], playerId, localMultiplier);
                    addPoints = (Math.round((cellPoints/inferiority)*100)/100)*Math.max(1, winCellMultiplier);
                    log(`adding ${addPoints} points`, 5);
                    points += addPoints;
                    inferiority *= 5.375/configuration.winCombo;
                    if (cellPoints <= 0) {
                        break;
                    }
                    if (cellPoints >= 30 && localMultiplier == multipliers[currentAxis]) {
                        multipliers[currentAxis] *= 125/configuration.winCombo**2;
                        localMultiplier = multipliers[currentAxis];
                        log(`increased global multiplier for ${currentAxis} to ${multipliers[currentAxis]}`, 5);
                        winCellMultiplier = Math.round(winCellMultiplier*(5.3/configuration.winCombo)*100)/100;
                        log(`increased winCell multiplier to ${winCellMultiplier}`, 5);
                    } else {
                        if (multipliers[currentAxis] > 1) {
                            localMultiplier = Math.max(localMultiplier/(125/configuration.winCombo**2)/2, 1);
                            log(`decreased local multiplier to ${localMultiplier}`, 5);
                        }
                        if (winCellMultiplier == 1) {
                            winCellMultiplier = 0;
                            log("winCell multiplier canceled", 5);
                        }
                    }
                }
            }
        }
    }
    log(`returning ${points} cell points in cell ${cell.row}, ${cell.column} for ${playerId}`, 5);
    return points;
}

function getAxis(rowAdd, columnAdd) {
    let axis;
    if (rowAdd == 0 && columnAdd != 0) {
        axis = 0;
    } else if (rowAdd*columnAdd < 0) {
        axis = 45;
    } else if (columnAdd == 0 && rowAdd != 0) {
        axis = 90;
    } else if (rowAdd*columnAdd > 0) {
        axis = 135;
    }
    return axis;
}

function getSingleCellPoints(cell, playerId, pointMultiplier) {
    let points;
    if (cell.captured == playerId) {
        points = 50*pointMultiplier;
    } else if (cell.captured == null) {
        points = 20;
    } else {
        points = 0;
    }
    log(`returning ${points} points`, 5);
    return points;
}

function transitionPlayGrid() {
    playGrid.style.display = "none";
    playGrid.scrollTop;
    playGrid.style.transform = "scale(1.1)";
    playGrid.style.opacity = 0;
    playGrid.style.display = "flex";
    playGrid.scrollTop;
    playGrid.style.opacity = 1;
}

function getTotalIndex(index, array) {
    return (index % array.length + array.length) % array.length;
}

function clearStorage() {
    if (confirm("This action will remove all data and preferences this app saved on your device. Are you sure?")) {
        window[storage].clear();
        location.reload();
    }
}

function resetStorage() {
    configuration = {gridRows: 25, gridColumns: 15, borderPart: 0.20, showCellIndexes: false, optimalCellSize: 30 , autoGridSizes: true, winCombo: 5, rotateGrid: true, theme: "auto", confirmTurn: "touchscreen", playedGames: {}, soundEffects: true};
    window[storage].setItem("configuration", JSON.stringify(configuration));
}

function restoreData() {
    const data = structuredClone(JSON.parse(window[storage].getItem("main")));
    log(`restoring data`, 1);
    configuration = data.configuration;
    restoreGame(data);
}

function restoreGame(data) {
    playersOrderRestored = data.playersOrder;
    const playersRecovered = data.players;
    expandPart("players");
    for (const playerId of playersOrderRestored) {
        players[playerId] = new Player(playersRecovered[playerId]);
    }
    delayedClosePlayersExpander();
    game = data.game;
    grid = data.grid;
    writeGrid();
    for (const [rowIndex, row] of grid.cells.entries()) {
        for (let [columnIndex, cell] of row.entries()) {
            grid.cells[rowIndex][columnIndex] = new Cell(cell);
        }
    }
    for (player in players) {
        players[player].highlightLastCell();
    }
    saveData();
    initGame();
}

function log(message, depth) {
    if (typeof depth == "undefined") {
        throw new Error("Log function is missing on depth argument.");
    }
    if (depth <= maxLogDepth) {
        console.log(message);
    }
}

function getOptimalGridCounts() {
    const optimalCellSize = configuration.optimalCellSize
    const cellBorder = optimalCellSize * configuration.borderPart
    const oneCellTotal = optimalCellSize + cellBorder
    const windowHeight = innerHeight - cellBorder - 69
    const windowWidth = innerWidth - cellBorder
    return [Math.round(windowHeight / oneCellTotal), Math.round(windowWidth / oneCellTotal)]
}

function changeHue(hue) {
    cssVariables.style.setProperty("--hue", hue);
}

function bannerMessage(message) {
    const banner = document.getElementById("main-banner");
    banner.style.transform = "scaleY(0)";
    setTimeout(function() {
        banner.innerHTML = message;
        banner.style.transform = "";
    }, 150)
}

function updateTheme() {
    let theme;
    if (configuration.theme == "auto") {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = "dark";
        } else {
            theme = "light";
        }
    } else if (configuration.theme == "dark") {
        theme = "dark";
    } else {
        theme = "light";
    }
    if (theme == "dark") {
        cssVariables.style.setProperty('--top-accent', `${saturationLight.back[0]}%, ${saturationLight.back[1]}%`);
        cssVariables.style.setProperty('--back-accent', `${saturationLight.top[0]}%, ${saturationLight.top[1]}%`);
        cssVariables.style.setProperty('--symbol-accent', `${saturationLight.symbolDark[0]}%, ${saturationLight.symbolDark[1]}%`);
        cssVariables.style.setProperty('--highlight-brightness', "1.8");
        cssVariables.style.setProperty('--cell-color', "black");
        cssVariables.style.setProperty('--text-color', "white");
    } else {
        cssVariables.style.setProperty('--top-accent', `${saturationLight.top[0]}%, ${saturationLight.top[1]}%`);
        cssVariables.style.setProperty('--back-accent', `${saturationLight.back[0]}%, ${saturationLight.back[1]}%`);
        cssVariables.style.setProperty('--symbol-accent', `${saturationLight.symbolLight[0]}%, ${saturationLight.symbolLight[1]}%`);
        cssVariables.style.setProperty('--highlight-brightness', "0.6");
        cssVariables.style.setProperty('--cell-color', "white");
        cssVariables.style.setProperty('--text-color', "black");
    }
}

function updateData() {
    applyData();
    saveData();
}

function applyData() {
    requestFunction(updateGridTransforms, 200, "updateGridTransforms");
    updateGridStyles();
    updateTheme();
}

function saveData() {
    log(`saving data`, 4);
    let data = {configuration: configuration, grid: grid, playersOrder: playersOrder, players: players, game: game};
    window[storage].setItem("main", JSON.stringify(data));
}

function closeAllExpanders() {
    Object.keys(expanded).forEach(expander => {
        if (expanded[expander]) {
            expandPart(expander);
        }
    })
}

function expandPart(expanderId) {
    let expandContent = document.getElementById(`expand-${expanderId}-content`);
    log(`expanding ${expanderId}`, 3);
    if (typeof expanded[expanderId] == "undefined") {
        expanded[expanderId] = false;
    }
    if (!expanded[expanderId]) {
        expanded[expanderId] = true;
        expandContent.style.display = "block";
        document.getElementById(`expand-${expanderId}-caret`).style.transform = "scaleY(-100%";
        document.getElementById(`expand-${expanderId}-animator`).style.height = (getComputedStyle(expandContent).height.replace("px", "")*1) + 5 + "px";
        expandCompleteTimeout = setTimeout(function () {
            document.getElementById(`expand-${expanderId}-animator`).style.height = (getComputedStyle(expandContent).height.replace("px", "")*1) + 5 + "px";
        }, 200);
        if (expanderId == "players") {
            updatePlayerDOMSizes();
        }
    } else {
        expanded[expanderId] = false;
        document.getElementById(`expand-${expanderId}-caret`).style.removeProperty("transform");
        document.getElementById(`expand-${expanderId}-animator`).style.removeProperty("height");
        clearTimeout(expandCompleteTimeout);
        setTimeout(function () {
            expandContent.style.display = "none";
        }, 210);
    }
}

function updateExpanderSize(expanderId) {
    log(`updating size of ${expanderId} expander`, 3);
    let expandContent = document.getElementById(`expand-${expanderId}-content`);
    document.getElementById(`expand-${expanderId}-animator`).style.height = (getComputedStyle(expandContent).height.replace("px", "")*1) + 5 + "px";
}

function updateOpenedExpanders() {
    Object.keys(expanded).forEach(expander => {
        if (expanded[expander]) {
            updateExpanderSize(expander);
        }
    });
}

function updateGridStyles() {
    cssVariables.style.setProperty("--cell-size", `${grid.cellSize}px`);
    cssVariables.style.setProperty("--cell-margin", `${configuration.borderPart*grid.cellSize/2}px`);
    if (configuration.showCellIndexes) {
        cssVariables.style.setProperty("--display-cell-index", "block");
    } else {
        cssVariables.style.setProperty("--display-cell-index", "none");
    }
}

function requestFunction(requestedFunction, throttleMs, requestId) {
    log(`requested function ${requestedFunction.name} after ${throttleMs}ms`, 4);
    clearTimeout(functionRequests[requestId]);
    functionRequests[requestId] = setTimeout(invokeRequestedFunction.bind(null, requestedFunction, requestId), throttleMs);
}

function invokeRequestedFunction(requestedFunction, requestId) {
    functionRequests[requestId] = undefined;
    requestedFunction();
}

function updateGridTransforms() {
    log("updating grid transforms", 2);
    let gridSizes = getGridSizes();
    let gridWidth = gridSizes[0];
    let gridHeight = gridSizes[1];
    let windowWidth = innerWidth - 40;
    let windowHeight = innerHeight - 69 - 40;
    let gridRatio = gridWidth/gridHeight;
    let gridRatioReversed = gridHeight/gridWidth;
    let windowRatio = windowWidth/windowHeight;
    let gridScale, gridRotation;
    if (Math.abs(gridRatio - windowRatio) > Math.abs(gridRatioReversed - windowRatio) && configuration.rotateGrid) {
        grid.rotated = true;
        [gridHeight, gridWidth] = [gridWidth, gridHeight];
    } else {
        grid.rotated = false;
    }
    if (grid.rotated) {
        gridRatio = 1/gridRatio;
    }
    if (gridRatio > windowRatio) {
        gridScale = windowWidth/gridWidth;
    } else {
        gridScale = windowHeight/gridHeight;
    }
    if (grid.rotated) {
        gridRotation = "rotate(90deg)";
    } else {
        gridRotation = "";
    }
    playGrid.style.transform = `scale(${gridScale}) ${gridRotation}`;
}

function getGridSizes() {
    const width = grid.columns*grid.cellSize + grid.columns*(grid.cellSize*configuration.borderPart) + grid.cellSize*configuration.borderPart;
    const height = grid.rows*grid.cellSize + grid.rows*(grid.cellSize*configuration.borderPart) + grid.cellSize*configuration.borderPart;
    return [width, height];
}

function writeGrid() {
    let rowElement, cellElement;
    log("writing grid", 2)
    playGrid.innerHTML = ""
    for (row = 0; row < grid.rows; row++) {
        rowElement = document.createElement("div");
        rowElement.id = `row-${row}`;
        playGrid.appendChild(rowElement);
        for (column = 0; column < grid.columns; column++) {
            cellElement = document.createElement("div");
            cellElement.id = `cell-${row}-${column}`;
            cellElement.setAttribute("class", "cell center-flex");
            cellElement.onclick = playerPlaceSymbol.bind(null, row, column);
            rowElement.appendChild(cellElement);
            cellElement.innerHTML = `<div class="cell-index">${row},${column}</div>`;
        }
    }
}

function showToast(message, icon) {
    log(`showing toast: ${message}`, 2);
    let toastElement = document.getElementById("toast"), toastText = document.getElementById("toast-text"), toastIcon = document.getElementById("toast-icon");

    toastText.innerHTML = message;
    toastIcon.innerHTML = icon;
    toastElement.style.display = "flex";
    getComputedStyle(toastElement).opacity;
    toastElement.style.opacity = 1;
    toastElement.style.transform = "translateY(0)";
    if (typeof toastTimeout == "undefined") {
        toastTimeout = setTimeout(function () {
            delete toastTimeout;
            hideToastElement();
        }, 1000 + (message.length * 60));
    } else {
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(function () {
            delete toastTimeout;
            hideToastElement();
        }, 3000);
    }
}

function hideToast() {
    if (typeof toastTimeout != "undefined") {
        clearTimeout(toastTimeout);
        delete toastTimeout;
    }
    hideToastElement();
}

function hideToastElement() {
    let toastElement = document.getElementById("toast");
    toastElement.style.opacity = "";
    toastElement.style.transform = "";
    setTimeout(function () {
        toastElement.style.display = "none";
    }, 130);
}

function getRandomId(characterPairs) {
    var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
    var vowels = ["a", "e", "i", "o", "u", "y"];
    var id = "";
    for (loop = 0; loop < characterPairs; loop++) {
        id = id + consonants[getRandomNumber(0, consonants.length - 1)];
        id = id + vowels[getRandomNumber(0, vowels.length - 1)];
    }
    return id;
}

function getRandomNumber(bottomIndex, topIndex) {
    var number = Math.round((Math.random() * (topIndex + 1 - bottomIndex)) + (bottomIndex - 0.5)) * 1;
    return number === -0 ? 0 : number;
}

function openMenu() {
    const dimmer = document.getElementById("dimmer"), menuElement = document.getElementById("menu"), openSvg = document.getElementById("menu-fab-open-svg"), closeSvg = document.getElementById("menu-fab-close-svg");

    if (menuOpened) {
        menuElement.style.transform = "";
        closeSvg.style.opacity = 0;
        setTimeout(function () {
            closeSvg.style.display = "none";
            openSvg.style.display = "block";
            getComputedStyle(openSvg).opacity;
            openSvg.style.opacity = 1;
        }, 160);
        dimmer.style.opacity = 0;
        setTimeout(function () {
            dimmer.style.display = "none";
            closeAllExpanders();
        }, 310);
        menuOpened = false;
        mode = "play";
        updateData();
    } else {
        dimmer.style.display = "block";
        setTimeout(function () {
            dimmer.style.opacity = 1;
        }, 10);
        if (menuStyle == "bottom") {
            menuElement.style.transform = "translateY(calc(-100% + 9px)";
        } else {
            menuElement.style.transform = "translateX(480px)";
        }
        openSvg.style.opacity = 0;
        setTimeout(function () {
            openSvg.style.display = "none";
            closeSvg.style.display = "block";
            setTimeout(function () {
                closeSvg.style.opacity = 1;
            }, 10);
        }, 160);
        setTimeout(function () {
        }, 300);
        menuOpened = true;
        mode = "menu";
    }
}

function updateMenuStyle() {
    const menuElement = document.getElementById("menu")
    const previousStyle = menuStyle;
    let menuForceClosed = false;
    if (innerWidth > innerHeight && innerWidth > 450 && menuStyle != "side") {
        menuElement.style.top = 0;
        menuElement.style.bottom = 0;
        menuElement.style.left = "-483px";
        menuElement.style.right = "";
        menuElement.style.width = "460px";
        menuElement.style.height = "100%";
        menuElement.style.borderTop = "";
        menuElement.style.borderRight = "3px solid hsl(var(--hue), var(--top-accent))";
        menuStyle = "side";
    } else if ((innerWidth <= innerHeight || innerWidth <= 450) && menuStyle != "bottom") {
        menuElement.style.left = 0;
        menuElement.style.right = 0;
        menuElement.style.top = "100%";
        menuElement.style.bottom = "";
        menuElement.style.width = "";
        menuElement.style.height = "calc(100% + 9px)";
        menuElement.style.borderRight = "";
        menuElement.style.borderTop = "3px solid hsl(var(--hue), var(--top-accent))";
        menuStyle = "bottom";
    }
    if (previousStyle != menuStyle) {
        if (menuOpened) {
            openMenu();
            menuForceClosed = true;
        }
    }
    if (menuForceClosed) {
        setTimeout(function () {
            openMenu();
        }, 310);
    }
}

registerServiceWorker();

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/tic-tac-toe/service-worker.js');
            console.log('service worker registered', reg);
            if (!matchMedia('(display-mode: standalone)').matches) {
                document.getElementById("install-app-button").style.display = "";
            }
        } catch (err) {
            console.error('service worker registration failed: ', err);
        }
        });
    }
}

addEventListener("beforeinstallprompt", function(event) {
    event.preventDefault();
    pwaInstallPrompt = event;
});

function installApp() {
    if (typeof pwaInstallPrompt != "undefined") {
        pwaInstallPrompt.prompt();
    } else {
        showToast("You can install the app from you browser action menu.", `<svg class="icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="hsl(var(--hue), var(--top-accent))"><g><rect fill="none" height="24" width="24" /></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z" /></g></svg>`)
    }
}

// hide splashscreeen after page loads
addEventListener("load", function () {
    setTimeout(function () {
        const splashscreen = document.getElementById("splashscreen");
        splashscreen.style.opacity = 0;

        setTimeout(function () {
            splashscreen.style.display = "none";
        }, 170);
    }, 250);
});
