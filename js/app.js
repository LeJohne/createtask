///////////////////// CONSTANTS /////////////////////////////////////
/* GUIDE !!!!
0 = nothing;
1 = 1 traingle
1.5 = 1 small triangle
2 = 1 square
2.5 = 1 Tall square;

-----------------------------------------------------------------------------------------------
How To make a level !!!!
Remember that character moves about 100 pixels per jumpcounter
lvl = ["Type of level", then buildings!!!! The amount of buildings can be unlimited!@$WR];
*/
// IDEA, perhaps do [1, "AMOUNT OF TIME", 2 "AMOUNT OF TIME"];
const plainlvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // each one is worth 50 pixels. 15* 50 = 750;
const lv1 = ["Reg",1, 1,  1.5, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1,  1, 1 ] //triagnle every 150 pixels // 150 * 10 = 1500 pixels
const lv2 = ["Reg", 2, 0 ,0, 2, 0,0, 2, 0, 0];
const lv3 = ["Backwards-Grav"];
const defalt = ["Reg", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayMaster = [lv1, defalt]; //put the levels u want here!!!!
const timingMaster = [125, 250, 375, 385, 485, 600, 644, 710, 720];
const starPosition = [500]; //
const starMaster = [325];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let start;
let started = false;
let startScreen;
let game;
let movement;
let gametime = 0;
let jumpcounter = 0;
let cooldown = false;
let loading = false //tells us if we are in the middle of loading something;
let unpackingcounter;
let arraypicker = -1; //shows which array is being used in array master.
let currentArray;
let arrayposition = 1;
let currentObject;
let hitRay = []; //hit array
let hitRayPos = 0;
let groundRay = [];
let groundRayPos = 0;
let groundLevel = 500;
let groundStateCount = 0;
let groundedState = "off";
let groundStateTime = 0;
let currentTime = 0;
let starRay = [];
let starRayPos = 0;
let starCooldown = 0;
var player = {
    x1 : 500,
    x2 : 500, // prob gonna change this to GROUND LEVEL!!!
    y1 : 450,
    y2 : 500 //player.y2 is to act as the last position of y1.
}
let used = false;
let stars = 0;
let starBoolean = false;
let currentStar = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("board");
let canvas = board.getContext("2d");
let control =  document.getElementById("Control")
///////////////////// EVENT LISTENERS ///////////////////////////////
// start screen//
window.onload = function(){
    startScreen = document.createElement("div");
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "start";
    startScreen.append(start);
    control.append(startScreen);
}
control.onclick = init;
document.addEventListener("keydown", direction);
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target === start){
        started = true;
        startScreen.remove();
        canvas.clearRect(0, 100, 1500, 600);
        // Make all init variables
        game = setInterval(action, 20);


    }

}
function action(){
    gametime += 1;
    hitRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });
    groundRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });
    starRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });

    unpack();
    ground();
    position();


    refresh();//finds current screen and passes it on to render
    render();//renders the whole thing
    contact();
    starCounter();
    player.x2 = player.x1;
    player.y2 = player.y1;

    if(cooldown == 0){
        used = false;
    } else {
        cooldown--;
    }
}
function unpack(){
    let rando = Math.random();
    if(loading == true){
        if(gametime >= timingMaster[currentTime]){
            currentTime++;
            currentObject = currentArray[arrayposition];
            arrayposition++;
            if(arrayposition == currentArray.length - 1){
                loading = false;
            }

        }

    } else if(loading == false){

        loading = true;
        unpackingcounter++;
        arraypicker++;
        currentArray = arrayMaster[arraypicker];
        loading = true;
        arrayposition = 1;
    }
    if(gametime == starMaster[currentStar] && currentStar <= starMaster.length - 1){

        starBoolean = true;
    } else {
        starBoolean = false;
    }
}
function contact(){
    hitRay.forEach((item, i) => {
        if((player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y2) || (player.x1 >= item.x1 && player.x1 <= item.x2 && player.y1 + 50 >= item.y2)){            endgame();
        }
    });
    if(starCooldown == 0){
        starRay.forEach((item, i) => {
            if((player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y2) || (player.x1 >= item.x1 && player.x1 <= item.x2 && player.y1 + 50 >= item.y2)){
                alert("12");
                starCooldown = 10;
                stars++;
            }
        });
    } else {
        starCooldown - 1;
    }
}

