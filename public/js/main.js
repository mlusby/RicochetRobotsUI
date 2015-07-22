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
	initBoard(boardLayout);
	storeMove(moves, boardLayout);
	moves.currentMove = 0;  //Reset current move to zero after initial board setup is stored in moves
	updateControls();
	$(".previous").click(function(){
		if (!$(this).hasClass("disabled")) {
			moves.currentMove--;
			updateControls();
			initBoard(moves.moveArray[moves.currentMove]);
		}
	});
	$(".next").click(function(){
		if (!$(this).hasClass("disabled")) {
			moves.currentMove++;
			updateControls();
			initBoard(moves.moveArray[moves.currentMove]);
		}
	});
});
var moves = {
	moveArray: [],
	currentMove: 0
};
var boardLayout = {
	blueRobot : [3,1],
	redRobot : [1,2],
	yellowRobot : [3,4],
	greenRobot : [5,6],
	objective : [11,6],
	objectiveRobot : "yellowRobot",
	board : [
		9,1,1,3,9,1,1,1,1,5,3,9,1,1,1,3,
		8,0,0,0,0,2,12,0,0,3,8,0,0,0,0,2,
		8,4,0,0,0,0,1,0,0,0,0,6,8,0,0,2,
		8,3,8,0,0,4,0,0,0,0,0,1,0,0,0,6,
		8,0,0,0,2,9,0,0,0,0,0,0,0,0,0,3,
		8,0,6,8,0,0,0,0,0,0,0,0,2,12,0,2,
		12,0,1,0,0,0,0,4,4,0,4,0,0,1,0,2,
		9,0,0,0,0,0,2,9,3,10,9,0,0,0,0,2,
		8,0,0,0,0,0,2,12,6,8,0,0,4,0,0,2,
		8,4,0,2,12,0,0,1,1,0,0,0,3,8,0,6,
		8,3,8,0,1,0,0,0,2,12,0,0,0,0,0,3,
		12,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,
		9,0,0,0,0,0,4,0,0,0,0,0,0,0,0,2,
		8,0,0,0,0,2,9,0,0,4,0,0,0,0,6,10,
		8,0,6,8,0,0,0,0,2,9,0,0,0,0,1,2,
		12,4,5,6,12,4,4,4,4,4,6,12,4,4,4,6
	]
};
var initBoard = function (board) {
	setObjective($("#objective"), board.objective, board.objectiveRobot);
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
var storeMove = function (moves, board){
	moves.moveArray = moves.moveArray.slice(0,moves.currentMove);
	var cloneBoardLayout = {
		blueRobot : board.blueRobot.slice(),
		redRobot : board.redRobot.slice(),
		yellowRobot : board.yellowRobot.slice(),
		greenRobot : board.greenRobot.slice(),
		objective : board.objective.slice(),
		objectiveRobot : board.objectiveRobot,
		board : board.board.slice()
	}
	moves.moveArray.push(cloneBoardLayout);
	moves.currentMove++;
}
var setRobotLocation = function(robot, coords) {
	var h = (coords[0] * 34) + 5,
		v = (coords[1] * 34) + 5;
	robot.css({"left": h, "top": v});
};
var setObjective = function(objective, coords, objectiveRobot) {
	var map = {
		"blueRobot":"blue-robot",
		"greenRobot":"green-robot",
		"redRobot":"red-robot",
		"yellowRobot":"yellow-robot"
	}
	var h = (coords[0] * 34) + 5,
		v = (coords[1] * 34) + 5;
	objective.css({"left": h, "top": v});
	objective.css("background-image",$("#"+map[objectiveRobot]).css("background-image"))
}
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
	$(".moves-counter").html(moves.moveArray.length - 1);
	$(".move-index").html(moves.currentMove);
	if (moves.currentMove == 0) {
		$(".previous").addClass("disabled");
	} else {
		$(".previous").removeClass("disabled");
	}
	if (moves.moveArray.length - 1 == moves.currentMove){
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