var BSP = {};

(function() {
    "use strict";

    // HTML elements
    var header = null, main, footer;
    var mainHome, mainBlevel, mainAlevel, mainAAlevel, mainAAAlevel;
    var footerHome, footerLevel;

    var puzzleNumber, numberSteps;
    var container, containerW = 5, containerH = 5, solutionLength;
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
	    // footer is 40-px high
	    // subtract 20 extra pixels to fit vertically on iPhone XR!!!
	    main.style.height = (window.innerHeight - 100) + "px"
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

	    // create level screens
	    var html, parent = document.getElementById("mainBpuzzles");
	    for( var i = 1; i <= 50; i++)  // B level
            {
		html = '<img class="puzzleIcon" src="./pics/lines.png" />' +
		    '<div class="puzzleText"><span>Puzzle B' + i + '</span>' +
		    '<br /><span id="puzzleB' + 1 + 'score" ' +
		    'class="puzzleScore">? / ?</span>';
		var puzzle = document.createElement("button");
		puzzle.style.setProperty("id", 'puzzleB' + i );
		puzzle.classList.add( 'puzzleNumber' );
		puzzle.innerHTML = html;
		parent.appendChild(puzzle);
	    }
	}
	hideBlevel();
	hideAlevel();
	hideAAlevel();
	hideAAAlevel();
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
    
    BSP.showHome = showHome;
    BSP.showBlevel = showBlevel;
    BSP.showAlevel = showAlevel;
    BSP.showAAlevel = showAAlevel;
    BSP.showAAAlevel = showAAAlevel;
    BSP.showHelp = showHelp; 
})();
 
