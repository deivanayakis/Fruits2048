var board;
var score = 0;
var rows = 4 , columns=4;
let l=0,r=0,u=0,d=0;
let tempscore=0;
let popup1=document.getElementsByClassName("popup")
console.log(popup1);

window.onload = function(){
    setGame();
}

function openPopup(){
    popup1.classList.add("open-popup");
}

function closePopup(){
    popup1.classList.remove("open-popup");
}

function setGame(){
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<columns;j++)
        {
            let tile = document.createElement("div");
            tile.id = i.toString()+"-"+ j.toString();
            let num = board[i][j];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTile();
    setTile();
}

    function hasEmpty(){
        for(let i=0;i<rows;i++)
        {
            for(let j=0;j<columns;j++)
            {
                if(board[i][j]==0){
                    return true;
                }
            }
        }
        return false;
    }

    function setTile(){

        if(!hasEmpty()){
            return;
        }
        let flag = false;
        while(!flag)
        {
            let r=Math.floor(Math.random()*rows);
            let c=Math.floor(Math.random()*columns);

            if(board[r][c] == 0){
                board[r][c] = 2;
                let tile = document.getElementById(r.toString()+"-"+ c.toString());
                let rn = Math.random();
                var ch = rn < 0.5 ? 2 : 4;
                if(ch==2){
                    tile.classList.add("x2");
                }
                else{
                    tile.classList.add("x4");
                }
                break;
            }
        }
    }

    function updateTile(tile,num){
        tile.innerText = "";
        tile.classList.value = "";
        tile.classList.add("tile");
        if(num>0)
        {
            tile.classList.add("x"+num.toString());
        }
    }

    document.addEventListener("keyup" , (e) =>{
        let oldscore = score;
        if(e.code == "ArrowLeft"){
            slideLeft();
            if(oldscore==score)
            {
                l=1;
            }
            else{
                l=0;
                r=0;
                u=0;
                d=0;
            }
        }
        else if(e.code == "ArrowRight"){
            slideRight();
            if(oldscore==score)
            {
                r=1;
            }
            else{
                l=0;
                r=0;
                u=0;
                d=0;
            }
        }
        else if(e.code == "ArrowUp"){
            slideUp();
            if(oldscore==score)
            {
                u=1;
            }
            else{
                l=0;
                r=0;
                u=0;
                d=0;
            }
        }
        else if(e.code == "ArrowDown"){
            slideDown();
            if(oldscore==score)
            {
                d=1;
            }
            else{
                l=0;
                r=0;
                u=0;
                d=0;
            }
        }
        if(l==1 && r==1 && u==1 && d==1 && !hasEmpty())
        {
            openPopup();
            setGame();
        }
        setTile();
        document.getElementById("temp").innerText=score-oldscore;
        document.getElementById("scores").innerText=score;
    })


    function slide(row)
    {
        row = row.filter(num =>  num!=0);
        for(let i=0;i<row.length-1;i++)
        {
            if (row[i] == row[i+1])
            {
                row[i] *= 2;
                row[i+1]=0;
                score += row[i];
            }
        }        

        row = row.filter(num =>  num!=0);

        while(row.length < columns)
        {
            row.push(0);
        }
        return row;
    }

    function slideLeft()
    {
        for (let i=0;i<rows;i++)
        {
            let row = board[i];
            row = slide(row);
            board[i]=row;

            for(let j=0;j<columns;j++)
            {
                let tile = document.getElementById(i.toString()+"-"+j.toString());
                let num = board[i][j];
                updateTile(tile,num);
            }
        }
    }

    function slideRight()
    {
        for (let i=0;i<rows;i++)
        {
            let row = board[i];
            row.reverse();
            row = slide(row);
            row.reverse();
            board[i]=row;            

            for(let j=0;j<columns;j++)
            {
                let tile = document.getElementById(i.toString()+"-"+j.toString());
                let num = board[i][j];
                updateTile(tile,num);
            }
        }
    }

    function slideUp()
    {
        for(let j=0;j<columns;j++)
        {
            let row = [board[0][j],board[1][j],board[2][j],board[3][j]];
            row = slide(row);
            for(let i=0;i<rows;i++)
            {
                board[i][j]=row[i];
                let tile = document.getElementById(i.toString()+"-"+j.toString());
                let num = board[i][j];
                updateTile(tile,num);
            }
        }
    }

    function slideDown()
    {
        for(let j=0;j<columns;j++)
        {
            let row = [board[0][j],board[1][j],board[2][j],board[3][j]];
            row.reverse();
            row = slide(row);
            row.reverse();
            for(let i=0;i<rows;i++)
            {
                board[i][j]=row[i];
                let tile = document.getElementById(i.toString()+"-"+j.toString());
                let num = board[i][j];
                updateTile(tile,num);
            }
        }
    }

