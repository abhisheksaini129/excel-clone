//storage
let sheetDB=[];

for(let i=0;i<rows;i++){
    let sheetRow=[];
    for(let j=0;j<cols;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"center",
            fontFamily:"monospace",
            fontSize:"14",
            fontColor:"#000000",
            BGcolor:"#000000",//just for indication purpose
            value:"",
            DBformula:"",
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


//selectors for cell property
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//application of 2 way binding
///Attaching listener on property(click listener)

    bold.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp]=activeCell(address);

        ///Modification/////
        cellProp.bold =!cellProp.bold; //database change
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
    })

    italic.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp] = activeCell(address);
        //required modification
        cellProp.italic=!cellProp.italic;
        cell.style.fontStyle=cellProp.italic ? "italic" : "normal";
        italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp;
    })

    underline.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp] = activeCell(address);
        
        //required modification

        console.log(cellProp.underline)
        cellProp.underline=!cellProp.underline;
        console.log(cellProp.underline)
        if(cellProp.underline){
            cell.style.textDecoration="underline";
        }else{
            
            cell.style.textDecoration="none";
        }
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
    })
    fontSize.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);

        //required modification 
        cellProp.fontSize = fontSize.value;   //database change
        cell.style.fontSize = cellProp.fontSize + "px";
        fontSize.value=cellProp.fontSize

    })
    fontFamily.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);

        //required modification 
        cellProp.fontFamily = fontFamily.value;   //database change
        cell.style.fontFamily = cellProp.fontFamily;
        fontFamily.value=cellProp.fontFamily;
    })
    fontColor.addEventListener("change",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);

        //required modification 
        cellProp.fontColor = fontColor.value;   //database change
        cell.style.color = cellProp.fontColor;
        fontColor.value=cellProp.fontColor;
    })
    BGcolor.addEventListener("change",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);

        //required modification 
        cellProp.BGcolor = BGcolor.value;   //database change
        cell.style.backgroundColor = cellProp.BGcolor;
        BGcolor.value=cellProp.BGcolor;
    })
    alignment.forEach((alignElem)=>{
        alignElem.addEventListener('click',(e)=>{
            let address=addressBar.value;
            let [cell,cellProp]=activeCell(address);

            let alignValue=e.target.classList[1];
            cellProp.alignment=alignValue;
            cell.style.textAlign=cellProp.alignment;
            switch(alignValue){
                case "left":
                    leftAlign.style.backgroundColor=activeColorProp;
                    centerAlign.style.backgroundColor=inactiveColorProp;
                    rightAlign.style.backgroundColor=inactiveColorProp;
                    break;
                    case "center":
                    centerAlign.style.backgroundColor=activeColorProp;
                    leftAlign.style.backgroundColor=inactiveColorProp;
                    rightAlign.style.backgroundColor=inactiveColorProp;
                    break;
                    case "right":
                    rightAlign.style.backgroundColor=activeColorProp;
                    leftAlign.style.backgroundColor=inactiveColorProp;
                    centerAlign.style.backgroundColor=inactiveColorProp;
                    break;
            }
            
        })
    })


function activeCell(address){
     let [rid,cid] = decodeRIDCIDFromAddress(address); 
     //access cell and storage object
     let cell = document.querySelector(`.cellno[rid="${rid}"][cid="${cid}"]`);
     let cellProp = sheetDB[rid][cid];
     return [cell,cellProp];
     
    }

function decodeRIDCIDFromAddress(address){
    //  address -->String form 
    let rid =  Number(address.slice(1))-1;
    let cid = Number(address.charCodeAt(0))-65;
    return[rid,cid];

}

let allCells = document.querySelectorAll(".cellno");
for(let i=0;i< allCells.length;i++){
    addListenToAttachCellProperties(allCells[i]);
}

function addListenToAttachCellProperties(cell){
    cell.addEventListener('click',(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value=cellProp.fontSize;
        fontFamily.value=cellProp.fontFamily;
        fontColor.value=cellProp.fontColor;
        BGcolor.value=cellProp.BGcolor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
                case "center":
                centerAlign.style.backgroundColor=activeColorProp;
                leftAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
                case "right":
                rightAlign.style.backgroundColor=activeColorProp;
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                break;
        }
        formulaBar.value = cellProp.DBformula;
        cell.value=cellProp.value;
    })
}