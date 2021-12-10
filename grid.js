let rows=100;
let cols=26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellCont = document.querySelector(".cells-cont");

let addressBar = document.querySelector('.address-bar');
let formulaBar = document.querySelector(".formula-bar");

for(let i=0;i<rows;i++){
    let addressCol = document.createElement('div');
    addressCol.setAttribute("class","address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<cols;i++){
    let addressRow = document.createElement('div');
    addressRow.setAttribute("class","address-row");
    addressRow.innerText =  String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowNo =document.createElement('div');
    rowNo.setAttribute("class","rowNo");
    for(let j=0;j<cols;j++){
        let cellno = document.createElement('div');
        cellno.setAttribute("class","cellno");
        cellno.setAttribute("contenteditable","true");
        //  attribute for cell and
        //  storage indentification  
        cellno.setAttribute("rid",i);
        cellno.setAttribute("cid",j);
        //////////////////////////////////
        cellno.setAttribute("spellcheck","false");
        rowNo.appendChild(cellno);
        addressShowOnClickingCell(cellno,i,j);
    }
    cellCont.appendChild(rowNo);
}

function addressShowOnClickingCell(cell,i,j){
    cell.addEventListener('click',()=>{
        let colno =  String.fromCharCode(65 + j);
        let data = String(colno+(i+1));
        console.log(data);
        addressBar.value=data;
    })
}
//by default clicked cell in address bar
let firstCell = document.querySelector('.cellno');
firstCell.click();
