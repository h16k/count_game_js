//canvas情報を取得
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//ボールの大きさを設定
var ballRadius = 10;

//開始時のボールの座標
let xl = [Math.floor(Math.random() * canvas.width / 2 - 50), 480 - Math.floor(Math.random() * canvas.width / 2 - 50)];
let x = xl[Math.floor(Math.random() * xl.length)];
let yl = [Math.floor(Math.random() * canvas.height / 2 - 50), 320 - Math.floor(Math.random() * canvas.height / 2 - 50)];
let y = yl[Math.floor(Math.random() * yl.length)];

//どの方向にどれだけ動かすか
// var dx = 3 * Math.pow(-1,Math.floor(Math.random() * 2));
// var dy = 3 * Math.pow(-1,Math.floor(Math.random() * 2));

let dx = 2;
let dy = -2;

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

    if (canvas.width / 2 - 50 < x && x < canvas.width / 2 + 50 && canvas.height / 2 - 50 < y && y < canvas.height / 2 + 50) {
        x = canvas.width / 2;
        y = canvas.height / 2;
        return true;
    } else {
        x += (canvas.width / 2) < x ? -1 : 1;
        y += (canvas.height / 2) < y ? -1 : 1;
    }

    x += dx;
    y += dy;
    return false;
}

function startGame() {
    let loop = Math.floor(Math.random() * 10);
    for (let i = 0; i < 10; i++) {
        x = Math.floor(Math.random() * 400);
        y = Math.floor(Math.random() * 300);
        let drawTimerId = setInterval(
            function (i) {
                // draw();   //➀
                if (canvas.width / 2 - 50 < x && x < canvas.width / 2 + 50 && canvas.height / 2 - 50 < y && y < canvas.height / 2 + 50) {   //➁
                    clearInterval(drawTimerId);   //➂
                }
            }, 30);
        // setInterval(draw, 30);
    }

}