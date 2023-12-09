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
        this.occupied = "false";
    }
}


// My Ships: Set each box as an object and add HTML attrbutes (Created Objects)

function setGrid(){
    const myBoxArray = [];
    let newBox;
    let i = 0;
    myGrid.forEach(function () {
        newBox = new Box(i);
        myGrid[i].setAttribute("data-occupied", newBox.occupied);
        myGrid[i].setAttribute("data-index", newBox.index);
        myGrid[i].setAttribute("data-rowindex", newBox.rowIndex);
        myGrid[i].setAttribute("data-columnindex", newBox.columnIndex);
        myGrid[i].setAttribute("data-ship", "none");
        myGrid[i].setAttribute("data-slice", "none");
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

            if (getIndex == 0){ // Prevent error from if statement below
                highlightBoxRange();
                defaultCursor();
            }

            else if (firstRowIndex != 9){ //Rows 1 - 8
            let lastRowIndex = myGrid[lastBox-1].dataset.rowindex;
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
            const lastRowIndex = myGrid[lastB].dataset.rowindex;
            const shipLast = shipLength - 1;
            const newArr = document.querySelectorAll("#myShips div div"); // Identity function
            const readArr = [];

            // Exit if already placed
            if (shipObject.once == 0){
                return;
            }

            // Exit if image will be segmented into two rows
            else if (firstRowIndex != lastRowIndex) {
                alert ("This ship goes off the board. Please try another spot.")
                return;
            }

            // Read the Spot
            let x = +getIndex;
            for (let arrRead = 0; arrRead <= shipLast; arrRead++){
                let read = newArr[x].getAttribute("data-occupied");
                readArr.push(read);
                x++;
            }

            // Exit if Occupied
            for (let y = 0; y <= readArr.length; y++) {
                if (readArr[y] == "true"){
                    alert ("You cannot place ships over other ships. Please try another spot.")
                    return;
                }
            }

            // Fill the Spot if Unoccupied
            let i = +getIndex;
            for (let arrStart = 0; arrStart <= shipLast; arrStart++){
                    let shipString = String(shipObject.name);
                    newArr[i].setAttribute("class", "box horizontal");
                    newArr[i].dataset.occupied = "true";
                    newArr[i].dataset.ship = shipString;
                    newArr[i].style.background = shipObject.imgSliceArrayHoriz[arrStart];
                    newArr[i].dataset.slice = String(shipObject.imgSliceArrayHoriz[arrStart]);
                    i++;
            }
            
            // Mark the ship as placed
            shipObject.once = 0;
            }
    }, { once: true }); // Once: true prevents the listener from continuing, which leads to bugs
}


// 6. Vertical Drop Image in Squares (Add Event Listener)

function dropImageVertical(shipObject, shipLength){
    myShipId.addEventListener("click", function(event) {
        let shipString = String(shipObject.name);
        let getIndex = +event.target.dataset.index;
        const shipLengthTen = (shipLength - 1) * 10;
        const newArr = document.querySelectorAll("#myShips div div");
        const readArr = [];

        // Exit if already placed
        if (shipObject.once == 0){
            return;
        }

        // Exit if the box is on the letters
        else if (!event.target.classList.contains('box')) {
            return;
        }

        // Exit if the image will go off the board
        else if (+getIndex + shipLengthTen > 99) {
            alert ("This ship goes off the board. Please try another spot.")
            return;
        }

        // Read the Spot
        let x = +getIndex;
        for (let arrRead = 0; arrRead <= shipLength - 1; arrRead++){
            let read = newArr[x].getAttribute("data-occupied");
            readArr.push(read);
            x+10;
        }

        // Exit if Occupied
        for (let y = 0; y <= readArr.length; y++) {
            if (readArr[y] == "true"){
                alert ("You cannot place ships over other ships. Please try another spot.")
                return;
            }
        }

        // Fill the Spot if Unoccupied
        let i = +getIndex;
        for (let arrayStart = 0; arrayStart <= shipLength - 1; arrayStart++){
            newArr[i].setAttribute("class", "box vertical");
            newArr[i].dataset.occupied = "true";
            newArr[i].dataset.ship = shipString;
            newArr[i].style.background = shipObject.imgSliceArrayVert[arrayStart];
            newArr[i].dataset.slice = String(shipObject.imgSliceArrayVert[arrayStart]);
            i = i+10;
        }
            
        // Mark the ship as placed
        shipObject.once = 0;

    }, { once: true }); // Once: true prevents the listener from continuing, which leads to bugs
}

// 7. Erase an Individual Ship 

function eraseShip(shipObject, buttonName){
    document.getElementById(buttonName).addEventListener("click", function(event) {
        const newArr = document.querySelectorAll("#myShips div div");
        const shipString = String(shipObject.name);
        for (let i = 0; i <100; i++){
            if (newArr[i].dataset.ship == shipString) {
                newArr[i].setAttribute("class", "box");
                newArr[i].dataset.ship = "none";
                newArr[i].style.background = "";
            }
        }
        shipObject.once = 1;
    });
}
eraseShip(aircraftCarrier, "eraseAircraftCarrier");
eraseShip(battleship, "eraseBattleship");
eraseShip(cruiser, "eraseCruiser");
eraseShip(submarine , "eraseSubmarine");
eraseShip(destroyer, "eraseDestroyer");


