//Game variables and constants

let inputdir={x:0,y:0};
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');
let speed=5;
let lastpainttime=0;
let snakearray=[{x:13,y:15}];   //snake head position initially(only one dot is present) and as snake collects points the dots will get added 
let food={x:6,y:7};            // food is a single particle whereas a snake keeps growing as it eats
let score=0;
let hiscore=0;

/*Game Functions->*/
 
function main(ctime){                      // callback function having current time as the argument
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastpainttime)/1000<1/speed){  //last time when screen was painted/rendered for controlling the frames rendered per second
        return;
    }
    lastpainttime=ctime;
    gameengine();
}

// collision detection

function iscollide(snakearray){

    //if snakehead collides with its body

    for(let i=1;i<snakearray.length;i++){
        if(snakearray[i].x===snakearray[0].x && snakearray[i].y===snakearray[0].y){
            return true;
        }
    }
    // snakehead collides with the border 

    if(snakearray[0].x>=20 || snakearray[0].x<=0 || snakearray[0].y<=0 || snakearray[0].y>=20)
    return true;
    else
    return false;
    
}
// if the snake eaten the food -> increment the score and increase the length of snake

function gameengine(){
    //part1: updating the snake array and food
    //musicsound.play();
      if(iscollide(snakearray)){
        if(hiscore<score)
        hiscore=score;  
        score=0;
        scorebox.innerHTML="Score : "+score;     
        hiscorebox.innerHTML="HiScore : "+hiscore;     //updating the hiscore    
        //gameoversound.play();
        //musicsound.pause();
        inputdir={x:0,y:0};
        alert("Press any key to play again!!!");
        snakearray=[{x:13,y:15}];
        //musicsound.play();
        
      }
      // if the snake eaten the food -> increment the score,regenerate the food and increase the length of snake
      
     if(snakearray[0].x===food.x && snakearray[0].y===food.y){    //to check if snake has eaten the food or not
         //foodsound.play();
         score+=1;
         scorebox.innerHTML="Score : "+score;        //updating the score
         if(hiscore<score){
            hiscore+=1;
            hiscorebox.innerHTML="HiScore : "+hiscore; 
         }

         snakearray.unshift({x:snakearray[0].x+inputdir.x,y:snakearray[0].y+inputdir.y}); //adds the element in the beginning of the snakearray along the direction in which it is moving 
         let a=2;
         let b=16;
         food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())} // math.random generates a pseudo random number between 0 to 1 i.e [0,1);
      }
      
      // moving the snake 

      for(let i=(snakearray.length)-2;i>=0;i--){
        
        snakearray[i+1]={...snakearray[i]};// for referencing to a new object otherwise at the end all elements will point to the same thing.
                                           // a new object with the properties of snakearray[i] is created and is copied to snakearray[i+1] such that all the elements taking the position of the lement which was previously present thr
      }
      snakearray[0].x+=inputdir.x;  // without eating the food moving the snakehead 
      snakearray[0].y+=inputdir.y;
     
      //part2: display the snake array and food
      //display the snake
      board.innerHTML="";
      snakearray.forEach((e,index)=>{                  // e is the element(food) and index is the point where the pointer is pointing
        
        let snakeelement=document.createElement('div'); //create a div container for each segment of the snake 
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeelement.classList.add('head');        //add the styling
        }
        else
        snakeelement.classList.add('snake');
        board.appendChild(snakeelement);

    })

    //display the food
                    
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}

/*GAME LOGIC*/
//window serves as a global object in the browser environment
window.requestAnimationFrame(main);     //schedule a callback function before the next repaint animation loop in javascript
window.addEventListener('keydown',e=>{        //keydown means when a key on the keyboard is pressed down
    //movesound.play();
    switch(e.key){    //points out the what event has been fired i.e. up,down,right,left
        case "ArrowUp" :
            console.log("ArrowUp");
            inputdir.x=0;               //inputdir is more specifically snake velocity
            inputdir.y=-1;
            break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight" :
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:{ 
           //gameoversound.play();
           //musicsound.pause();
           inputdir={x:0,y:0};
           alert("Press any key to play again!!!");
           snakearray=[{x:13,y:15}];
           musicsound.play();    
           hiscore=score;  
           score=0;
           scorebox.innerHTML="Score : "+score;     
           hiscorebox.innerHTML="HiScore : "+hiscore; 
           break;
        }
    }
});