var context, starship, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.width = 1200;
context.canvas.height = 900;
let rocket = new Image();

starship = {
  x: 580, //580
  y: 770,
  width:50,
  height:100,
  dx:0,
  dy:0.1,
  thrust: 0,
  stoplaunch: false,

  draw: () =>{
    context.drawImage(rocket, starship.x, starship.y, starship.width, starship.height);
  },

  launch: () => {
    starship.thrust = -0.3;
  },

  landing: () => {
    distance = pad.y - (starship.y + starship.height);
    if(Math.abs(distance/starship.dy) < 37){
      starship.thrust = -(starship.dy/5);
    }
  },

  controlSystem: () => {
    if(starship.y > 400 && !starship.stoplaunch){
      starship.launch();
    }else{
      starship.stoplaunch = true;
      starship.thrust = 0;
      starship.landing();
    }
  },
};

pad = {
    height: 10,
    width:110,
    x:550, // center of the canvas  
    y:870,
    draw: () =>{
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(pad.x, pad.y);
        context.lineTo(pad.x + pad.width, pad.y);
        context.stroke();
    }
}

const doPhysics = () => {
  if(starship.y + starship.height <= pad.y){
    starship.dy += gravity + starship.thrust
    starship.y += starship.dy;
  }else{
    if(starship.stoplaunch){
      starship.y = pad.y - starship.height
    }
  }
}

let gravity = 0.1;

loop = function() {
    //Set source for images
    rocket.src = "image-removebg-preview.PNG";

    //something
    starship.controlSystem();
    doPhysics();

    // Draw backgrounds
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 1200, 1000);
    context.fillStyle = "#bf9063";
    context.fillRect(0, 870, 1200, 500);
    
    // Draw the starship and the pad
    starship.draw();
    pad.draw();
    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

setTimeout(() => {
  window.requestAnimationFrame(loop);
}, 3000)
