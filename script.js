var parent = document.getElementById("etchBox");
var number = 5;
var resetButton = document.getElementById("reset");
var resolution = document.getElementById("resolution");
var pixelColor = document.getElementById("pixelColor");
var rgbColor = "rgb(0,0,255)";
var colorStyle = document.getElementById("colorStyle");
var passCount = 0;

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
}

//will draw the a number x number board
function drawScreen(){
    //create row column of divs
    for(let i = 0; i < number; i++)
    {
        let row = document.createElement("div");
        row.className = "column-style";
        for(let j = 0; j < number; j++)
        {
            let items = document.createElement("div");
            items.className = "cellStyle";
            items.addEventListener("mouseover", () => {
                items.style.backgroundColor = rgbColor;
            });
            row.appendChild(items);
        }
        parent.appendChild(row);
    }
}

//will update the current resolution to a new one
function updateResolution(){
    let str = number.toString() + " x " + number.toString();
    resolution.insertAdjacentHTML('beforeend', str);
}

//will change pixel color on hover
function updatePixelColor(){
    pixelColor.style.backgroundColor = rgbColor;
}

//will change the pixel color based on user selection
function getSelectedOption(){
    colorPixle = colorStyle.options[colorStyle.selectedIndex].value;
    if(colorPixle === "default")
        rgbColor = "rgb(0,0,0)";
    else if(colorPixle === "greyscale")
    {
        if (passCount < 10)
        {
            rgbColor = "rgb(" + 25 * passCount +","+ 25 * passCount + "," + 25 * passCount + ")";
            passCount++;
        }
    }
}

//draw the screen when page is reloaded with default size
//as well as display resolution and pixel color used when hover
drawScreen();
updateResolution();