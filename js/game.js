//canvas情報を取得
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//ボールの大きさを設定
var ballRadius = 10;

//開始時のボールの座標
let x = 30;
let y = canvas.height / 2;

let dx = 2;
let dy = 0;

function drawBall() {
    //描画開始
    ctx.beginPath();
    //x,y座標、ballRadus、開始角度と終了角度、そして描く方向（ここでは省略されている。デフォルトはfalse=時計回り）
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    //色の指定
    ctx.fillStyle = "#0095DD";
    //塗りつぶす（stroke()を使うと縁だけ描ける）
    // ctx.stroke();
    ctx.fill();
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
    ctx.closePath();
}

function draw(){
    //4つの座標で囲われた範囲内の内容がすべて消去される
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (canvas.width / 2 - 30 < x) {
        return true;
    }
    x += dx;
    y += dy;
}

setInterval(draw,10);