// 8. Play the Game

function playTheGame(btnId){
    document.getElementById(btnId).addEventListener("click", function(event) {
        document.getElementById("wrapper").innerHTML= `<h2 class="text-center">My Vessels</h2>
        <div class=sink-div><div class=sink-svg><img alt="My Aircraft Carrier"height=20 src=./aircraftCarrier.svg>
        <p class=labels>USS Aircraft Carrier</div><div class=sink><a class="btn btn-secondary btn-sm" 
        data-horizontal=false id=sinkMyAircraftCarrier>Sunk</a></div></div><div class=sink-div><div class=sink-svg>
        <img alt="My Battleship"height=20 src=./battleship.svg><p class=labels>USS Battleship</div><div class=sink>
        <a class="btn btn-secondary btn-sm"data-horizontal=false id=sinkMyBattleship>Sunk</a></div></div>
        <div class=sink-div><div class=sink-svg><img alt="My Cruiser"height=20 src=./cruiser.svg><p class=labels>USS Cruiser</div>
        <div class=sink><a class="btn btn-secondary btn-sm"data-horizontal=false id=sinkMyCruiser>Sunk</a></div></div>
        <div class=sink-div><div class=sink-svg><img alt="My Submarine"height=20 src=./submarine.svg><p class=labels>USS Submarine</div>
        <div class=sink><a class="btn btn-secondary btn-sm"data-horizontal=false id=sinkMySubmarine>Sunk</a></div></div>
        <div class=sink-div><div class=sink-svg><img alt="My Destroyer"height=20 src=./destroyer.svg>
        <p class=labels>USS Destroyer</div><div class=sink><a class="btn btn-secondary btn-sm"data-horizontal=false id=sinkMyDestroyer>
        Sunk</a></div></div>
        `;
        // My Ships
        sinkShips("sinkMyAircraftCarrier", "./aircraftCarrier.svg", "./my-ships/myAircraftCarrierSunk.svg");
        sinkShips("sinkMyBattleship", "./battleship.svg", "./my-ships/myBattleshipSunk.svg");
        sinkShips("sinkMyCruiser", "./cruiser.svg", "./my-ships/myCruiserSunk.svg");
        sinkShips("sinkMySubmarine", "./submarine.svg", "./my-ships/mySubmarineSunk.svg");
        sinkShips("sinkMyDestroyer", "./destroyer.svg", "./my-ships/myDestroyerSunk.svg");
        // Make Grid Functional
        myPegs();
    })
}
playTheGame("ready");


// 10. My Ships: (Unoccupied: 'Splash', 'Erase') || (Occupied: 'Explose', 'Img')

function myPegs(){
    myGrid.forEach(function (event) {
        let slice = event.getAttribute("data-slice");
        let Opegs = ["url('./pegs/splash.png')", "url('./pegs/clear.png')"];
        let Upegs = ["url('./pegs/explosion.png')" , slice];
        event.addEventListener("click", function () {
            const occupied = event.getAttribute("data-occupied");
            if (occupied == "false") {
                let peg = Opegs.shift();
                Opegs.push(peg);
                event.style.backgroundImage = peg;
            }
            else if (occupied == "true") {
                let peg = Upegs.shift();
                Upegs.push(peg);
                event.style.background = peg;
            }
        })
    });
}


// 11. Reset the Game

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
        let peg = pegs.shift();
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
// Your Ships
sinkShips("sinkAircraftCarrier", "./your-ships/yourAircraftCarrier.svg", "./your-ships/yourAircraftCarrierSunk.svg");
sinkShips("sinkBattleship", "./your-ships/yourBattleship.svg", "./your-ships/yourBattleshipSunk.svg");
sinkShips("sinkCruiser", "./your-ships/yourCruiser.svg", "./your-ships/yourCruiserSunk.svg");
sinkShips("sinkSubmarine", "./your-ships/yourSubmarine.svg", "./your-ships/yourSubmarineSunk.svg");
sinkShips("sinkDestroyer", "./your-ships/yourDestroyer.svg", "./your-ships/yourDestroyerSunk.svg");



//   ADDITIONAL FUNCTIONALITY
//-----------------------------------------------------------------


// Close Modal Click
function closeModalClick(btnId){
    document.getElementById(btnId).addEventListener("click", function(event) {
        document.getElementById('modal').style.display='none';
    }, { once: true });
}
closeModalClick("closeModal1");
closeModalClick("closeModal2");


// Close Modal Focus
function closeModalFocus(btnId){
    document.getElementById(btnId).addEventListener('keydown', (event) => {
        if (event.key == "Enter") {
            document.getElementById('modal').style.display='none';
        }
    }, { once: true });
}
closeModalFocus("closeModal1");
closeModalFocus("closeModal2");


// Slider Value
const slider = document.getElementById("slider");
const output = document.getElementById("output");
output.innerHTML = "0"; 
slider.oninput = function() {
    output.innerHTML = this.value;
}