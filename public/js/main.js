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
	$("#red-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34] });
	$("#yellow-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34] });
	$("#green-robot").draggable({ containment: "#game-board", scroll: false, grid: [34,34] });
	initBoard(boardLayout);
});
var boardLayout = {
	blueRobot : [3,1],
	redRobot : [1,2],
	yellowRobot : [3,4],
	greenRobot : [5,6]
};
var initBoard = function (board) {
	setRobotLocation($("#blue-robot"),board.blueRobot);
	setRobotLocation($("#red-robot"),board.redRobot);
	setRobotLocation($("#yellow-robot"),board.yellowRobot);
	setRobotLocation($("#green-robot"),board.greenRobot);
};
var setRobotLocation = function(robot, coords) {
	var h = (coords[0] * 34) + 13,
		v = (coords[1] * 34) + 13;
	robot.css({"left": h, "top": v});
};
