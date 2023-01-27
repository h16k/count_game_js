"use strict";


//canvas情報を取得
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//キャンバス自体のサイズを設定する
canvas.width = 6000;
canvas.height = 4800;

//実際に表示されるキャンバスのサイズを指定する
canvas.style.width = "600px";
canvas.style.height = "480px";



//ボールの大きさを設定
let ballRadius = 150;
let rectSize = 1300;
let ballSpeed = 30;

let level = [1, 2, 3];
let levelText = ["easy","normal","hard"];

let midx = canvas.width / 2;
let midy = canvas.height / 2;
let margin = ballRadius * 2;

//開始時のボールの座標
let spawn = [[margin, midy], [midx, margin], [canvas.width - margin, midy], [midx, canvas.height - margin]];
let direction = [[1,0],[0,1],[-1,0],[0,-1]];
let x,y;
let dx,dy;

let s_wait, e_wait;

let answer;
let count = 0;
let timer;


function init(){
    let ind = randNum(spawn.length);
    x = spawn[ind][0];
    y = spawn[ind][1];
    dx = ballSpeed * direction[ind][0];
    dy = ballSpeed * direction[ind][1];
    s_wait = 15;
    e_wait = 15;
    count++;
}


function getLevel(){
    let radioButtonsForLevel = document.getElementsByName('level');
    for (let i in level) {
		if (radioButtonsForLevel.item(i).checked) {
			return radioButtonsForLevel.item(i).value;
		}
	}
}

function startGame(){
    changeElementVisibilityById("startGame");
    answer = randNum(getLevel() * 5);
    timer = setInterval(draw,30);

}

function quizText(){
    let text = "How many balls are in the box?";
    let fontSize = 360 ;

    //文字のスタイル（大きさ、フォント）を指定
	ctx.font = 'bold ' + fontSize + 'px serif';
	//文字の色を指定
	ctx.fillStyle = '#000000';
    let textWidth = ctx.measureText( text ).width ;
    ctx.fillText( text, (canvas.width - textWidth) / 2, canvas.height - fontSize ) ;

}

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
    ctx.fillStyle = "#007bbb";
    
    ctx.fillRect(canvas.width / 2 - rectSize/2, canvas.height / 2 - rectSize/2, rectSize, rectSize);
    ctx.closePath();
}

function draw(){
    //4つの座標で囲われた範囲内の内容がすべて消去される
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();

    if(s_wait == 0){
        x += dx;
        y += dy;
    }else{
        s_wait--;
    }

    if (((canvas.width / 2 - ballRadius) < x) && (x < (canvas.width / 2) + ballRadius) && ((canvas.height / 2) - ballRadius < y) && (y < (canvas.height / 2) + ballRadius)) {
        if(e_wait){
            e_wait--;
            x -= dx;
            y -= dy;
        }else if(count < answer){
            init();
        }else{
            clearInterval(timer);
            quizText();
        }
    }

}

//１つの整数をランダムに作る
function randNum(max) {
	return Math.floor(Math.random() * max);
}

function changeElementVisibilityById(id){
    document.getElementById(id).classList.toggle('hidden');
}

window.onload = () => {
    init();
	for (let i in level) {
		let levelRadioButton = document.getElementById('levelRadioButton');
		levelRadioButton.innerHTML +=
			`<input type="radio" 
		id = "${levelText[i]}" 
		name="level" 
		value= ${level[i]}
		onclick="changeLevel();">
	<label for = "${level[i]}">${levelText[i]}</label>`;
	};

	let defaultLevel = document.getElementById(`${levelText[1]}`);
	defaultLevel.checked = true;
};
