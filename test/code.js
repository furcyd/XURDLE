var BSP = {};

(function() {
    "use strict";

    // HTML elements
    var header = null, main, footer;
    var mainHome, mainBlevel, mainAlevel, mainAAlevel, mainAAAlevel;
    var footerHome, footerLevel;
    var puzzleID, container, puzzleSteps;
    
    var puzzleNumber, numberSteps;
    var containerW, containerH, solutionLength;
    var tokenSize; //  = 50;
    var grid;
    var tokens, numTokens, tokenRow, tokenCol;
    var colors =
	[ "target", "puck", "blue", "red", "black", "pink", "green",
	  "yellow" ];
    var top, left;
    var id;

    var direction, draggedDir = "", draggedToken = -1;
    const delta = 6;
    var startX = -1;
    var startY = -1;
    var actions;


    
    function showHome()
    {
	if (! header) // when first loading the page
	{
	    header = document.getElementById("header");
	    main = document.getElementById("main");
	    mainHome = document.getElementById("mainHome");
	    mainBlevel = document.getElementById("mainBlevel");
	    mainAlevel = document.getElementById("mainAlevel");
	    mainAAlevel = document.getElementById("mainAAlevel");
	    mainAAAlevel = document.getElementById("mainAAAlevel");
	    footer = document.getElementById("footer");
	    footerHome = document.getElementById("footerHome");
	    footerLevel = document.getElementById("footerLevel");
	    // header is 40-px high
	    // footer is 45-px high
	    // subtract 20 extra pixels to fit vertically on iPhone XR!!!
	    main.style.height = (window.innerHeight - 105) + "px"
	    mainHome.style.height = "100%";
	    mainHome.style.width = "100%";		    
	    mainBlevel.style.width = "100%";
	    mainBlevel.style.height = "100%";	    	    
	    mainAlevel.style.height = "100%";
	    mainAlevel.style.width = "100%";	    
	    mainAAlevel.style.height = "100%";
	    mainAAlevel.style.width = "100%";	    
	    mainAAAlevel.style.height = "100%";
	    mainAAAlevel.style.width = "100%";
	    mainPuzzle.style.height = "100%";
	    mainPuzzle.style.width = "100%";	    

	    // create level screens
	    var html, parent = document.getElementById("mainBpuzzles");
	    parent.style.gridTemplateRows = "repeat(50,1fr)";
	    for( var i = 1; i <= 50; i++)  // B level
            {
		let iCopy = i; // to resolve scope issue in the event handler
		html = '<img class="puzzleIcon" src="./pics/puzzleIcon.png" />' +
		    '<div class="puzzleText"><span>Puzzle B' + i + '</span>' +
		    '<br /><span id="puzzleB' + 1 + 'score" ' +
		    'class="puzzleScore">? / ?</span>';
		var puzzle = document.createElement("button");
		puzzle.style.setProperty("id", 'puzzleB' + i );
		puzzle.onclick =
		    function () { showPuzzle("B", iCopy ); };
		puzzle.classList.add( 'puzzleNumber' );
		puzzle.innerHTML = html;
		parent.appendChild(puzzle);
		//parent.appendChild(document.createElement("br"));
	    }
	    parent = document.getElementById("mainApuzzles");
	    parent.style.gridTemplateRows = "repeat(50,1fr)";	    
	    for( var i = 51; i <= 100; i++)  // A level
            {
		let iCopy = i; // to resolve scope issue in the event handler
		html = '<img class="puzzleIcon" src="./pics/puzzleIcon.png" />' +
		    '<div class="puzzleText"><span>Puzzle A' + i + '</span>' +
		    '<br /><span id="puzzleA' + 1 + 'score" ' +
		    'class="puzzleScore">? / ?</span>';
		var puzzle = document.createElement("button");
		puzzle.style.setProperty("id", 'puzzleA' + i );
		puzzle.onclick =
		    function () { showPuzzle("A", iCopy ); };
		puzzle.classList.add( 'puzzleNumber' );
		puzzle.innerHTML = html;
		parent.appendChild(puzzle);
		//parent.appendChild(document.createElement("br"));
	    }


	    parent = document.getElementById("mainAApuzzles");
	    parent.style.gridTemplateRows = "repeat(200,1fr)";
	    for( var i = 101; i <= 200; i++)  // AA level
            {
		let iCopy = i; // to resolve scope issue in the event handler
		html = '<img class="puzzleIcon" src="./pics/puzzleIcon.png" />' +
		    '<div class="puzzleText"><span>Puzzle AA' + i + '</span>' +
		    '<br /><span id="puzzleAA' + 1 + 'score" ' +
		    'class="puzzleScore">? / ?</span>';
		var puzzle = document.createElement("button");
		puzzle.style.setProperty("id", 'puzzleAA' + i );
		puzzle.onclick =
		    function () { showPuzzle("AA", iCopy ); };
		puzzle.classList.add( 'puzzleNumber' );
		puzzle.innerHTML = html;
		parent.appendChild(puzzle);
		//parent.appendChild(document.createElement("br"));
	    }

	    parent = document.getElementById("mainAAApuzzles");
	    parent.style.gridTemplateRows = "repeat(1000,1fr)";
	    for( var i = 201; i <= 1000; i++)  // AAA level
            {
		let iCopy = i; // to resolve scope issue in the event handler
		html = '<img class="puzzleIcon" src="./pics/puzzleIcon.png" />' +
		    '<div class="puzzleText"><span>Puzzle AAA' + i + '</span>' +
		    '<br /><span id="puzzleAAA' + 1 + 'score" ' +
		    'class="puzzleScore">? / ?</span>';
		var puzzle = document.createElement("button");
		puzzle.style.setProperty("id", 'puzzleAAA' + i );
		puzzle.onclick =
		    function () { showPuzzle("AAA", iCopy ); };
		puzzle.classList.add( 'puzzleNumber' );
		puzzle.innerHTML = html;
		parent.appendChild(puzzle);
		//parent.appendChild(document.createElement("br"));
	    }
	    

	}
	hideBlevel();
	hideAlevel();
	hideAAlevel();
	hideAAAlevel();
	hidePuzzle();	
	mainHome.style.display = "block";
	footerHome.style.display = "flex";	
    }

    function hideHome()
    {
	mainHome.style.display = "none";
	footerHome.style.display = "none";		
    }

    function hideBlevel()
    {
	mainBlevel.style.display = "none";
	footerLevel.style.display = "none";		
    }

    function hideAlevel()
    {
	mainAlevel.style.display = "none";
	footerLevel.style.display = "none";		
    }    

    function hideAAlevel()
    {
	mainAAlevel.style.display = "none";
	footerLevel.style.display = "none";		
    }    

    function hideAAAlevel()
    {
	mainAAAlevel.style.display = "none";
	footerLevel.style.display = "none";		
    }    

    function hidePuzzle()
    {
	mainPuzzle.style.display = "none";
	footerPuzzle.style.display = "none";		
    }    

    
    function showBlevel()
    {
	hideHome();
	mainBlevel.style.display = "block";
	footerLevel.style.display = "flex";
    }

    function showAlevel()
    {
	hideHome();
	mainAlevel.style.display = "block";
	footerLevel.style.display = "flex";
    }

    function showAAlevel()
    {
	hideHome();
	mainAAlevel.style.display = "block";
	footerLevel.style.display = "flex";
    }    

    function showAAAlevel()
    {
	hideHome();
	mainAAAlevel.style.display = "block";
	footerLevel.style.display = "flex";
    }    

    function showHelp()
    {
    }

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
    
    function showPuzzle(level,number)
    {
	window.ontouchmove = preventDefault;
	number = Number(number);
	numberSteps = 0;
	console.log("Puzzle " + level + number);
	hideBlevel();
	hideAlevel();
	hideAAlevel();
	hideAAAlevel();
	mainPuzzle.style.display = "block";
	footerPuzzle.style.display = "flex";

	containerW = 5;
	containerH = 5;
	puzzleID = document.getElementById("puzzleID");
	container = document.getElementById("container");
	puzzleSteps = document.getElementById("puzzleSteps");	
	tokenSize =
	    Math.floor(Math.min( window.innerWidth / containerW,
				 (main.style.height.slice(0,-2)-60) / containerH));
	console.log(tokenSize);
	container.style.backgroundSize =
	    tokenSize + "px " + tokenSize + "px";
	container.style.height = (containerH * tokenSize) + "px";
	container.style.width = (containerW * tokenSize) + "px";
	container.style.display = "block";
	init(number);
    }

    function decode(pbNumber)
    {
	puzzleNumber = pbNumber;
	var index = 2*(pbNumber - 1);	
	var code = [ codes[index], codes[index+1] ];
	containerW = 5;
	containerH = 5 + (code[0] & 1);
	numTokens = code[1] & 7;
	solutionLength = (code[0] >> 1) & 31;
	tokenRow = [];
	tokenCol = [];
	grid = [];
	tokens = [];
	var row;
	for( var r = 0; r < containerH; r++)
	{
	    row = [];
	    for( var c = 0; c < containerW; c++)
		row.push( "" );
	    grid.push(row);
	}
	var tmp = (code[0] >> 6) & 31;
	tokenRow[0] = Math.floor(tmp / containerW);
	tokenCol[0] = tmp % containerW;
	grid[tokenRow[0]][tokenCol[0]] = 0;
	tmp = (code[0] >> 11) & 31;
	tokenRow[1] =  Math.floor(tmp / containerW);
	tokenCol[1] = tmp % containerW;
	grid[tokenRow[1]][tokenCol[1]] = 1;
	tmp = (code[0] >> 16) & 31;
	tokenRow[2] =  Math.floor(tmp / containerW);
	tokenCol[2] = tmp % containerW;
	grid[tokenRow[2]][tokenCol[2]] = 2;
	if (numTokens >= 2)
	{
	    tmp = (code[1] >> 3) & 31;
	    tokenRow[3] =  Math.floor(tmp / containerW);
	    tokenCol[3] = tmp % containerW;
	    grid[tokenRow[3]][tokenCol[3]] = 3;
	}
	if (numTokens >= 3)
	{
	    tmp = (code[1] >> 8) & 31;
	    tokenRow[4] =  Math.floor(tmp / containerW);
	    tokenCol[4] = tmp % containerW;
	    grid[tokenRow[4]][tokenCol[4]] = 4;
	}
	if (numTokens >= 4)
	{
	    tmp = (code[1] >> 13) & 31;
	    tokenRow[5] =  Math.floor(tmp / containerW);
	    tokenCol[5] = tmp % containerW;
	    grid[tokenRow[5]][tokenCol[5]] = 5;
	}	
	if (numTokens >= 5)
	{
	    tmp = (code[1] >> 18) & 31;
	    tokenRow[6] =  Math.floor(tmp / containerW);
	    tokenCol[6] = tmp % containerW;
	    grid[tokenRow[6]][tokenCol[6]] = 6;
	}	
	if (numTokens >= 6)
	{
	    tmp = (code[1] >> 23) & 31;
	    tokenRow[7] =  Math.floor(tmp / containerW);
	    tokenCol[7] = tmp % containerW;
	    grid[tokenRow[7]][tokenCol[7]] = 7;	    
	}	
	//console.log(grid);

    }// decode


    function reverseDir(dir)
    {
	switch (dir)
	{
	    case "right": return "left";
	    case "left": return "right";
	    case "down": return "up";	    
	    case "up": return "down";
	}
    }
    function animateLastAction(delay)
    {
	var action = actions.pop();
	var reverse;
	if (action)
	{
	    reverse = [action[0], reverseDir(action[1]),
		       action[4], action[5],
		       action[2], action[3]];
	    performSlide(reverse,false,delay);	    
	}
    }

    function reset()
    {
	init(puzzleNumber);
    }

    
    function createAction(step)
    {
	var token, dir;
	var startRow, startCol, endRow, endCol;
	var action = "";
	token = step[0];
	dir = step[1];
	startRow = token.BSP.row;
	startCol = token.BSP.col;
	endRow = startRow;
	endCol = startCol;	    
	switch (dir)
	{
	    case "right":
	    if (startCol < containerW - 1) // not on the edge
	    {
		endCol++;
		while (endCol < containerW &&
		       (grid[startRow][endCol] === "" ||
			grid[startRow][endCol] === 0))
		    endCol++;
		if (   (endCol < containerW) &&
 		       (endCol != startCol + 1) )
		    action = [token.id, dir, startRow, startCol,
				  startRow,endCol-1 ];
	    }
	    break;
	    case "left":
	    if (startCol > 0) // not on the edge
	    {
		endCol--;
		while (endCol >= 0 && (grid[startRow][endCol] === "" ||
 				       grid[startRow][endCol] === 0))
		    endCol--;
		if (   (endCol >= 0) &&
 		       (endCol != startCol - 1) )
		    action = [token.id, dir, startRow, startCol,
				  startRow,endCol+1 ];
	    }
	    break;
	    case "down":
	    if (startRow < containerH - 1) // not on the edge
	    {
		endRow++;
		while (endRow < containerH &&
		       (grid[endRow][startCol] === ""   ||
 			grid[endRow][startCol] === 0))
		    endRow++;
		if (   (endRow < containerH) &&
 		       (endRow != startRow + 1) )
		    action = [token.id, dir, startRow, startCol,
				  endRow-1,startCol ];
	    }
	    break;
	    case "up":
	    if (startRow > 0) // not on the edge
	    {
		endRow--;
		while (endRow >= 0 &&
		       (grid[endRow][startCol] === ""   ||
 			grid[endRow][startCol] === 0))
		    endRow--;
		if (   (endRow >= 0) &&
 		       (endRow != startRow - 1) )
		    action = [token.id, dir, startRow, startCol,
				  endRow+1,startCol ];
	    }
	    break;
	}
	if (action)
	{
	    actions.push(action);
	    performSlide(action,true);
	}
    }
    
    function getTop(e)
    {
	return e.getBoundingClientRect().top +  window.scrollY;
    }

    function getLeft(e)
    {
	return e.getBoundingClientRect().left +  window.scrollX;
    }

    function init(probNumber)
    {
	decode(probNumber);
	numberSteps = 0;
	updateStepsDisplay();	
	actions = [];
	tokens = [];
	/*
	document.getElementById("puzzleNumber").innerHTML =
	    "Puzzle #" + puzzleNumber;
	document.getElementById("numberSteps").innerHTML =
	    numberSteps + " steps";	
	*/

	var handleMouseUp = function (event)
	{
	    if (draggedToken)
	    {
		const diffX = Math.abs(event.pageX - startX);
		const diffY = Math.abs(event.pageY - startY);
		if (diffX < delta && diffY < delta)
		{
		    direction = "";
		    draggedToken = null;
		    return;
		}
		direction = diffX > diffY ? "horizontal" : "vertical";
		if (direction === "horizontal")
		{
		    if (event.pageX > startX)
			direction = "right";
		    else
			direction = "left";
		} else
		{
		    if (event.pageY > startY)
			direction = "down";
		    else
			direction = "up";
		}
		createAction( [ tokens[draggedToken.id], direction] );
	    }
	};
	container.addEventListener('mouseup', handleMouseUp );
	container.addEventListener('touchend', handleMouseUp );	
				  
	top = getTop(container);
	left = getLeft(container);
	container.replaceChildren(); // remove all children if any
	for(var i = 0; i < tokenRow.length; i++)
	{
	    var token = document.createElement("div");
	    token.classList.add("token");
	    token.id = i;
	    var row = tokenRow[i];
	    var col = tokenCol[i];
	    token.BSP = { "row": row, "col": col};
	    grid[row][col] = i;	    
	    token.style.left = (left + token.BSP.col * tokenSize) + "px";
	    token.style.top = (top + token.BSP.row * tokenSize) + "px";
	    token.style.width = tokenSize + "px";
	    token.style.height = tokenSize + "px";
	    token.style.position = "absolute";
	    token.style.lineHeight = tokenSize + "px";
	    token.style.fontSize = tokenSize + "px";
	    token.style.background = "url(./pics/" + colors[i] + ".png";
	    token.style.backgroundPosition = "center";
	    token.style.backgroundOrigin = "content-box";
	    token.style.backgroundRepeat = "no-repeat";
	    if (i===0)
		token.style.backgroundSize = (tokenSize) + "px "
		+ (tokenSize) + "px";
	    else if (i===1)
		token.style.backgroundSize = (0.8*tokenSize) + "px "
		+ (0.8*tokenSize) + "px";
	    else
		token.style.backgroundSize = (tokenSize-5) + "px "
		+ (tokenSize-5) + "px";
	    var handleMouseDown = function (event) {
		startX = event.pageX;
		startY = event.pageY;
		if (event.target.id === "0") // the target
		    draggedToken = null;
		else
		    draggedToken = event.target;
	    };
	    container.addEventListener('mousedown', handleMouseDown);
	    container.addEventListener('touchstart', handleMouseDown);	    
	    tokens.push(token);	    
	    container.appendChild(token);
	}
    }// init

    function performSlide(action,incrementStepCounter, delay)
    {
	var dx, dy;
	const startX = left + tokenSize * action[3];
	const startY = top + tokenSize * action[2];
	const endX = left + tokenSize * action[5];
	const endY =  top + tokenSize * action[4];		
	switch (action[1])
	{
	    case "right": dx = 1;  dy = 0;  break;
	    case "left":  dx = -1; dy = 0;  break;
	    case "down":  dx = 0;  dy = 1;  break;
	    case "up":    dx = 0;  dy = -1; break;
	}
	if (delay === undefined)
	    delay = 1000 / (4 * tokenSize);
	var id = null;
	clearInterval(id);
	id = setInterval(slide,delay);
	var x = startX;
	var y = startY;
	function slide()
	{
	    if (x === endX && y === endY)
		clearInterval(id);
	    else
	    {
		x += dx;
		y += dy;
		tokens[action[0]].style.left = (x) + 'px';
		tokens[action[0]].style.top = (y) + 'px'; 
	    }
	}
	tokens[action[0]].BSP.row = action[4];
	tokens[action[0]].BSP.col = action[5];	
	grid[action[4]][action[5]] = action[0];
	grid[action[2]][action[3]] = "";	
	slide();
	if (incrementStepCounter)
	    numberSteps++;
	else
	    numberSteps--;
	updateStepsDisplay();
    }// performSlide

    function updateStepsDisplay()
    {
	console.log("here");
	puzzleSteps.innerHTML =
	    numberSteps + " step";
	if (numberSteps !== 1)
	    puzzleSteps.innerHTML += "s";
    }

    const codes = [1053380,2,1332228,138,1227588,26,697348,138,750020,18,928580,122,1262404,122,369348,98,180676,170,113156,34,1053382,1379,1454854,1859,896006,1403,1252038,3843,1395078,1835,1098822,3507,361158,3619,994310,2227,760262,291,149958,91,346632,90500,433158,126612,1536840,94292,660168,147620,1540550,20036,265032,6283,43464,915,887302,33436,3206,178252,373446,58236,950790,197380,655814,955,1577478,35700,262598,611,1260360,18868,6856,45476,219590,2051,1579526,2891,6534,387,1342214,26004,297798,69172,425030,201644,283014,3075,1550854,74388,469704,5259,602888,1971,166598,43132,1279046,174132,1389638,127764,1311432,8884,1030926,5031717,1096076,123244,416524,800693,219914,1733821,924430,53341,1383500,4989525,686540,4739973,393676,5149213,1520714,2535573,692938,5565493,1313294,200740,1602698,2389077,600842,4892269,1471182,1196413,1143626,1340829,1002506,4728245,1182090,4987,627148,308357,1557644,29868,572430,28436,137678,2185381,1221322,115500,640140,2016861,918606,5001141,205324,5329669,84748,181116,1180494,2649781,1278794,1460389,310030,2384261,1509772,5268,1399566,180556,375566,601925,1389386,1169157,597070,5155445,1321674,184588,928526,5803845,1350474,1926317,1538828,2429701,33482,1868357,1536844,1701269,172428,152909,1317262,6471749,1422410,24949,1512142,382037,6538,5386157,805386,6160733,105610,95508,240074,403837,1090634,161292,235978,6381709,158226,1389765,698834,1062933,74192,1463061,27344,4756677,699152,74132,1473296,6304365,983568,5781285,230162,3868421,1573584,5535613,1395538,4014229,113104,82948,44112,6111517,1415956,1336517,441170,3797429,1581844,5811989,983504,70308,11412,644997,1538576,337517,1442642,3953229,572178,165676,115856,5566541,574608,2935213,222292,1246629,1483856,69572,1422164,5038941,1208784,2640325,1180048,1373293,1321808,39068,1253842,1475421,963730,1442757,154772,5926429,1387604,77724,264720,4094029,1315280,186308,369748,1231221,691218,5579453,1030928,75564,1250066,2656701,356880,148005,486544,963373,8976,6157197,306324,930565,1442512,5515853,1450448,152645,1442898,3705533,938704,6228261,262864,3798941,1002256,1955597,50320,17588,666770,693125,920656,189820,1380880,2490509,896146,3858717,84692,4069149,928784,4122733,611024,24764,74832,4090557,371538,905341,356756,1964061,177298,200740,1329938,6031045,178962,265861,1289232,1090157,502864,4692,226128,5961853,238288,1364741,1426578,75324,594452,5902277,1051090,148676,175248,1472141,1389330,115908,377616,5890821,729552,14516,1287312,2362669,1620752,4842013,113426,1493581,369682,71532,293584,10420,311826,5404,1256144,972925,1360400,27308,967696,5256589,148240,4123173,1616976,189052,662290,6472709,1256148,1758325,1182160,2556029,19216,4085109,154128,6196301,6544,5441909,1553488,26308,107538,79556,1383504,83100,926484,529829,611156,431909,1348306,707245,592660,95940,662288,5039525,41680,115796,1538832,341253,1248088,61000246,498774,1070685,1198486,98053718,535640,162704214,1549334,1323853,827862,164905078,371096,5105941,598550,110449094,1581848,2280109,658198,4003421,42134,2811469,611158,22597566,918550,193475886,1576024,1164981,1382872,198084022,1326230,4028277,1442582,6227237,173080,2471429,1245720,87322798,635608,315333,766424,171615030,181014,1217405,870808,14863038,1377304,69649238,989654,2623669,1410198,1763605,656534,63837534,238614,114958782,1247768,110023822,631830,5091166,1059606,1852277,152408,165227406,1225176,131932486,1157974,845213,106904,1445558,992278,197717614,1293400,611341,113174,94687158,35350,1427997,1361046,6103317,267352,70691478,1096216,75762374,1449048,5312261,304216,3080709,199702,6155781,432918,41893,181014,42893350,1470870,152166926,312406,2273045,312088,164693,592406,87717,228120,8411254,87192,1231813,963286,1503013,420312,126273694,1469142,3159158,1026456,185889598,1507862,37839422,611416,68024078,1459030,1486461,1288918,85012030,1384982,201917,1030616,5128525,959000,9779254,115480,689237,86552,4797373,1551510,102614638,873494,791965,700888,196612646,1069526,5843725,1276630,723533,770904,5010701,1614550,4833541,949014,6082997,1553560,20064646,107672,98347390,500822,1466821,402582,13678414,950680,6153501,1286870,450669,1418070,29666206,631192,3682901,928598,922973,928470,5669406,1592088,455253,700886,160581126,173078,201615622,1032662,136487350,566360,5785398,41496,160836894,1510422,20821582,332566,30747510,902294,525477,1358296,17813,1210776,202146150,871126,89851926,961622,1349813,1528342,176190262,104984,81170438,1412118,4803014,1418390,161801542,1255894,16902830,262550,2557365,742230,145150774,1022678,89846342,1557336,171978422,1510488,101616582,95382,131904950,242198,193358342,1422486,129688150,1442262,4001805,566294,163057502,305878,162072430,1121112,45790726,1512598,94818590,731606,19535734,358872,2471437,637974,4109077,307670,80334598,1425942,50487582,664662,67736982,1293078,642845,205206,4842909,1120664,206499598,660630,56742926,1620758,19567366,917910,2119077,414168,340661,87128,71069,1090648,128278686,348696,177108758,29398,22451742,1385494,42530974,1383254,68497078,1421846,25784990,312086,933973,227734,194402462,337048,2623933,674520,45773238,291222,14021310,178648,5845885,1077718,958549,695126,2124205,1049046,151605678,527448,5885733,705558,30786142,176854,6145661,181014,825213,662358,119584310,172438,201723518,928600,5669765,1469142,130662734,293270,13568878,1473046,4207693,985558,6326709,614934,12969654,705686,144421,1083928,187203662,1028632,1340349,131608,148998574,1254488,59077934,332888,180433678,695064,2171821,817878,1052349,700950,5010581,84696,6228629,920726,124605,571862,188571958,1614870,2130301,414232,205271374,1461336,625605,402198,6103205,984214,6104741,402264,128978566,985622,5817677,674584,3438021,891414,126618534,1614934,2379397,435030,6229637,1381462,161579350,297368,70909998,1326166,87757622,990296,169541,304216,3568918,525464,94642878,797720,131975062,1442198,5402661,238680,165004294,1012886,1762333,1061398,966813,41752,819909,1188568,114586414,357078,18953574,1332374,130831694,309718,645253,1157974,156469,619288,22843566,29718,64878742,312408,106432070,1340438,178552902,959190,4995077,1450710,68808326,826390,2741533,76566,188416166,106902,6114637,1053782,131379982,307670,196349774,1115286,59924910,433238,72993822,21656,26923870,422360,914629,111062,79589894,1537046,67150462,660310,264597,610776,4079981,1507736,1126285,416216,198067126,1260632,204113942,7320,5162341,1483862,86259038,107286,135009654,197782,119076742,1266518,140108646,336726,156576270,664726,69132486,1028950,418677,881366,30716550,1422038,378749,1471190,76459790,1407766,3736581,1510550,84453798,991958,172934758,242200,5384861,926422,152393294,1466838,160312630,1094486,20736670,27030,21664694,172824,161909,891414,47306022,141784,6204853,367062,5424005,1592086,195568158,1180758,5538653,49944,2774821,86550,4098461,109718,102610806,1539224,54092198,1223064,18247014,246614,2272853,703256,692261,74586,4806085,1094490,155117174,178714,138242470,1184154,109513046,1319322,42931886,1031002,64602566,795098,70151958,1249818,87954718,619036,188494726,1254556,186486798,1470874,10260254,1063642,123786366,1266778,5508893,1405980,101233606,332954,2420669,594458,3757989,266970,5943853,1184602,5687885,631322,122356094,242394,102051502,1405658,841518,1483802,335989,1006746,20113846,1507738,4009229,1117210,4011805,1383580,52322606,597148,68604710,592922,4113734,1531034,81023006,1321818,6463861,160474,152465838,1342554,188769910,459868,35205046,638044,84414222,1537052,153527574,500444,188568198,1086172,100689710,1294812,28095798,238618,74949,463708,135386158,355354,16952990,1215324,4276558,336284,6231301,205594,56144542,348572,162557366,857178,181208150,1198490,3943357,207388,11064246,181402,6154541,76316,3842981,106906,4656685,356826,960709,1381210,164168534,1547034,1606229,35354,35999166,42140,2556181,8988,186282542,590364,6461197,363034,75909790,697370,42624094,498716,180987158,1157660,160350774,1458906,154267958,1528346,337269,1288986,70193806,357148,185497670,564250,1365277,1332060,134935886,1512476,1364909,312154,832597,695130,92448030,1391772,160459366,227740,120164910,111068,161830806,1549018,142619254,1290778,571165,1356252,138718750,881690,64751998,663962,3684245,174554,1141445,29852,177525526,197338,5027261,664730,4268221,162972,94770982,756252,86258334,152410,12351134,70044,123555718,367642,20337974,1444890,78845822,371098,130897430,1258522,6153077,987546,11430478,242524,2778429,1254170,26666678,987866,55507062,1508508,184929702,992410,192984654,739738,113055246,1319386,56722222,740506,6041541,986138,6097301,986202,169549,881754,4120853,619612,47547038,918554,182494366,178970,1249101,1508506,77656086,265306,54081214,1451100,194405182,574234,130304422,1550876,290717,631514,106941,1340122,176688574,992348,2528773,201242,162441878,1399644,193541254,1198490,185002694,635290,3940509,1395482,2226261,857114,144115886,1350170,85557582,1143194,128226830,1005980,165593902,565978,191757,423066,18260382,621404,151317294,84378,27826070,115100,140054334,998426,196200982,328410,152148054,1115290,47011110,1069532,151167534,398044,61092438,1268124,47858558,1003994,30340398,590362,4232373,1022810,156815734,107610,68766646,1180122,103568582,959002,181093,690714,10942086,619034,6050901,1462748,110652318,590682,144633878,303900,3670701,1614618,74021,599196,72183478,160220,182194766,660634,4196797,70746,46067294,1182746,4003661,1512282,2754861,86554,5171589,553370,5548573,1209372,386493,1418394,4989957,1098586,165007158,72796,152876310,590364,5257405,1557532,2649773,1098588,3945805,46236,195940110,92572,73019166,1221338,62740110,631962,109491990,1221018,3684397,821660,29543982,610842,6185357,1418076,197814286,217564,35281078,219674,160878646,870810,188551182,1157914,112134222,207386,381102,959260,12775318,97370,1232557,1614362,75843438,131612,123085670,1483292,160268398,1608218,136757590,42010,821701,736410,72176838,1012892,694021,1548826,2404365,141850,88893110,172828,6407293,563610,26595422,113180,80303030,703002,20845646,1264028,413629,1088218,28910918,926554,349845,434972,122085534,1602650,1765141,20956,157046110,217626,185004806,1468828,159672446,358876,6039973,498458,110121270,367644,841069,141852,9342638,336986,190948182,695066,6059301,170778,1171797,887322,81612302,635738,33637822,1577370,2373205,1004316,75941910,1067418,171792142,1460636,412357,1415708,95439214,825882,9963902,962972,45975582,357466,176834110,529436,5154229,867482,178901790,1538522,203969446,1510426,203755374,1156252,196208246,1489754,138290806,1444954,1345917,639516,151628702,205530,6117541,1094170,5121309,398362,79487166,1383450,1250093,152602,37636542,394010,168677438,661914,126183318,115164,151571110,922330,145944374,154778,135829694,377882,106578606,1573724,93193550,704924,832845,705306,21541,695324,182223814,1531034,19540406,1537050,3949653,619292,130998822,1449050,2405189,674202,292725,357402,178279358,1227226,2518805,97372,5874717,1397914,4989893,992028,5249197,109724,196792638,403930,140250646,695130,25207214,1797539,48429590,1341983,25622742,105187,226725326,1907487,5015005,51687,160003246,432613,116556102,973865,279461,1694559,224423854,1808799,103055782,308255,72264334,818339,235620174,1418399,12975222,1366817,87979806,398501,6786893,94631,192056654,380385,137068878,56031,122762006,198123,65734190,705311,131496478,547939,241190022,922083,6421157,1772319,6719941,435679,37387326,1567273,19264902,690719,153534918,1934753,177314838,1800619,9374510,39711,7251149,1764447,1214485,429539,23565686,318885,3835165,1800927,201571398,1121319,45301190,1625507,94914798,949731,220171622,670753,6331117,58465,6314253,1626663,793725,252961,180701342,1924191,34213094,316191,4144397,56741,3835109,1249759,6061221,595359,32625902,1464863,17742790,1612835,32041710,650401,792877,1000929,224505446,374115,82472990,1041759,342989,721441,183007358,1805665,23794518,1760291,162236438,152671,6588653,1632991,46164454,252767,223529670,563621,15701190,27745,105554638,125349,132023118,1801055,144905742,624097,23805150,1931745,208430638,642399,163218158,863391,70937262,949663,102536678,1940575,90992070,594791,1806293,1930401,42521998,369055,31353830,1790367,219170278,1881247,213398550,1340833,7378957,707051,221340358,60517,119426254,731685,146307606,1777057,238830014,95391,168740766,70113,84889542,1639845,151587294,650081,4137349,189535,5156389,712101,7350533,1953193,193366414,1120799,7059589,1653791,54198654,1629545,99217438,1704995,188425038,1188255,243615590,1432421,197501,1364449,1776669,1747743,986885,891295,107649806,329073,163281166,975713,6084773,1647399,89285,1159647,240939822,101855,78216246,387875,5003533,1367073,1680285,105823,1020973,1290785,7251486,1252833,82856030,1790499,12561190,1189289,227324862,161253,148421318,1908063,156194862,687521,82639886,616991,11710390,1807135,50526574,621993,210990094,853409,94053854,1764389,39350182,317861,223251726,1516965,51270622,402857,229115294,1366495,984685,1297123,40900286,162277,57305790,1864483,151598206,1329637,115367062,217639,224562606,1427875,163871790,250337,53638798,1256287,213035150,1838111,133433462,517223,693037,1432031,108045254,1709535,43190302,236575,90065878,1696863,566437,1019361,118193326,1905189,177545998,217633,94074310,1567775,152481310,1173989,228589990,1809831,91285742,1839839,80602822,601183,6642701,322401,6938957,1250337,7398829,1577705,351310,595107,6986797,1605023,6832909,1254177,7387102,421343,59291862,691359,79731718,160809,232228174,254435,126473934,60131,138307758,1367207,205213454,432869,80771942,116193,74526598,1629031,2220333,591327,59391150,639519,242614926,1854303,39461030,1398177,175056910,1820063,46551838,54367,2297685,1593887,142041374,370079,11759950,1368547,3216910,1880545,10943102,742497,10929830,660257,83113758,1708897,26858326,1593887,7555341,1397857,586573,1189285,233882526,709151,1603630,160479,3455717,962977,4992805,937059,193327838,1802785,30910814,256427,47911638,1709475,80408454,248357,232967054,1683999,7496453,1677791,232849830,611363,18036622,645601,5144902,1906017,32089494,152743,65726766,1287327,1000998,991655,120021254,104863,104559822,928225,7050518,468451,204775646,1605087,21019230,1647391,129197,228833,6306677,1397279,6302005,183073,233368262,1801061,224575814,1351007,2694157,6559,5061581,1789029,19445702,1512163,5215533,1624481,156803878,1300961,240566838,1117663,175352086,922401,12367062,581023,5067789,1497887,171530270,1856993,76154294,1582561,15615798,1510433,54380294,1905125,73826678,140769,140541166,1891103,30313086,1397167,59290598,988257,72305262,1350113,200026190,170529,240463310,1772321,87898854,924449,7677397,1809829,26708374,146913,123442230,1769951,29437870,1174565,178287446,334629,4070342,423333,202267550,619043,172237534,1709153,163399726,1905381,7386029,207647,231687334,1332585,44317462,929133,191795238,418337,132850630,125343,5926685,1198823,241028918,1799527,18324110,425311,171511014,332837,5216173,1605025,221530198,1770215,174259238,218527,74231566,1886623,206087126,870815,203439014,1778465,7606205,1311839,228886190,1296867,15249430,729503,11189710,140453,49075030,1713313,6302213,1315871,2559533,1916255,3099213,1250017,132434374,1618463,10939110,633895,238040190,247137,1422037,1772063,170327526,1037407,7096813,262943,5676413,751007,183517230,1907167,2309133,250719,165324558,1200607,2906758,1297567,9208022,1750369,51163254,293281,185883366,1512607,2527029,1004319,76772878,1871331,36003926,296423,234907630,1792545,39613678,1404065,734022,1370663,121715214,1326433,4165790,74913,7690949,1862049,193444774,1954207,1332341,398497,2405565,1508383,2865733,1370665,23770702,1236387,1060557,1886625,202822942,580323,198093342,1921571,202327310,134303,195440822,1069535,207362582,1266207,188490630,826723,25377390,294313,82534862,55845,2821405,922655,43641790,1877475,122955678,268833,249950270,388127,193846446,1853857,909717,1195365,162239726,1844063,6294149,117215,171411534,1366751,1609349,1416609,1614565,977765,240297854,425375,3889173,1267167,42437582,1640865,7341973,592673,1481629,1362975,5061901,1416031,53599142,1713631,2374789,1719647,2859341,160227,240544134,1714911,28552902,71073,6506029,1842595,40685182,1774119,215233310,432931,124797862,1887393,193377190,1614371,133450134,171427,5474909,1340127,235690254,1155487,64791078,1839523,61407566,1563487,983597,1667489,7308077,348639,18502918,294303,24264102,1536803,109655422,373795,183004766,1313951,187141774,712101,2594061,1869281,90723662,219617,156200238,333217,6509645,1891743,3711821,402911,15610566,185823,1138101,285215,224789486,152735,145833174,1246623,51665694,262691,7655893,1907423,185812366,639779,126462158,191265,80446590,703203,293829,1301995,236459190,333153,3611861,1952863,1918005,90529,171209702,642467,2852877,1870559,23627862,988197,48089758,121251,5433701,256543,1317317,277669,162118262,1185123,99334190,1385887,168111078,525483,202253782,1591715,15698574,246499,180962430,216417,20953662,162219,169302246,97707,223648630,1219041,241549998,1675681,5778910,60133,221286702,1770531,221799830,625823,14469734,660575,161135174,206241,233392142,1332647,15500878,632291,240607902,935267,37709222,1778079,241215494,1688287,177294662,1626593,1602789,610849,482285,1035743,24171278,648287,574629,918303,76834774,51939,166913206,256423,43978198,1629025,4728093,262951,6938021,926815,115885470,1629605,2401149,1733157,10352462,160223,215463838,707043,182633198,162217,48298590,1165727,7095741,1537123,1439253,1185189,219592870,367077,205212702,1683873,121680926,1712863,31644718,1711455,133210678,335205,5397253,1788323,59053142,189919,2699693,767007,118781262,99175,7197733,1043809,121817814,1300895,6324565,54113,29117126,1239519,235624278,1582179,128673822,257375,171455182,754211,232957470,1743907,32588950,1084895,122967782,1578401,218466950,1875361,5595693,1633311,191393150,379367,5001910,355487,59388886,1451359,65206870,1320415,7384781,1829279,70424078,228767,226592862,70117,202325334,621983,240397118,1763809,12348854,257187,479053,1033631,242498414,1536481,235078574,1742305,64591958,121315,187020502,1628899,101503022,1215839,90898974,639529,20940694,1348383,1007773,449381,4320966,1068385,171863014,650271,28788038,174629,171945550,330527,3753181,336991,6536317,918563,79493910,1725217,21988782,1315301,5211677,97439,6513541,949727,223558718,1538917,203645494,398367,1512741,594655,91414918,1042851,201939246,207395,166292078,925151,40067118,1042975,996149,188837,6661501,1705311,143947966,19489,133192998,709343,986533,1905193,7114709,357413,227252790,839073,227292118,252641,4360461,291295,743293,1798561,139474894,1867231,174458486,336609,193432302,949669,174859934,998243,149047510,1952483,84424894,1639263,1170221,1709413,1621325,1451169,27420270,893727,7078813,449247,3840541,1760607,76923798,1502305,132760486,1744287,120879926,932895,234900862,1032671,68785678,781471,220649734,1775075,2524645,332195,162020566,986143,81347846,1340127,2292789,1629223,70963158,648671,6982165,1759775,177079710,711839,334005,226787,207890910,225761,238310478,585057,235484246,40289,5356573,969573,148758934,211807,141949382,1313253,103029830,490657,17002214,1913695,39393934,197727,7376589,361951,19368118,333219,208203862,299423,201708766,1759649,26679678,122023,238984606,1631007,2842661,1929699,150123542,1688351,149711494,1840159,118830406,1316255,245758222,1365087,2822677,121247,952645,658217,747973];

    //console.log((codes.length / 2) + " puzzles loaded");
    BSP.undo = animateLastAction;
    BSP.reset = reset;

    BSP.showHome = showHome;
    BSP.showBlevel = showBlevel;
    BSP.showAlevel = showAlevel;
    BSP.showAAlevel = showAAlevel;
    BSP.showAAAlevel = showAAAlevel;
    BSP.showPuzzle = showPuzzle;
    BSP.showHelp = showHelp; 
})();
 
