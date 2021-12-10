for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cellno[rid="${i}"][cid="${j}"]`);
        cell.addEventListener('blur',(e)=>{
            let address=addressBar.value;
            let [cell, cellProp]= activeCell(address);
           let enteredData = cell.innerText;
           if(enteredData === cellProp.value) return;
           cellProp.value = enteredData;
           cellProp.DBformula=" ";
           removeChildFromParent(cellProp.DBformula);
           updateChildrenCells(address);
        })
    }
}

formulaBar.addEventListener("keydown",(e)=>{
    let formulaValue=formulaBar.value;
    if(e.key=="Enter" && formulaValue){

        //if there is change in formula, break old p-c relation 
        //check new formula & add new parent child relation
        let address = addressBar.value;
        let [cell,cellProp]=activeCell(addressBar.value);
        if(formulaValue != cellProp.DBformula)
        {
            removeChildFromParent(cellProp.DBformula);
        }
        let evaluatedValue = evaluateFormula(formulaValue);

         addChildToGraphComponent(formulaValue,address);
        //check cyclic validation, then let them evaluate value
          let isCyclicResp = isGraphCyclic(graphComponentMatrix);
          // True--> if cyclic, False --> is not cyclic
          if(isCyclicResp){
              let response = confirm("your entered formula is cyclic, Do you want to trace your path ?")
              while(response==true){
                  //keep on tracking color untill user is satisfied
                  isGraphCyclicTracePath(graphComponentMatrix,isCyclicResp);
                  response = confirm("Do you again want to trace your path, therwise click 'cancel'");
              }
              removeChildFromGraphComponent(formulaValue,address);
              return;
            }
        setUIAndCellProp(evaluatedValue,formulaValue,address);
        addChildToParent(formulaValue);
        updateChildrenCells(address);
        console.log(sheetDB);
    }
    
})
function addChildToGraphComponent(formula,childAdress){
    let [crid , ccid] = decodeRIDCIDFromAddress(childAdress);

    let encodedFormula=formula.split(" ");

    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90){
           let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
           //B1: A1+10
           // rid --> i, cid --> j
           graphComponentMatrix[prid][pcid].push([crid , ccid]);
        }
    }
}
function removeChildFromGraphComponent(formula,childAddress){
    let [crid , ccid] = decodeRIDCIDFromAddress(childAddress);

    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90){
           let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i])
           graphComponentMatrix[prid][pcid].pop()
        }
    }
}
function updateChildrenCells(ParentAddress){
    let [parentCell,parentCellProp]=activeCell(ParentAddress);
    let children = parentCellProp.children;
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];

        let [childCell,childrenProp] = activeCell(childAddress);
        let childFormula=childrenProp.DBformula;

        let evaluatedValue=evaluateFormula(childFormula);
        setUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);
    }
}
function addChildToParent(formula){
    let childAddress=addressBar.value;
    let encodedFormula = formula.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiCode = encodedFormula[i].charCodeAt(0); 
            if(asciiCode>=65 && asciiCode <= 90){
                let [parentCell,parentCellProp]=activeCell(encodedFormula[i]);
                parentCellProp.children.push(childAddress);
            }
        }
}
function removeChildFromParent(formula){
    let childAddress=addressBar.value;
    let encodedFormula = formula.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiCode = encodedFormula[i].charCodeAt(0); 
            if(asciiCode>=65 && asciiCode <= 90){
                let [parentCell,parentCellProp]=activeCell(encodedFormula[i]);
                let idx = parentCellProp.children.indexOf(childAddress);
                parentCellProp.children.splice(idx,1);
            }
        }
}
function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiCode = encodedFormula[i].charCodeAt(0);
            if(asciiCode>=65 && asciiCode <= 90){
                let [cell,cellProp]=activeCell(encodedFormula[i]);
                let cellValue=cellProp.value;
                encodedFormula[i]=cellValue;

            }
        }
        let decodedFormula = encodedFormula.join(" ");
        return eval(decodedFormula);
}
function setUIAndCellProp(evaluatedValue,formula,address){
    // let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);
    cell.innerText=evaluatedValue;//UI update
    cellProp.value=evaluatedValue;//DB value updated
    cellProp.DBformula=formula;   //DB formula updated
}

