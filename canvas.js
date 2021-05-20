const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight -100;


let context = canvas.getContext("2d");
let bg_color = "white";
context.fillStyle = bg_color;
context.fillRect(0,0,canvas.width , canvas.height);
let draw_color = "Black"
function chang_color(element)
{
    draw_color = element.style.background;
}

let draw_width = 2;
let is_paint = false;

canvas.addEventListener("touchstart",start ,false);
canvas.addEventListener("touchmove",draw ,false);
canvas.addEventListener("mousedown",start ,false);
canvas.addEventListener("mousemove",draw ,false);
canvas.addEventListener("mouseup",stop ,false);
canvas.addEventListener("mouseout",stop,false);
canvas.addEventListener("touchend",stop ,false);

let restore = [];
let index = -1;
function start(event)
{
    is_paint = true;
    context.beginPath();
    context.moveTo(event.clientX-canvas.offsetLeft , event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event)
{
    if(is_paint)
    {
        context.lineTo(event.clientX-canvas.offsetLeft , event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

function stop(event)
{
    if(is_paint)
    {
        context.stroke();
        context.closePath();
        is_paint = false;

    }
    event.preventDefault();

    if(event.type != "mouseout")
    {
        restore.push(context.getImageData(0,0,canvas.width , canvas.height));
        index += 1;
    }

}

function clear_all()
{
    context.fillStyle = bg_color;
    context.clearRect(0,0,canvas.width , canvas.height); 
    context.fillRect(0,0,canvas.width , canvas.height); 
    restore = [];
    index = -1;
}

function undo_draw()
{
    if(index <=0)
    {
        clear_all();
    }
    else
    {
        index -= 1;
        restore.pop();
        context.putImageData(restore[index],0,0);
    }
}

function down_img()
{
    let getimage = canvas.toDataURL();
    imgConverted.src = getimage;
}