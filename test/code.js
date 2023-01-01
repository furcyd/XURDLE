var TEST = {};

(function() {
    "use strict";

    var header = null, main, footer, body;
    var mainHome, mainScreen1, mainScreen2;
    var footerHome, footerScreen1, footerScreen2;

    function showHome()
    {
	if (! body) // when first loading the page
	{
	    body = document.getElementById("body");
	    header = document.getElementById("header");
	    main = document.getElementById("main");
	    mainHome = document.getElementById("mainHome");
	    mainScreen1 = document.getElementById("mainScreen1");
	    mainScreen2 = document.getElementById("mainScreen2");
	    footer = document.getElementById("footer");
	    footerHome = document.getElementById("footerHome");
	    footerScreen1 = document.getElementById("footerScreen1");
	    footerScreen2 = document.getElementById("footerScreen2");	    
	    body.style.width = "250px";
	    main.style.height = "300px";	    
	}
	hideScreen1();
	hideScreen2();
	mainHome.style.display = "block";
	footerHome.style.display = "block";	
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
	mainScreen1.style.display = "block";
	footerScreen1.style.display = "block";
	hideHome();
	hideScreen2();
    }

    function showScreen2()
    {
	mainScreen2.style.display = "block";
	footerScreen2.style.display = "block";
	hideHome();
	hideScreen1();
    }    

    TEST.showHome = showHome;
    TEST.showScreen1 = showScreen1;
    TEST.showScreen2 = showScreen2;        
})();
 
