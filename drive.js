// Test to see if this ehls with adding listeners
document.addEventListener("DOMContentLoaded", function(){
//ends at bottom






// var pages = ['page1', 'page2', 'page3', 'page4'];
// var currentPageIndex = 0;
// var showNextPage = function(){
//   document.getElementById(pages[currentPageIndex]).classList.add('hidden');
//   currentPageIndex = (currentPageIndex + 1) % pages.length;
//   document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
// }

// document.body.addEventListener('click', showNextPage);


// http://codepen.io/AndyNovo/pen/YwOwBO?editors=1010
// Andy's example of grabbing content from Firebase ^

var myDB = new Firebase("https://cisc-479-project4.firebaseio.com/");
//initial state and on update of a value
myDB.on("value", function(snapshot) {
  var theData = snapshot.val();
  // document.querySelector("#blah").innerHTML = JSON.stringify(theData);
});




var updateDB = function(){
  var time = new Date();
  // myDB.child('blogPost2').set(time.toJSON());
  // document.querySelector("#blah").innerHTML = time;
};

// document.getElementById('update').addEventListener('click', updateDB);


document.querySelector("button[name='sendPost']").addEventListener("click", write_post);
    //add to firebase
    //trigger previous posts update, trigger otherposts update
/* function write_post takes content in textarea "postContent"
and submits the content to the site*/
var write_post = function() {
  alert();
  document.querySelector("input[name='postTitle']").value;
  document.querySelector("textarea[name='postContent']").innerHTML;
  myDB;
}



// Swapping between themes
/* NOTES:
  - on theme1, the sidebar doesn't move all content to shift
  - to the right (causing an overlay)
*/
  
  var theme0 = [['.sidebar', 'thick-border'], ['.post', 'thick-border'], ['.post', '.grey_back']]; // works
  var theme1 = [['.sidebar', 'column_right']];
  var theme2 = [['.post', 'rounded'], ['.post', '.grey_back']]; // this case is never met
  
  // var themes = ['theme1', 'theme2', 'theme3'];
  var themes = [theme0, theme1, theme2];
  var currentThemeIndex = -1;
  
  
  var removeThemePair = function(aPair){
  Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
    $el.classList.remove(aPair[1]);
  });
}

  var applyThemePair = function(aPair){
    Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
      $el.classList.add(aPair[1]);
  });
}
  
  var nextTheme = function(){
    var previousThemeIndex = currentThemeIndex; //-1 means none
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    if (previousThemeIndex > -1){
      themes[previousThemeIndex].forEach(removeThemePair);
    }
    themes[currentThemeIndex].forEach(applyThemePair);
}

  document.getElementById("swap_theme").addEventListener('click', nextTheme);
  
  /*
  // switches between an array of themes
  Array.prototype.forEach.call(document.getElementsByClassName("post"),
    function(currentValue){
      currentValue.style.backgroundColor = "#e6e6e6";
      //currentValue.classList.toggle("theme1");
  });
  */
  
  
});