var parent = document.getElementById("container");
var number = 16;

//create row column of divs
for(let i = 0; i < number; i++)
{
    let row = document.createElement("div");
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