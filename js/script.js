//-------------__FFF_----------------------------------------------
//   MY SHIPS  \____/
//-----------------------------------------------------------------


// My Ships (Template/Class)
class Ship {
    constructor(boxWidth, name) {
        this.name = name;
        this.boxWidth = boxWidth;
        this.imgFull = name + ".svg";
        this.horizontal = true;
        function slice() {
            const imgSliceArray = [];
            for (let i = 0; i < boxWidth; i++) {
                const slice = "url('" + name + ".svg') -" + (i * 30) + "px 0px no-repeat";
                imgSliceArray.push(slice);
            };
            return imgSliceArray;
        }
        this.imgSliceArray = slice();
    }
}


// My Ships (Created Objects)
const aircraftCarrier = new Ship(6, "aircraftCarrier");
const battleship = new Ship(5, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const destroyer = new Ship(2, "destroyer");


// My Ships: Grid From 100 HTML Divs
const myGrid = document.querySelectorAll("#myShips div div");//For HTML Attributes
const myShipId = document.getElementById("myShips");//For event listeners


// My Ships: Each box as an object (Template/Class)
class Box {
    constructor(index, occupied, backgroundImage) {
        this.index = index;
        this.rowIndex = +String(this.index).padStart(2, '0').slice(0, 1);
        this.columnIndex = +String(this.index).slice(-1);
        this.occupied = false,
        this.backgroundImage = "explosion.png"
    }
}

// My Ships: Set each box as an object and add HTML attrbutes (Created Objects)
function setGrid(){
    const myBoxArray = [];
    let newBox;
    let i = 0;
    myGrid.forEach(function () {
        newBox = new Box(i);
        myGrid[i].setAttribute("data-index", newBox.index);
        myGrid[i].setAttribute("data-rowindex", newBox.rowIndex);
        myGrid[i].setAttribute("data-columnindex", newBox.columnIndex);
        myGrid[i].setAttribute("data-occupied", newBox.occupied);
        myGrid[i].setAttribute("data-backgroundindex", newBox.backgroundIndex);
        myBoxArray.push(newBox);//This might not be needed
        i++;
    });
}
setGrid();


// My Ships: HORIZONTAL Drag and Drop Highlight Event Listeners (Function)
    function horizontalHighlightListener(eventType, shipLength, highlightColor) {
        myShipId.addEventListener(eventType, function (event) {
            if(event.target.classList.contains('box')) {
                const getIndex = +event.target.dataset.index;            // First index value
                const firstRowIndex = myGrid[getIndex].dataset.rowindex; // First row index
                const lastBox = getIndex + shipLength;
                const rowNineShip = shipLength-1;
                const rowNineArray = [90,91,92,93,94,95,96,97,98,99];
                const rowNineLast = rowNineArray.slice(0, -rowNineShip);

                function resetEventBkg() {
                    for (let i = 0; i <= 99; i++) {
                        myGrid[i].style.backgroundColor = "";
                    }
                }

                function highlightBoxRange() {    
                    resetEventBkg();                    
                    for (let i = getIndex; i < lastBox; i++) {
                        myGrid[i].style.backgroundColor = highlightColor;
                    }
                }
             
                function defaultCursor() {
                    myGrid[getIndex].style.cursor = "";
                }

                function noCursor() {
                    myGrid[getIndex].style.cursor = "not-allowed";
                    resetEventBkg();
                }

                switch (firstRowIndex == 9) { // Last row caused errors before
                    case (getIndex > rowNineLast[rowNineLast.length-1]):
                        noCursor();
                    break;
                    case (getIndex <= rowNineLast[rowNineLast.length-1]):
                        highlightBoxRange();
                        defaultCursor();
                    break;
                    }
                
                if (firstRowIndex != 9){       //Rows 1 - 8
                let lastRowIndex = myGrid[lastBox - 1].dataset.rowindex;
                    if (firstRowIndex != lastRowIndex){
                        noCursor();
                    }
                    else if (firstRowIndex == lastRowIndex){
                        highlightBoxRange();
                        defaultCursor();
                    }
                }
            }
        });
    }


// My Ships: VERTICAL Drag and Drop Highlight Event Listeners (Function)
function verticalHighlightListener(eventType, shipLength, highlightColor) {
    myShipId.addEventListener(eventType, function (event) {
        if(event.target.classList.contains('box')) {
            const getIndex = +event.target.dataset.index;
            const shipLengthTen = (shipLength - 1) * 10;
            const lastBox = getIndex + shipLengthTen;

            function resetEventBkg() {
                for (let i = 0; i <= 99; i++) {
                    myGrid[i].style.backgroundColor = "";
                }
            }

            function highlightBoxRange() {    
                resetEventBkg();                    
                for (let i = getIndex; i <= lastBox; i+=10) {
                    myGrid[i].style.backgroundColor = highlightColor;
                }
            }

            function noCursor() {
                myGrid[getIndex].style.cursor = "not-allowed";
                resetEventBkg();
            }
        
            function defaultCursor() {
                myGrid[getIndex].style.cursor = "";
            }
                if (getIndex > (99 - shipLengthTen)){
                    noCursor();
                }
                else {
                   highlightBoxRange();
                   defaultCursor();
                }
            }
    });
}


// Cursor Event Listener (Set Function)
let button = "";
function buttonListener(btn){
    document.getElementById(btn).addEventListener("click", function(event) {
    const shipCursor = document.querySelector("body");
    shipCursor.style.cursor = "url("+ btn +".svg), auto";
    button = btn;
    callHighlighters();
    bodyClickNoCursor(btn);
})}
buttonListener("aircraftCarrier");
buttonListener("battleship");
buttonListener("cruiser");
buttonListener("submarine");
buttonListener("destroyer");


function callHighlighters(){
    switch (button)
    {
    case "aircraftCarrier":
        placeShip(aircraftCarrier, 6);
        break;
    case "battleship":
        placeShip(battleship, 5);
        break;
    case "cruiser":
        placeShip(cruiser, 3);
        break;
    case "submarine":
        placeShip(submarine, 3);
        break;
    case "destroyer":
        placeShip(destroyer, 2);
        break;
    }
}


// Drop Image in Squares
function dropImageHorizontal(shipObject, shipLength){
    myShipId.addEventListener("click", function(event) {
        if (event.target.classList.contains('box')) {
            let getIndex = +event.target.dataset.index;
            const lastB = +getIndex + shipLength;
            const firstRowIndex = myGrid[getIndex].dataset.rowindex;
            const lastRowIndex = myGrid[lastB - 1].dataset.rowindex;
            if (firstRowIndex == lastRowIndex) {
                let arrayStart = 0;
                let i = +getIndex;
                do{
                    myGrid[i].classList.add(shipObject.name);
                    myGrid[i].style.background = shipObject.imgSliceArray[arrayStart];
                    arrayStart = arrayStart +1;
                    i++;
                    }
                while (arrayStart < shipLength);
                shipObject.imgSliceArray = [];
                shipObject.name = ["empty"];
            }
        }
    });
}


// Event Listener on Place Ship Button (Function)
function placeShip(shipObject, shipL) {
    try {
        const placeButtonHorizontal = document.getElementById(shipObject.name).dataset.horizontal;
        const shipCursor = document.querySelector("body");
        shipCursor.style.cursor = "url(./"+ shipObject.name +".svg), auto";
        if (placeButtonHorizontal == "true"){
            horizontalHighlightListener("mouseover", shipL, "#4c7bad");
            horizontalHighlightListener("mouseout", shipL, "");
            dropImageHorizontal(shipObject, shipL);       
        }
        else if (placeButtonHorizontal == "false"){
            verticalHighlightListener("mouseover", shipL, "#4c7bad");
            verticalHighlightListener("mouseout", shipL, "");       
        }
    }
    catch {
        alert("This ship is already placed.")
    }
}


// Change Button layout if Rotated & Set Horizontal Attribute
let rotateButton = "";
function rotateButtonListener(btn){
    document.getElementById(btn).addEventListener("click", function() {
        const rotateElement = document.getElementById(btn);
        const parent = rotateElement.parentElement.parentElement;
        const placeElement = parent.getElementsByClassName("place");
        const placeButton = placeElement[0].getElementsByClassName("btn-dark");
        const contains = parent.classList.contains("btn-left");
        if  (contains == false){
            parent.classList.add("btn-left");
            placeButton[0].setAttribute("data-horizontal", "false");   
            callHighlighters();
        }
        else if (contains == true) {
            parent.classList.remove("btn-left");
            placeButton[0].setAttribute("data-horizontal", "true");  
            callHighlighters();
        }
})}
rotateButtonListener("rotateAircraftCarrier");
rotateButtonListener("rotateBattleship");
rotateButtonListener("rotateCruiser");
rotateButtonListener("rotateSubmarine");
rotateButtonListener("rotateDestroyer");


// Remove Special Cursors when Clicking Outside the Grid
function bodyClickNoCursor (btn) {
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains('btn') == true ||
            event.target.classList.contains('fa-4') == true){
            //do nothing
        }
        else {
            for (let i = 0; i <= 99; i++) {
                horizontalHighlightListener("mouseover", 0, "");
                verticalHighlightListener("mouseover", 0, "");
                document.body.style.cursor = "default";
            }
        }
    })
}


