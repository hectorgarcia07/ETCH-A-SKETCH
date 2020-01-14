var parent = document.getElementById("etchBox");
var number = 5;
var resetButton = document.getElementById("reset");
var resolution = document.getElementById("resolution");
var colorStyle = document.getElementById("colorStyle");
var isGreyScale = false;
var cells = [];
var shadeBlack = ["rgb(230, 230, 230)", "rgb(205, 205, 205)",
                  "rgb(180, 180, 180", "rgb(155, 155, 155)",
                  "rgb(130, 130, 130)", "rgb(105, 105, 105)",
                  "rgb(80, 80, 80)", "rgb(55, 55, 55)",
                  "rgb(30, 30, 30)", "rgb(0, 0, 0)"
                    ];

//if button clicked, reset and prompt the user for 
//a new resolution
resetButton.addEventListener('click', () => {
    resetScreen();
});

//resets the screen resolution; Must be an integer >= 1 
//or integer <= 100
function resetScreen(){
    var newNum = null;
    var isValid = false;
    do{
        newNum = prompt("Enter new resolution: ");
        
        //if user cancles, quit loop and don't change anything
        if(newNum == null)
            isValid = true;
        else if(newNum.toString().indexOf('.') != -1)
        {
            alert("Error: Must be an integer, not a decimal.");
        } 
        else
        {
            //make sure its a number and number >= 1 and number <= 100 and 
            //delete all nodes
            //else make user prompt a new number
            if(!isNaN(newNum) && newNum >= 1 && newNum <= 100)
            {
                isValid = true;
                number = +newNum;
                removeNodeChild();
                drawScreen();
                resolution.innerHTML = '';
                updateResolution();
            }
            else
                alert("Error: Must be a valid interger >= 1 or <= 100.");
        }
    }while(!isValid);
}

//will remove pre-existing nodes in DOM
function removeNodeChild()
{
    let allCol = document.getElementById("etchBox");
    allCol.innerHTML = '';
    cells = [];
}

//will draw the a number x number board
function drawScreen(){
    //create row column of divs
    for(let i = 0; i < number; i++)
    {
        let col = document.createElement("div");
        col.className = "column-style";
        for(let j = 0; j < number; j++)
        {
            //creates a new cell object
            new Cell(col);
        }
        parent.appendChild(col);
    }
}

//each cell will contain the current color and will update if needed
//it will also determine the grey scale number of passes. Will also update
//collor depending on the pass number
function Cell(obj){
    this.pass = 0;

    this.element = document.createElement("div");
    this.element.className = "cellStyle";

    //will be used to change the shades of black
    cells.push(this);

    this.element.addEventListener("mouseover", this);
    obj.appendChild(this.element);
}

//will be used to call if mouse 'hovers' on cell
Cell.prototype.handleEvent = function(obj){
    switch(obj.type){
        case "mouseover": this.mouseover(obj);
    }
}

//change color of cell depending of what option has been 
//selected from the dropdown.
Cell.prototype.mouseover = function(obj){
    //get what the current selected option is
    let colorPixle = colorStyle.options[colorStyle.selectedIndex].value;
    
    //change color depending on what the selcted option is
    if(colorPixle === "default")
    {
        this.element.style.backgroundColor = shadeBlack[9];
        //if the greyscale has been changed, reset all passes
        //from the pixel to 0
        if(isGreyScale)
            resetPasses();
    }
    else if(colorPixle === "greyscale")
    {
        //change the color to a diffrent shade of black
        if(this.pass < 10)
        {
            this.element.style.backgroundColor = shadeBlack[this.pass];
            this.pass++;
        }
        isGreyScale = true;
    }
    else if(colorPixle === "rainbow")
    {
        this.element.style.backgroundColor = random_rgb();
        //if the greyscale has been changed, reset all passes
        //from the pixel to 0
        if(isGreyScale)
            resetPasses();
    }
}

//will reset each cells 'pass value'
function resetPasses(){
    cells.forEach(e => e.pass = 0);

    isGreyScale = false;
}

//will update the current resolution to a new one
function updateResolution(){
    let str = number.toString() + " x " + number.toString();
    resolution.insertAdjacentHTML('beforeend', str);
}

//returns random rgb color
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+')';
}

//draw the screen when page is reloaded with default size
//as well as display resolution and pixel color used when hover
drawScreen();
updateResolution();