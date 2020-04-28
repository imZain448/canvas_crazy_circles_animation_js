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

var MaxRadius = 40;
var MinRadius = 2;

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove' ,
    function(event)
    {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('resize' , 
    function(event)
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        init();
    }
)



function Circle (x,y,dx,dy,radius)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = getRandomColor();

    this.draw = function()
    {
        context.beginPath();
        context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        context.strokeStyle = getRandomColor();
        context.stroke();
        context.fillStyle = this.color;
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
        
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < MaxRadius && mouse.x - this.x > -MaxRadius 
            && mouse.y -this.y < MaxRadius && mouse.y - this.y > -MaxRadius
            && this.radius < MaxRadius)
            {
                this.radius += 2;
            }
        else if (this.radius > MinRadius)
        {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circle = new Circle(100 , 100 , 2, 2, 30);
circle.draw();

function init()
{
    CircleArray = [];
    for ( var i = 0 ; i < 900; i++)
    {
        var radius = Math.random()* 3 + 2;
        var x = Math.random() * (innerWidth - radius*2) + radius;
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var dx = (Math.random() - 0.5) * 10;
        var dy = (Math.random() - 0.5) * 10;
        CircleArray.push(new Circle(x ,y ,dx,dy,radius));
    }    
}
var CircleArray = [];

for ( var i = 0 ; i < 900; i++)
{
    var radius = Math.random()* 100;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    CircleArray.push(new Circle(x ,y ,dx,dy,radius));
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