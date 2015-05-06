$(function(){
	$("#blue-robot").draggable({ 
		containment: "#game-board",
		scroll: false,
		grid: [34,34] ,
		stop: function(){
			if ($(this).css("left").match(/([0-9]*)px/)[1] > 40){
				setRobotLocation($(this),boardLayout.blueRobot);
			} else {
				setRobotLocation($(this),[0,15]);
			}
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
			console.log(e);
			//console.log("Diff x: " + e.offsetX + "\nDiff y: " + e.offsetY );
		},
		stop: function(e) {
			updateRobotLocation($(e.target), boardLayout.redRobot);
		}
	});
	$("#yellow-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34] });
	$("#green-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34] });
	initBoard(boardLayout);
});
var boardLayout = {
	blueRobot : [3,1],
	redRobot : [1,2],
	yellowRobot : [3,4],
	greenRobot : [5,6],
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
var setRobotLocation = function(robot, coords) {
	var h = (coords[0] * 34) + 5,
		v = (coords[1] * 34) + 5;
	robot.css({"left": h, "top": v});
};
var updateRobotLocation = function(robot, coords) {
	coords[0] = (parseInt(robot.css("left")) - 5) / 34 ;
	coords[1] = (parseInt(robot.css("top")) - 5) / 34 ;
};
