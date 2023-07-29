// All the variables are defined here
let inputDir={x:0,y:0};
let snakeArray=[{x:10,y:12}];
const Eating = new Audio("eat.mp3");
const move = new Audio("movement.mp3");
const bgMusic= new Audio("bgmusic.mp3");
const gameover= new Audio("gameover.m4a");
let speed=5;
let lastpaintTime=0;
let score=0;
let highscore=0;

food= {x:8,y:9};



// Game main function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpaintTime)/1000<(1/speed)){
        
       return;
    }
    else{
        lastpaintTime=ctime;
        speed= speed+0.01;
    }
    
    gameEngine();
}






function gameEngine(){
    //To display the snake and food
    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    
        snakeFood=document.createElement('div');
        snakeFood.style.gridRowStart=food.y;
        snakeFood.style.gridColumnStart=food.x;
        snakeFood.classList.add('food');
        board.appendChild(snakeFood);


    // Eating food and upgrading snake array
    if (snakeArray[0].y===food.y && snakeArray[0].x===food.x){
       Eating.play();
       
        snakeArray.unshift({x: snakeArray[0].x+inputDir.x , y:snakeArray[0].y+inputDir.y});
        let a=1;
        let b=14;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        score++;
        
    }     
    //updating score
    document.getElementById('btn').innerHTML=score;

    //setting up highscore
    if(highscore<=score){
        highscore=score;
        document.getElementById('btn2').innerHTML=highscore;
        
    }
    

    
    // //Moving the snake
    for(let i=snakeArray.length-2;i>=0;i--){
       
        snakeArray[i+1]={...snakeArray[i]};
    }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;
    
  

    
    if(isCollide(snakeArray)){
        gameover.play();
        bgMusic.pause();
        inputDir={x:0, y:0};
        alert("Game over....Press Enter to Restart!!");
        snakeArray=[{x:15, y:15}];
        bgMusic.play();
        score=0;
        speed= 5;
    }
    

 }
 //testing for collision
 function isCollide(snake){
   
    
    for(let i=1;i<snakeArray.length;i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        
    }
    if (snake[0].x>=17 || snake[0].x<0 || snake[0].y>=20 || snake[0].y<0)
    {
        return true;
    }
}



const pbtn = document.querySelector('.pbtn')
//Main logic of game
window.requestAnimationFrame(main);
//changing direction of the snake
    const direct = (key)=>{
        inputDir = { x:0 , y:0}; //snake starts here
        bgMusic.play();
        move.play();
        switch(key){
            case "ArrowUp":
                console.log("ArrowUp")
                inputDir.x=0;
                inputDir.y=-1;
                break;
            case "ArrowDown":
                console.log("ArrowDown")
                inputDir.x=0;
                inputDir.y=1;
                break;
            case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x=-1;
                inputDir.y=0;
                break;
            case "ArrowRight":
                console.log("ArrowRight")
                inputDir.x=1;
                inputDir.y=0;
                break;
            default:
                return false;
        }
    }