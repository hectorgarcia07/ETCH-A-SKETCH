var parent = document.getElementById("etchBox");
var number = 5;
var resetButton = document.getElementById("reset");

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
            }
            else
                alert("Error: Must be a valid interger >= 1 or <= 100.");
        }
    }while(!isValid);
}

//will remove pre-existing nodes in DOM
function removeNodeChild()
{
    let allCol = document.getElementsByClassName("column-style");
    let len = allCol.length;
    console.log(len);
    for(let i = 0; i < len; i++)
    {
        allCol[i].parentNode.removeChild(allCol[i]);
    }
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
                items.style.backgroundColor = "blue";
            });
            row.appendChild(items);
        }
        parent.appendChild(row);
    }
}

//draw the screen when page is reloaded with default size
drawScreen();
removeNodeChild();