function endgame(){
     clearInterval(game);
     canvas.clearRect(0, 0, 1500, 500);
}
function position(){
    if(currentArray[0] == "Reg"){
        if(movement == "top"){
            //need to fix this sometimeas
            used = true;
            if(jumpcounter < 19){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 -= 13;
                player.y2 -= 13;
                jumpcounter++;
            } else {

                movement = undefined;

            }


        }
         if(movement == undefined && player.y1 + 63 <= groundLevel){ //THIS 75 NEEDS TO BE CHANGED 50 + CHANGE;
            if(player.y1 + 63 <= groundLevel ){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 += 13;
                player.y2 += 13;
            }
                jumpcounter = 19;
                movement = undefined;
                used = false;

        } else if(movement != "top"){
            jumpcounter = 0;
        }/*else if(movement == "Auto-Fall"){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
            player.y1 += 50;
            player.y2 += 50;
            jumpcounter = 0;
            movement = undefined;
            used = false;
        }*/
        canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);

        canvas.beginPath();
        canvas.moveTo(player.x1 + 5, player.y1 + 25);
        canvas.lineTo(player.x1, player.y1 + 25);
        canvas.strokeStyle = "white"
        canvas.stroke();
        canvas.strokeStyle = "white"
    } /*else if(currentArray[0] == "Backwards-Grav") {
        if(movement == "top"){
            //need to fix this sometimeas
            used = true;
            if(jumpcounter < 10){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 += 17;
                player.y2 += 17;
                jumpcounter++;
            } else {
                movement = undefined;
            }
        }
         if(movement == undefined && player.y1 - 67 >= groundLevel){ //THIS 75 NEEDS TO BE CHANGED 50 + CHANGE;
            console.log(groundLevel)
            console.log(player.y1)
            if(player.y1 - 67 >= groundLevel){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 -= 17;
                player.y2 -= 17;
            }
                jumpcounter = 10;
                movement = undefined;
                used = false;
        } else if(movement != "top"){
            jumpcounter = 0;
        }
        canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);
        canvas.beginPath();
        canvas.moveTo(player.x1 + 5, player.y1 + 25);
        canvas.lineTo(player.x1, player.y1 + 25);
        canvas.strokeStyle = "#9acd32"
        canvas.stroke();
        canvas.strokeStyle = "black"
    }
    */
}
function refresh(){
        var pixelfront = canvas.getImageData(5, 100, 1500, 600);
        canvas.clearRect(1495, 100, 5, 600);
        canvas.putImageData(pixelfront, 0, 100);
}
function render(){
    canvas.beginPath();
    canvas.lineWidth = 10;
    canvas.moveTo(1000, 506);
    canvas.lineTo(995, 506);
    canvas.stroke();
    canvas.lineWidth = 1;
    if(cooldown == 0){
        canvas.beginPath();
        canvas.rect(player.x1, player.y1, 50, 50);
        canvas.stroke();
    } else if (cooldown > 0){
        canvas.beginPath();
        canvas.rect(player.x1, player.y1, 50, 50);
        canvas.stroke();
    }

/*    canvas.beginPath()
        canvas.fillStyle = "red";
        canvas.rect(995, 0, 5, 166);
    canvas.fill();
    canvas.beginPath()
        canvas.fillStyle = "blue";
        canvas.rect(995, 166, 5, 166);
    canvas.fill();
    canvas.beginPath()
        canvas.fillStyle = "green";
        canvas.rect(995, 332, 5, 168);
    canvas.fill();
    canvas.fillStyle = "black"*/
    if(currentObject !== undefined){
        if(currentObject == 1){
            //triangle
            canvas.beginPath();
            canvas.moveTo(1500, 500);
            canvas.lineTo(1450, 500);
            canvas.lineTo(1475, 450);
            canvas.lineTo(1500, 500);
            canvas.stroke();
            adder(1450, 1475, 450, 500);
            adder(1475, 1500, 450, 500);
        } else if(currentObject == 1.5){
            canvas.beginPath();
            canvas.moveTo(1500, 500);
            canvas.lineTo(1450, 500);
            canvas.lineTo(1475, 475);
            canvas.lineTo(1500, 500);
            canvas.stroke();
            adder(1450, 1475, 475, 500);
            adder(1475, 1500, 475, 500);

        }else if(currentObject == 2){
            canvas.beginPath;
            canvas.rect(1450, 450, 50, 50);
            canvas.stroke();
            adder(1450, 1450, 460, 500);
            adder(1500, 1500, 460, 500);
            stander(1450, 1500, 450, 450);

        }
        currentObject = undefined;
    }
    if(starBoolean == true){
        canvas.beginPath();
        canvas.arc(1450, starPosition[currentStar] - 25, 25, 0, 2 * Math.PI);
        canvas.stroke();
        starer(1450, 1500, starPosition[currentStar] - 50, 500);
        currentStar++;
    }
}
function starCounter(){
    /*canvas.clearRect(850, 0, 1000, 100);
    canvas.drawImage(img, x, y);*

    /
};
function adder(x1, x2, y1, y2){
    hitRay[hitRayPos] = new Object();
    hitRay[hitRayPos].x1 = x1;
    hitRay[hitRayPos].x2 = x2;
    hitRay[hitRayPos].y1 = y1;
    hitRay[hitRayPos].y2 = y2;
    hitRayPos++;
}
function stander(x1, x2, y1, y2){
    groundRay[groundRayPos] = new Object();
    groundRay[groundRayPos].x1 = x1;
    groundRay[groundRayPos].x2 = x2;
    groundRay[groundRayPos].y1 = y1;
    groundRay[groundRayPos].y2 = y2;
    groundRayPos++;
}
function direction(event){
    if (event.keyCode == 32){
        if(used == false){
            movement = "top"
            used = true;
            cooldown = 21;
        }
    }
}
function ground(){
    if(groundStateCount == 0){
        /*let ppa = false; // just use to see if bottom is true/false
        groundRay.forEach((item, i) => {
            if(item.x2 == 400){
                ppa = true;
            }
        });
        if(groundedState == "On" && ppa == true){
            movement = "Auto-Fall"
        }*/
        groundedState = "off"
        groundLevel = 500;
        groundStateCount = undefined;
    }

    if(groundedState == "off"){
        //basically checks if there is something landable below the box, If yes, then grounded state is on for a certain period of timeout
        //In this certain period of time, the landable object will go away, and this can run again.
        groundRay.forEach((item, i) => {
            if(item.x1 <= 550 && item.x1 >= 500){
                groundedState = "On";
                groundStateCount = 105;
                groundLevel = item.y1;
            }
        });
    } else {

        groundStateCount -= 5;
    }

}
function starer(x1, x2, y1, y2){
    starRay[starRayPos] = new Object();
    starRay[starRayPos].x1 = x1;
    starRay[starRayPos].x2 = x2;
    starRay[starRayPos].y1 = y1;
    starRay[starRayPos].y2 = y2;
    starRayPos++;
}
