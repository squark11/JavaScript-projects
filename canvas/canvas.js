const value = document.querySelector("#outputValue");
const distance = document.querySelector("#outputDistance");
var ballInt = document.querySelector("#value");
var ballDistance = document.querySelector("#ballDistance");


var start = document.querySelector("#start");
var restart = document.querySelector("#restart");


var canvas = document.getElementById("ballAnimation");


const innerWidth = canvas.width;
const innerHeight = canvas.height;

var ctx = canvas.getContext('2d');

startStatus = false;


// suwaki - zmiana wartości
value.textContent = ballInt.value;
distance.textContent = ballDistance.value;

ballInt.addEventListener("input", (event) => {
    value.textContent = event.target.value;
    circleParams.ballCount = event.target.value;
})

ballDistance.addEventListener("input", (event) => {
    distance.textContent = event.target.value;
    circleParams.ballMindistance = event.target.value;
})




const circleParams = {
    ballCount: ballInt.value,
    ballMindistance: ballDistance.value
};


function Circle(x, y, dx, dy, radius) {
    //randomowy kolor wypełnienia
    this.r = Math.random() * 255;
    this.g = Math.random() * 255;
    this.b = Math.random() * 255;

    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;


    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        ctx.fill();

    }

    this.update = function () {
        if (this.x + this.radius >= innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        
        

        this.draw();
    }
}

function generateRandomCircles(n) {
    const circles = [];
    for (let i = 0; i < n; i++) {
        const radius = (Math.random() * 30) + 20;

        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y = Math.random() * (innerHeight - radius * 2) + radius;

        const dx = (Math.random() * 9) + 0.5;
        const dy = (Math.random() * 9) + 0.5;

        const c = new Circle(x, y, dx, dy, radius);

        circles.push(c);
    }

    return circles;
}

let circles = generateRandomCircles(circleParams.ballCount);

function drawCircle() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}



function animate() {
    startStatus ? requestAnimationFrame(animate) : cancelAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    circles.forEach((a)=>{
            circles.forEach((b)=>{
                connectBalls(a,b);
            })
    })
    
    drawCircle();
}

const connectBalls = (b1, b2) =>{
    const distanceBall = Math.hypot(b1.x - b2.x, b1.y - b2.y);
    const threshold = innerWidth * circleParams.ballMindistance / 100;
    if(distanceBall < threshold){
        ctx.beginPath();
        ctx.moveTo(b1.x, b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();
    }
}

//START
start.addEventListener("click", () => {
    if (!startStatus) {
        startStatus = true;
        animate();
        this.start.innerHTML = "Pause";
    } else {
        startStatus = false;
        this.start.innerHTML = "Start";
    }
});


//RESTART
restart.addEventListener("click", () => {
    if (circleParams.ballCount != circles.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles = generateRandomCircles(circleParams.ballCount);
        drawCircle();
    }
})

drawCircle();