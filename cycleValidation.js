//Storage 2D Array
let graphComponentMatrix = [];
for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
    //A node can have more than one child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}
// True--> if cyclic, False --> is not cyclic
function isGraphCyclic(graphComponentMatrix){
    //Dependency -> visited, dfsVisited (2d array)
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

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);  
            if(response == true) return[i,j];
        }
    }
   return null; 
}

//In the start-->visited[true] dfsVis[true]
//IN the End --->dfsVis[false];
//if vis[i][j]==true ---. Go back, path already traversed, no point of exploring it
//Cycle detection condition --> if (vis[i][j]==true && dfsVis[i][j]==true)--> cycle
// return --> True (Cyclic) or False(Not Cyclic)
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
visited[srcr][srcc]=true;
dfsVisited[srcr][srcc]=true;

//A1-->[[0,1],[1,0],[2,0]....];
for(let children=0;children< graphComponentMatrix[srcr][srcc].length;children++){
let [crid,ccid]=graphComponentMatrix[srcr][srcc][children];
if(visited[crid][ccid]==false){
   let res = dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited);
    if(res ==true) return true;//found cyclic condition return immediately true(no need to explore further)
}else if(visited[crid][ccid]==true && dfsVisited[crid][ccid]==true){
    
    //found cyclic condition return immediately true(no need to explore further)
    return true;
}
}

dfsVisited[srcr][srcc]=false;
return false;
}
