
function isGraphCyclicTracePath(graphComponentMatrix,isCyclicResp){
    let [srcr,srcc]=isCyclicResp;
    let visited =[];//to trace the node visit
    let dfsVisited= [];// to trace the stack

    for(let i =0;i<rows;i++){
        let visitedRow = [];
        let dfsVisitedRow =[];
        for(let j=0;j<cols;j++){
        
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);  
    //         if(response == true) return true;
    //     }
    // }

    let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);

    if(response === true) return true;

   return false ;
}
//coloring cell for tracking
function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
visited[srcr][srcc]=true;
dfsVisited[srcr][srcc]=true;

let cell = document.querySelector(`.cellno[rid="${srcr}"][cid="${srcc}"]`);
cell.style.backgroundColor ="lightblue";


for(let children=0;children< graphComponentMatrix[srcr][srcc].length;children++){
let [crid,ccid]=graphComponentMatrix[srcr][srcc][children];
if(visited[crid][ccid]==false){
   let res = dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited);
    if(res ==true) return true;
}else if(visited[crid][ccid]==true && dfsVisited[crid][ccid]==true){
    
    let cyclicCell = document.querySelector(`.cellno[rid="${crid}"][cid="${ccid}"]`);
    cyclicCell.style.backgroundColor="lightsalmon";
    return true;
}
}

dfsVisited[srcr][srcc]=false;
return false;
}