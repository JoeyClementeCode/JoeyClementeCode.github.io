document.getElementById("defaultOpen").click();

function opentab(evt, tabname, picname) {
    // Declare all variables
    var i, tabcontent, tablinks, tabpics;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-contents");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    tabpics = document.getElementsByClassName("tab-pictures");
    for (i = 0; i < tabpics.length; i++) {
      tabpics[i].style.display = "none";
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabname).style.display = "block";
    document.getElementById(picname).style.display = "block";
    evt.currentTarget.className += " active";
  }