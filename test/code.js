var BSP = {};

(function() {
    "use strict";

    // HTML elements
    var header = null, main, footer;
    var mainHome, mainScreen1, mainScreen2;
    var footerHome, footerScreen1, footerScreen2;

    function showHome()
    {
	if (! header) // when first loading the page
	{
	    header = document.getElementById("header");
	    main = document.getElementById("main");
	    mainHome = document.getElementById("mainHome");
	    mainScreen1 = document.getElementById("mainScreen1");
	    mainScreen2 = document.getElementById("mainScreen2");
	    footer = document.getElementById("footer");
	    footerHome = document.getElementById("footerHome");
	    footerScreen1 = document.getElementById("footerScreen1");
	    footerScreen2 = document.getElementById("footerScreen2");
	    // header is 40-px high
	    // footer is 40-px high
	    // zubtract 20 extra pixels to fit vertically on iPhone XR!!!
	    main.style.height = (window.innerHeight - 100) + "px"
	    //mainHome.style.height = "100%";	    
	    mainScreen1.style.height = "100%";
	    mainScreen2.style.height = "100%";	    	    
	}
	hideScreen1();
	hideScreen2();
	mainHome.style.height = "100%";
	mainHome.style.width = "100%";	
	footerHome.style.display = "flex";	
    }

    function hideHome()
    {
	mainHome.style.display = "none";
	footerHome.style.display = "none";		
    }

    function hideScreen1()
    {
	mainScreen1.style.display = "none";
	footerScreen1.style.display = "none";		
    }

    function hideScreen2()
    {
	mainScreen2.style.display = "none";
	footerScreen2.style.display = "none";		
    }    

    function showScreen1()
    {
	mainScreen1.style.display = "flex";
	footerScreen1.style.display = "flex";
	hideHome();
	hideScreen2();
    }

    function showScreen2()
    {
	mainScreen2.style.display = "flex";
	footerScreen2.style.display = "flex";
	hideHome();
	hideScreen1();
    }    

    function showHelp()
    {
    }
    
    BSP.showHome = showHome;
    BSP.showScreen1 = showScreen1;
    BSP.showScreen2 = showScreen2;
    BSP.showHelp = showHelp; 
})();
 
