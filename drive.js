document.addEventListener("DOMContentLoaded", function(){
//ends at bottom
  
  //initial
  document.querySelector(".content").classList.add("sideLayout");
  // themes[0].forEach(applyThemePair);
  //end initial
  
  
  // http://codepen.io/AndyNovo/pen/YwOwBO?editors=1010
  // Andy's example of grabbing content from Firebase ^
  
  var myDB = new Firebase("https://cisc-479-project4.firebaseio.com/");
  //initial state and on update of a value
  myDB.on("value", function(snapshot) {
    var theData = snapshot.val();
    // document.querySelector("#blah").innerHTML = JSON.stringify(theData);
  });
  
  /* Firebase commands */
  
  // To post content to our DB, it might look something like...
  var sendPost = function() { 
    var title = document.getElementById('postTitle').val;
    var content = document.getElementById('postContent').val;
    myDB.set('Title' + title + 'Content' + content); //the stuff in set needs to be changed (maybe to an object?) so it's more similar to json, i think
  };
  
  document.getElementById('submit').addEventListener('click', sendPost);
  
  
  // needs to grab last few posts from DB
  // line also needed on page loading that runs getPost and grabs the content
  // getPost also needs to run when sendPost runs, since the new page will
  // show in the previous posts section
  
  var getPosts =function(){
    var pagePostsArray = document.getElementById("postSection").getElementsByTagName("post");
    //start i at div.queryselectorall(...).length
    //for(i < (sidebar posts length || db.posts.length))
        //postTitle = pagePostsArray[i].queryselector(class="'")
        //
    //for(posts length || db.posts.length)
    

// Retrieve new posts as they are added to our database
    myDB.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log("Content: " + newPost.Content);
      console.log("Date Posted: " + newPost.Date_Posted);
      console.log("Previous Post ID: " + prevChildKey);
      }
    );
  }
  var insertPost = function(xxx){}
  
  
  var updateDB = function(){
    var time = new Date();
    // myDB.child('blogPost2').set(time.toJSON());
    // document.querySelector("#blah").innerHTML = time;
  };
  
  document.getElementById('update').addEventListener('click', updateDB);
  
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
  };



  // Swapping between themes
  /* NOTES:
   -
  */
  
  var theme0 = [['.post', 'grey'],
  , ['.mainWrapper', 'blue'], ['.sidebar', 'blue'], 
  ['.sidebar li', 'green'], ['.poster','pink'], ['.posts', 'yellow']
  , ['footer','pink'], ['#swap_layout','green'], ['#swap_theme','green']]; // works
  var theme1 = [['.post', 'grey'],
  , ['.mainWrapper', 'darkblue'], ['.sidebar', 'darkblue'], 
  ['.sidebar li', 'orange'], ['.poster','purple'], ['.posts', 'gold']
  , ['footer','purple'], ['h2','white_text'], ['footer', 'white_text'],
  ['#swap_layout','orange'], ['#swap_theme','orange']];
  var theme2 = [['.post', 'grey'],
  , ['.mainWrapper', 'teal'], ['.sidebar', 'teal'], 
  ['.sidebar li', 'orange'], ['.poster','orange'], ['.posts', 'lightblue']
  , ['footer','lightteal'], ['h2','white_text'], ['footer', 'white_text'], 
  ['#ppost', 'white_text'], ['#swap_layout','orange'], ['#swap_theme','orange']];
  
  // var themes = ['theme1', 'theme2', 'theme3'];
  var themes = [theme0, theme1, theme2];
  var currentThemeIndex = -1;
  
  var removeThemePair = function(aPair){
    Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
      $el.classList.remove(aPair[1]);
    });
  };

  var applyThemePair = function(aPair){
    Array.prototype.forEach.call(document.querySelectorAll(aPair[0]), function($el){
      $el.classList.add(aPair[1]);
    });
  };
  
  var nextTheme = function(){
    var previousThemeIndex = currentThemeIndex; //-1 means none
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    if (previousThemeIndex > -1){
      themes[previousThemeIndex].forEach(removeThemePair);
    }
    themes[currentThemeIndex].forEach(applyThemePair);
  };

  document.getElementById("swap_theme").addEventListener('click', nextTheme);
  
  
  var layouts = ["sideLayout", "downLayout"];
  var oppositeOrder = [['.mainWrapper', 'second'],
                      ['.sidebar', 'first']];
  var currentLayoutIndex = -1;
  var toSwitch = true;
  var nextLayout = function(){
    var sidebar = document.querySelector(".sidebar");
    // if(sidebar.classList.indexOf(first))
    //   sidebar.classList.toggle("first");
    
    //Hacky way since there's only 2 layouts
    document.querySelector(".content").classList.toggle(layouts[0]);
    document.querySelector(".content").classList.toggle(layouts[1]);
  };
  document.getElementById("swap_layout").addEventListener('click', nextLayout);
  
  
  
  
  
  /*
  // switches between an array of themes
  Array.prototype.forEach.call(document.getElementsByClassName("post"),
    function(currentValue){
      currentValue.style.backgroundColor = "#e6e6e6";
      //currentValue.classList.toggle("theme1");
  });
  */
  
  
});