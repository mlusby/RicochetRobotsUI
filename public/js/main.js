$(function(){
	$("#blue-robot").draggable({ 
		containment: "#game-board",
		scroll: false,
		grid: [34,34] ,
		stop: function(e){
			moveRobotToNextEmptySpot(e, "blueRobot")
		}
	});
	$("#red-robot").draggable({ 
		containment: "#game-board",
		scroll: false, 
		grid: [34,34], 
		start: function(e){ 	
			console.log(e);
		}, 
		drag: function(e) {
		},
		stop: function(e) {
			moveRobotToNextEmptySpot(e,"redRobot")
		}
	});
	$("#yellow-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34], stop: function(e) { moveRobotToNextEmptySpot(e,"yellowRobot") }});
	$("#green-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34], stop: function(e) { moveRobotToNextEmptySpot(e,"greenRobot") }});
	window.boardLayout = JSON.parse(sessionStorage.boardLayout);
	initBoard(boardLayout);
	storeMove(moves, boardLayout);
	currentMove = 0;
	updateControls();
	$(".previous").click(function(){
		if (!$(this).hasClass("disabled")) {
			currentMove--;
			updateControls();
			initBoard(moves[currentMove]);
		}
	});
	$(".next").click(function(){
		if (!$(this).hasClass("disabled")) {
			currentMove++;
			updateControls();
			initBoard(moves[currentMove]);
		}
	});
});
var moves = [];
var currentMove = 0;

var initBoard = function (board) {
	setRobotLocation($("#blue-robot"),board.blueRobot);
	setRobotLocation($("#red-robot"),board.redRobot);
	setRobotLocation($("#yellow-robot"),board.yellowRobot);
	setRobotLocation($("#green-robot"),board.greenRobot);
	var row = $("#game-board #row1");
	var square = row.find(".box:first");
	for (var i = 0 ; i < board.board.length ; i++){
		var binary = board.board[i];
		if (binary & 1) { square.css("border-top","2px solid black"); }
		if (binary & 2) { square.css("border-right","2px solid black"); }
		if (binary & 4) { square.css("border-bottom","2px solid black"); }
		if (binary & 8) { square.css("border-left","2px solid black"); }
		square = square.next();
		if (square.length === 0){
			row = row.next();
			square = row.find(".box:first");
		}
	}
};
var storeMove = function (moveArray, board){
	var cloneBoardLayout = {
		blueRobot : board.blueRobot.slice(),
		redRobot : board.redRobot.slice(),
		yellowRobot : board.yellowRobot.slice(),
		greenRobot : board.greenRobot.slice(),
		board : board.board.slice()
	}
	moveArray.push(cloneBoardLayout);
	currentMove++;
}
var setRobotLocation = function(robot, coords) {
	var h = (coords[0] * 34) + 5,
		v = (coords[1] * 34) + 5;
	robot.css({"left": h, "top": v});
};
var getRobotLocation = function (robot) {
	return [
		(parseInt(robot.css("left")) - 5) / 34 ,
		(parseInt(robot.css("top")) - 5) / 34 
	]
}
var moveRightCoords = function(board, location) { 
	var destination = [];
	var nextSpot = location.slice();
	binary = board.board[getBoardIndex(nextSpot)];
	while (!(binary & 2)){
		if (coordsContainRobot(board, [nextSpot[0]+1,nextSpot[1]])) {
			return nextSpot;
		}
		nextSpot[0] = nextSpot[0] + 1;
		binary = board.board[getBoardIndex(nextSpot)];
	}
	return nextSpot;
}
var moveLeftCoords = function(board, location) { 
	var destination = [];
	var nextSpot = location.slice();
	binary = board.board[getBoardIndex(nextSpot)];
	while (!(binary & 8)){
		if (coordsContainRobot(board, [nextSpot[0]-1,nextSpot[1]])) {
			return nextSpot;
		}
		nextSpot[0] = nextSpot[0] - 1;
		binary = board.board[getBoardIndex(nextSpot)];
	}
	return nextSpot;
}
var moveUpCoords = function(board, location) { 
	var destination = [];
	var nextSpot = location.slice();
	binary = board.board[getBoardIndex(nextSpot)];
	while (!(binary & 1)){
		if (coordsContainRobot(board, [nextSpot[0],nextSpot[1]-1])) {
			return nextSpot;
		}
		nextSpot[1] = nextSpot[1] - 1;
		binary = board.board[getBoardIndex(nextSpot)];
	}
	return nextSpot;
}
var moveDownCoords = function(board, location) { 
	var destination = [];
	var nextSpot = location.slice();
	binary = board.board[getBoardIndex(nextSpot)];
	while (!(binary & 4)){
		if (coordsContainRobot(board, [nextSpot[0],nextSpot[1]+1])) {
			return nextSpot;
		}
		nextSpot[1] = nextSpot[1] + 1;
		binary = board.board[getBoardIndex(nextSpot)];
	}
	return nextSpot;
}
var getBoardIndex = function(coords){
	return [(coords[1] * 16) + coords[0]];
}
var coordsContainRobot = function(board, coords){
	if 	(board.blueRobot[0] === coords[0] && board.blueRobot[1] === coords[1]) {
		return true;
	}
	if 	(board.greenRobot[0] === coords[0] && board.greenRobot[1] === coords[1]) {
		return true;
	}
	if 	(board.redRobot[0] === coords[0] && board.redRobot[1] === coords[1]) {
		return true;
	}
	if 	(board.yellowRobot[0] === coords[0] && board.yellowRobot[1] === coords[1]) {
		return true;
	}
	return false;
}
var updateControls = function (){
	$(".moves-counter").html(moves.length - 1);
	$(".move-index").html(currentMove);
	if (currentMove == 0) {
		$(".previous").addClass("disabled");
	} else {
		$(".previous").removeClass("disabled");
	}
	if (moves.length - 1 == currentMove){
		$(".next").addClass("disabled");
	} else {
		$(".next").removeClass("disabled");
	}
}
var moveRobotToNextEmptySpot = function (e, robot){
	var map = {
		"blueRobot":"blue-robot",
		"greenRobot":"green-robot",
		"redRobot":"red-robot",
		"yellowRobot":"yellow-robot"
	}
	var selector = map[robot];
	var h = getRobotLocation($(e.target))[0] - boardLayout[robot][0];
	var v = getRobotLocation($(e.target))[1] - boardLayout[robot][1];
	if (h === v) {
		setRobotLocation($(selector),boardLayout[robot]);
	}
	else if (h > 0 && h > v) {
		var nextSpot = moveRightCoords( boardLayout, boardLayout[robot] );
		setRobotLocation($(e.target), nextSpot);
		boardLayout.board[getBoardIndex(boardLayout[robot])] 
		boardLayout[robot] = nextSpot;
		storeMove(moves, boardLayout);
		updateControls();
	}
	else if (h < 0 && h < v) {
		var nextSpot = moveLeftCoords( boardLayout, boardLayout[robot] );
		setRobotLocation($(e.target), nextSpot);
		boardLayout[robot] = nextSpot;
		storeMove(moves, boardLayout);
		updateControls();
	}
	else if (v > 0) {
		var nextSpot = moveDownCoords( boardLayout, boardLayout[robot] );
		setRobotLocation($(e.target), nextSpot);
		boardLayout[robot] = nextSpot;
		storeMove(moves, boardLayout);
		updateControls();
	}
	else {
		var nextSpot = moveUpCoords( boardLayout, getRobotLocation( $(e.target) ) );
		setRobotLocation($(e.target), nextSpot);
		boardLayout[robot] = nextSpot;
		storeMove(moves, boardLayout);
		updateControls();
	}
}