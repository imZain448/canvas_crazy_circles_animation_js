console.log("connected");

var canvas = document.querySelector("canvas");
console.log(canvas);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
// context.fillStyle = "#a454ab";
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = 'rgba(255 , 0 , 0 , 0.5)';
// context.fillRect(300, 200, 100, 100);
// context.fillStyle = "green";
// context.fillRect(500, 300, 100, 100);
// context.fillStyle = "yellow";
// context.fillRect(800, 400, 100, 100);

//line
// context.beginPath();
// context.moveTo(50, 400);
// context.lineTo(500, 30);
// context.lineTo(400, 300);
// context.strokeStyle = "blue";
// context.stroke();

// arc
context.beginPath();
context.arc(150, 250 ,60, 0 , Math.PI * 2 , false);
context.strokeStyle = "red";
context.stroke();

// for( var i = 0 ; i < 100 ; i++)
// {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     context.beginPath();
//     context.arc(x , y , 50 , 0 , Math.PI * 2 , false);
//     context.strokeStyle = getRandomColor() ;
//     context.stroke();
// }





function Circle (x,y,dx,dy,dr,radius)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.dr = dr;

    this.draw = function()
    {
        context.beginPath();
        context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        context.strokeStyle = getRandomColor();
        context.stroke();
        context.fill();
    }

    this.upgrade = function()
    {
        if (this.x + this.radius >= innerWidth || this.x - this.radius < 0)
        {
            this.dx =  -this.dx;
        }
        else if (this.y+this.radius >= innerHeight || this.y -this.radius < 0)
        {
            this.dy = -this.dy;
        }
    
        if(this.radius > 100  || this.radius <= 15)
        {
            this.dr = -this.dr;
        }
        this.radius += this.dr;
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circle = new Circle(200, 200 , 3, 3,3 ,30);

var CircleArray = [];

for ( var i = 0 ; i < 50; i++)
{
    var radius = Math.random()* 150;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;
    var dr = (Math.random()*2);
    CircleArray.push(new Circle(x ,y ,dx,dy,dr,radius));
}
function animate()
{
    requestAnimationFrame(animate);
    context.clearRect(0,0, innerWidth, innerHeight);
    for(var i = 0 ; i < CircleArray.length ; i++)
    {
        CircleArray[i].upgrade();
    }
}

animate();