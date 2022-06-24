var ctx, starship, loop;

canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d");

ctx.canvas.width = 1200;
ctx.canvas.height = 900;
let rocket = new Image();

starship = {
  x: 10, //580
  y: 770,
  width:50,
  height:100,
  dx:0,
  dy:0,
  thrust: 0.3,
  stoplaunch: false,
  angle: 0,
  maxAngle: 15 * Math.PI / 180,
  landed: false,

  draw: () =>{
    ctx.save();
    ctx.translate(starship.x + starship.width/2,starship.y + starship.height/2);
    ctx.rotate(starship.angle);
    ctx.drawImage(rocket, -(starship.width/2), -(starship.height/2), starship.width,starship.height);
    ctx.restore();
  },

  launch: () => {
    starship.thrust = 0.3;
  },

  landing: () => {
    let xxx = (pad.x+pad.width/2) - (starship.x + starship.width/2);
    let yyy = pad.y - (starship.y + starship.height);
    let distance = Math.sqrt(Math.pow(xxx, 2) + Math.pow(yyy, 2));
    let vel = Math.sqrt(Math.pow(starship.dy, 2) + Math.pow(starship.dx, 2));
    console.log(Math.abs(distance / vel), starship.y, starship.dx)
    if(Math.abs(distance / vel) < 250 && starship.dy > 0){
      let angle = Math.atan((xxx) / Math.abs(yyy))-starship.dx/4;
      starship.angle += angle/1000+starship.dx;
      starship.thrust = vel / 3;
    }
  },

  controlSystem: () => {
    if(starship.y > 450 && !starship.stoplaunch){
      starship.launch();
    }else{
      starship.stoplaunch = true;
      starship.thrust = 0;
      if(!starship.landed){
        starship.landing();
      }
    }
  },
};

pad = {
    height: 10,
    width:110,
    x:550, // center of the canvas  
    y:870,
    draw: () =>{
        ctx.strokeStyle = "#202830";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(pad.x, pad.y);
        ctx.lineTo(pad.x + pad.width, pad.y);
        ctx.stroke();
    }
}

const doPhysics = () => {
  if(starship.y + starship.height <= pad.y){
    let adddx = Math.sin(starship.angle) * starship.thrust;
    let adddy = Math.cos(starship.angle) * starship.thrust;
    if(starship.dy > 0){
      starship.dy += gravity - adddy - drag;
    }else if(starship.dy < 0){
      starship.dy += gravity - adddy + drag;
    }else{
      starship.dy += gravity - adddy;
    }
    starship.dx += adddx;
    starship.x += starship.dx + dw;
    starship.y += starship.dy;
  }else{
    if(starship.stoplaunch){
      starship.landed = true;
      starship.angle = 0;
    }
  }
}

let gravity = 0.1;
let dw = -0.01;
let drag = 0.01;

loop = function() {
    //Set source for images
    rocket.src = "image-removebg-preview.PNG";

    //something
    doPhysics();
    starship.controlSystem();

    // Draw backgrounds
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 1000);
    ctx.fillStyle = "#bf9063";
    ctx.fillRect(0, 870, 1200, 500);
    
    // Draw the starship and the pad
    starship.draw();
    pad.draw();
    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

setTimeout(() => {
  window.requestAnimationFrame(loop);
}, 3000)
