//canvas情報を取得
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ボールの大きさを設定
var ballRadius = 10;
//開始時のボールの座標
var x = canvas.width / 2;
var y = canvas.height - 30;
//どの方向にどれだけ動かすか
var dx = 2;
var dy = -2;

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
    ctx.closePath();
}

function draw() {
    //4つの座標で囲われた範囲内の内容がすべて消去される
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    //上下方向の反転。
    //x + dx > canvas.width - ballRadiusはボールが右端に達しているか判定
    //x + dx < ballRadiusはボールが左端に達しているか判定
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    //上下方向の反転。
    //y + dy > canvas.height - ballRadiusはボールが下端に達しているか判定
    //y + dy < ballRadiusはボールが上端に達しているか判定
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 1000);