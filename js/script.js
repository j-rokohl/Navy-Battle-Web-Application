//   MY SHIPS 
//-----------------------------------------------------------------

// My Ships (Class)

class Ship {
    constructor(boxWidth, name) {
        this.name = name;
        this.boxWidth = boxWidth;
        this.imgFull = name + ".svg";
        function sliceHoriz() {
            const imgSliceArrayH = [];
            for (let i = 0; i < boxWidth; i++) {
                const slice = "url('" + name + ".svg') -" + (i * 30) + "px 0px no-repeat";
                imgSliceArrayH.push(slice);
            };
            return imgSliceArrayH;
        }
        this.imgSliceArrayHoriz = sliceHoriz();
        function sliceVert() {
            const imgSliceArrayV = [];
            for (let i = 0; i < boxWidth; i++) {
                const slice = "url('./vertical/" + name + "Vertical.svg') 0px -" + (i * 30) + "px no-repeat";
                imgSliceArrayV.push(slice);
            };
            return imgSliceArrayV;
        }
        this.imgSliceArrayVert = sliceVert();
        this.once = 1;
    }
}


// My Ships (Created Objects)

const aircraftCarrier = new Ship(6, "aircraftCarrier");
const battleship = new Ship(5, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const destroyer = new Ship(2, "destroyer");


// My Ships: Grid From 100 HTML Divs

const myGrid = document.querySelectorAll("#myShips div div"); // For HTML Attributes
const myShipId = document.getElementById("myShips"); // For event listeners


// My Ships: Each box as an object (Class)

class Box {
    constructor(index, occupied) {
        this.index = index;
        this.rowIndex = +String(this.index).padStart(2, '0').slice(0, 1);
        this.columnIndex = +String(this.index).slice(-1);
        this.occupied = occupied
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
        myBoxArray.push(newBox);
        i++;
    });
}
setGrid();


// 1. Cursor Event Listener

let button = "";
function buttonListener(btn, svg){
    document.getElementById(btn).addEventListener("click", function(event) {
    const shipCursor = document.querySelector("body");
    shipCursor.style.cursor = "url("+ svg +".svg), auto";
    button = btn;
    boolButtonListener(btn);
    callHighlighters();
    bodyClickNoCursor(btn);
})}

buttonListener("aircraftCarrier", "aircraftCarrier");
buttonListener("battleship", "battleship");
buttonListener("cruiser", "cruiser");
buttonListener("submarine" , "submarine");
buttonListener("destroyer", "destroyer");
buttonListener("rotateAircraftCarrier", "aircraftCarrier");
buttonListener("rotateBattleship", "battleship");
buttonListener("rotateCruiser", "cruiser");
buttonListener("rotateSubmarine" , "submarine");
buttonListener("rotateDestroyer", "destroyer");


// 2. Set Horizontal Attribute to true or false

let rotateButton = "";
function boolButtonListener(btn){

    const element = document.getElementById(btn);
    const parent = element.parentElement.parentElement;
    const placeElement = parent.getElementsByClassName("place");
    const placeButton = placeElement[0].getElementsByClassName("btn-dark");
    //console.log(element.innerHTML);
    if  (element.innerHTML == "Vertical"){
        placeButton[0].dataset.horizontal = "false";  
    }
    else if (element.innerHTML == "Horizontal") {
        placeButton[0].dataset.horizontal = "true";  
    }
    //console.log(placeButton[0].dataset.horizontal);

}


// 2. Specify Highligters

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
    case "rotateAircraftCarrier":
        placeShip(aircraftCarrier, 6);
        break;
    case "rotateBattleship":
        placeShip(battleship, 5);
        break;
    case "rotateCruiser":
        placeShip(cruiser, 3);
        break;
    case "rotateSubmarine":
        placeShip(submarine, 3);
        break;
    case "rotateDestroyer":
        placeShip(destroyer, 2);
        break;
    }
}


// 3. Event Listener on Place Ship Buttons

function placeShip(shipObject, shipL) {
        const placeButtonHorizontal = document.getElementById(shipObject.name).dataset.horizontal;
        const oneTime = shipObject.once;
        switch (oneTime)
        {
            case 0:
                alert("This ship is already placed. Press the Reset button if you need to place your ships again.");
                
        }
        if (placeButtonHorizontal == "true"){
            horizontalHighlightListener("mouseover", shipL, "#4c7bad");
            horizontalHighlightListener("mouseout", shipL, "");
            dropImageHorizontal(shipObject, shipL);    
        }
        else if (placeButtonHorizontal == "false"){
            verticalHighlightListener("mouseover", shipL, "#4c7bad");
            verticalHighlightListener("mouseout", shipL, ""); 
            dropImageVertical(shipObject, shipL);       
        }  
}


// 4. HORIZONTAL Drag and Drop Highlight Event Listeners

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
            
            if (firstRowIndex != 9){ //Rows 1 - 8
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


// 4. VERTICAL Drag and Drop Highlight Event Listeners 

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


// 5. Remove Special Cursors when Clicking Outside the Grid

function bodyClickNoCursor () {
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


// 6. Horizontal Drop Image in Squares (Add Event Listener)

function dropImageHorizontal(shipObject, shipLength){
    myShipId.addEventListener("click", function(event) {
        if (event.target.classList.contains('box')) {
            let getIndex = +event.target.dataset.index;
            const lastB = +getIndex + (shipLength - 1);
            const firstRowIndex = myGrid[getIndex].dataset.rowindex;
            const lastRowIndex = myGrid[lastB - 1].dataset.rowindex;
            const shipLast = shipLength - 1;
            if (shipObject.once == 0){
                // Exit
            }
            else if (firstRowIndex == lastRowIndex) {
                const newArr = document.querySelectorAll("#myShips div div"); // Identity function
                let arrayStart2 = 0;
                let i2 = +getIndex;
                let testArr = [];
                do{
                    let ship = String(shipObject.name);
                    testArr.push(ship);
                    newArr[i2].setAttribute("class", "box horizontal");
                    newArr[i2].style.background = shipObject.imgSliceArrayHoriz[arrayStart2];
                    arrayStart2 = arrayStart2 +1;
                    i2++;
                    }
                while (arrayStart2 <= shipLast);
                shipObject.once = 0;
            }
        }
    }, { once: true });
}


// 6. Vertical Drop Image in Squares (Add Event Listener)

function dropImageVertical(shipObject, shipLength){
    myShipId.addEventListener("click", function(event) {
        if (shipObject.once == 0){
            // Exit
        }
        else if (event.target.classList.contains('box')) {
            let getIndex = +event.target.dataset.index;
            let arrayStart = 0;
            let i = +getIndex;
            const newArr = document.querySelectorAll("#myShips div div");
            do{
                newArr[i].setAttribute("class", "box vertical");
                newArr[i].style.background = shipObject.imgSliceArrayVert[arrayStart];
                arrayStart = arrayStart + 1;
                i = i+10;
                }
            while (arrayStart <= shipLength - 1);
            shipObject.once = 0;
        }
    }, { once: true });
}


// 7. Reset the Game

function resetMyShipGrid(btnId){
    document.getElementById(btnId).addEventListener("click", function(event) {
        location. reload();
    })
}
resetMyShipGrid("restart");



//   YOUR SHIPS 
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