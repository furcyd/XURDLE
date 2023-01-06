var BSP = {};

(function() {
    "use strict";

    // HTML elements
    var header = null, main, footer;
    var mainHome, mainBlevel, mainAlevel, mainAAlevel, mainAAAlevel;
    var footerHome, footerLevel;

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
	    // zubtract 20 extra pixels to fit vertically on iPhone XR!!!
	    main.style.height = (window.innerHeight - 100) + "px"
	    mainHome.style.height = "100%";
	    mainHome.style.width = "100%";		    
	    mainBlevel.style.height = "100%";
	    mainBlevel.style.width = "100%";	    
	    mainAlevel.style.height = "100%";
	    mainAlevel.style.width = "100%";	    
	    mainAAlevel.style.height = "100%";
	    mainAAlevel.style.width = "100%";	    
	    mainAAAlevel.style.height = "100%";
	    mainAAAlevel.style.width = "100%";	    
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
 