// Reset the Game

function resetMyShipGrid(btnId){
    document.getElementById(btnId).addEventListener("click", function(event) {
        location. reload();
    })
}
resetMyShipGrid("restart");


//----------------__FFF_-------------------------------------------
//   YOUR SHIPS   \____/
//-----------------------------------------------------------------


// Your Ships: Grid From 100 HTML Divs 
const yourGrid = document.querySelectorAll("#yourShips div div");


//Your Ships: 'Splash', 'Explode', & 'Erase' Graphics
yourGrid.forEach(function (event) {
    const pegs = ["url('./pegs/splash.png')", "url('./pegs/explosion.png')", "url('./pegs/clear.png')"];
    event.addEventListener("click", function () {
        peg = pegs.shift();
        pegs.push(peg);
        event.style.backgroundImage = peg;
    });
})


//Your Ships: 'Splash', 'Explode', & 'Woosh' Sounds
const splash = new Audio("./sounds/splash.mp3");
const explosion = new Audio("./sounds/explode.mp3");
const clear = new Audio("./sounds/woosh.mp3");
yourGrid.forEach(function (event) {
    const sounds = [splash, explosion, clear];
    event.addEventListener("click", function () {
        sound = sounds.shift();
        sounds.push(sound);
        sound.play();
    });
})


//Your Ships: Sink Ships Button
function sinkShips(btnId, img, imgReplace){
    document.getElementById(btnId).addEventListener("click", function(event) {
        const sinkId = document.getElementById(btnId);
        const parent = sinkId.parentElement.parentElement;
        const sinkSvg = parent.getElementsByClassName("sink-svg");
        if (sinkId.dataset.horizontal == "false") {
            sinkSvg[0].children[0].src = imgReplace;
            sinkId.setAttribute("data-horizontal", "true");
            sinkId.innerHTML = "Undo";
        }
        else if (sinkId.dataset.horizontal == "true")  {
            sinkSvg[0].children[0].src = img;
            sinkId.setAttribute("data-horizontal", "false"); 
            sinkId.innerHTML = "Sunk";
        }
})}
sinkShips("sinkAircraftCarrier", "./your-ships/yourAircraftCarrier.svg", "./your-ships/yourAircraftCarrierSunk.svg");
sinkShips("sinkBattleship", "./your-ships/yourBattleship.svg", "./your-ships/yourBattleshipSunk.svg");
sinkShips("sinkCruiser", "./your-ships/yourCruiser.svg", "./your-ships/yourCruiserSunk.svg");
sinkShips("sinkSubmarine", "./your-ships/yourSubmarine.svg", "./your-ships/yourSubmarineSunk.svg");
sinkShips("sinkDestroyer", "./your-ships/yourDestroyer.svg", "./your-ships/yourDestroyerSunk.svg");


// Slider Value
const slider = document.getElementById("slider");
const output = document.getElementById("output");
output.innerHTML = "0"; 
slider.oninput = function() {
  output.innerHTML = this.value;
}

