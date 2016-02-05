document.addEventListener("DOMContentLoaded", function(){ //ends at bottom
  
  /*********************/
  /* Firebase commands */
  /*********************/
  var myDB = new Firebase("https://cisc-479-project4.firebaseio.com/");
  var designPatterns = "DesignPatterns";
  // var workingSection = "TestPosts";
  var workingSection = designPatterns;
  myDB.child(workingSection).orderByPriority();
  
  
  
  //***********************************
  //************POSTS STUFF************
  //***********************************
  
  var sendPost = function(ev) {
    var date = (new Date()).toISOString();
    var postTitle = document.getElementById("postTitle");
    var postContent = document.getElementById("postContent");
    
    //Implement if post title already exists guard
    
    if(postTitle.value > ""){
      myDB.child(workingSection).child(postTitle.value).child("Content").set(postContent.value);
      myDB.child(workingSection).child(postTitle.value).child("Time_Posted").set(date);
      myDB.child(workingSection).child(postTitle.value).setPriority(date);
      //Clear sumbits
      postTitle.value = "";
      postContent.value = "";
      //Refresh lists happen in INITIAL STATE section
    }
    else
      alert("You must enter a title for your blog entry, please!");
  };
  
  
  
  var resetPosts = function(){
    document.querySelector(".posts").innerHTML = "<h1 id = ppost>Featured Posts</h1>";
    document.querySelector(".otherPosts").innerHTML = "<h2>All Posts</h2><ul></ul>";
  };

  var populatePosts = function(snapshot){
    var postsEl = document.querySelector(".posts");
    var sidePostsListEl = document.querySelector(".otherPosts").querySelector("ul");
    
    var docPostsLength = postsEl.getElementsByClassName("post").length; //is 0 always...in our implementation at least
    var docPostsMaxLength = 3; //base off of heights and container height?
    
    snapshot.child(workingSection).forEach(function(childSnapshot){
      //Populate Main Post Area
      //***********************
      if(docPostsLength < docPostsMaxLength){
        var template = document.querySelector('#postTemplate');
        var clone = document.importNode(template.content, true);
        clone.querySelector(".postTitle").innerHTML = childSnapshot.key();
        clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
        clone.querySelector("time").innerHTML = (new Date(childSnapshot.val().Time_Posted)).toString();
        //**********************************
        clone.querySelector(".postTitle").addEventListener('click', addPopout);
        //**********************************
        postsEl.insertBefore(clone, postsEl.firstElementChild.nextElementSibling);
        docPostsLength++;
      }
      //Populate Sidebar
      //****************
      var a = document.createElement("a");
      a.setAttribute("href", "#");
      a.innerHTML = childSnapshot.key();
      //**********************************
      a.addEventListener('click', addPopout);
      //**********************************
      var li = document.createElement("li");
      li.appendChild(a);
      sidePostsListEl.appendChild(li);
    });
  };
  
  
  var addPopout = function(ev){
    var currentValue = ev.currentTarget;
    
    myDB.once("value", function(snapshot, prevChildKey) {
      var childSnapshot = snapshot.child(workingSection).child(currentValue.innerHTML);
      
      var template = document.querySelector('#postTemplate');
      var clone = document.importNode(template.content, true);
      
      //Override template title "a" to "h1" (pretty hacky)
      clone.querySelector(".postTitle").parentElement.innerHTML = "<h1 class=\".postTitle\">" + childSnapshot.key() + "</h1>";
      clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
      clone.querySelector("time").innerHTML = (new Date(childSnapshot.val().Time_Posted)).toString();
      
      clone.querySelector(".post").classList.add("popOut");
      clone.querySelector(".post").classList.add("rounded");
      
      document.body.querySelector("#poppedContainer").classList.remove("hidden");
      document.body.querySelector("#popped").appendChild(clone);
      document.body.querySelector("#realBody").classList.add("blurFilter");
    });
    
    var doOpposite = function(){
      document.body.querySelector("#poppedContainer").classList.add("hidden");
      // document.body.querySelector("#popped").innerHTML = "<img src=\"http://happy.fm/wp-content/uploads/2011/10/random-owl.jpg\">";
      document.body.querySelector("#popped").innerHTML = "";
      document.body.querySelector("#realBody").classList.remove("blurFilter");
      document.body.querySelector("#emptyDiv").removeEventListener('click', doOpposite);
    };
    document.body.querySelector("#emptyDiv").addEventListener('click', doOpposite);
  };
  
  
  
  //***********************************
  //***********THEME SWAPPER***********
  //***********************************
  var theme0 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'blue'],
                ['.sidebar', 'blue'], ['.sidebar li', 'green'], ['.sidebar li a','black_text'],
                ['.poster','pink'], ['.posts', 'yellow'],
                ['footer','pink'],
                ['#swap_layout','green'], ['#swap_theme','green'],
                ['header','yellow'],
                ['a', 'black_text'], ['.explanation','yellow']];
  
  var theme1 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'darkblue'],
                ['.sidebar', 'darkblue'], ['.sidebar li', 'orange'], ['.sidebar li a','black_text'],
                ['.poster','purple'], ['.posts', 'gold'],
                ['footer','purple'], ['h2','white_text'], ['footer', 'white_text'],
                ['#swap_layout','orange'], ['#swap_theme','orange'],
                ['header','gold'],
                ['a', 'black_text'], ['.explanation','gold']];
  
  var theme2 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'teal'],
                ['.sidebar', 'teal'], ['.sidebar li', 'orange'], ['.sidebar li a','black_text'],
                ['.poster','orange'], ['.posts', 'lightblue'],
                ['footer','lightteal'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','orange'], ['#swap_theme','orange'],
                ['header','lightblue'],
                ['a', 'black_text'], ['.explanation','lightblue'],['.explanation','white_text']];
  
  var theme3 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'bloodorange'],
                ['.sidebar', 'bloodorange'], ['.sidebar li', 'lime'], ['.sidebar li a','black_text'],
                ['.poster','lime'], ['.posts', 'coolblue'],
                ['footer','lightblue'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','lime'], ['#swap_theme','lime'],
                ['header','coolblue'],
                ['a', 'black_text'], ['.explanation','coolblue'], ['.explanation','white_text']];
                
  var basic_theme = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'coolblue'],
                ['.sidebar', 'bloodorange'], ['.sidebar li', 'lightblue'],['.sidebar li a','black_text'],
                ['.poster','lime'], ['.posts', 'coolblue'],
                ['footer','lightblue'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','lime'], ['#swap_theme','lime'],
                ['header','coolblue'],
                ['a', 'black_text']];
  
  var themes = [theme0, theme1, theme2, theme3];
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
  
  var reApplyTheme = function(){
    if(currentThemeIndex < 0) return;
    themes[currentThemeIndex].forEach(removeThemePair); //just incase, idk if we really need this line
    themes[currentThemeIndex].forEach(applyThemePair);
  };
  
  
  

  //***********************************
  //***********LAYOUT SWAPPER**********
  //***********************************
  var layouts = ["sideLayout", "downLayout"];
  var oppositeOrder = [['.mainWrapper', 'second'],
                      ['.sidebar', 'first']];
  var currentLayoutIndex = -1;
  var toSwitch = true;
  var nextLayout = function(){
    var sidebar = document.querySelector(".sidebar");
    
    //Hacky way since there's only 2 layouts
    document.querySelector(".content").classList.toggle(layouts[0]);
    document.querySelector(".content").classList.toggle(layouts[1]);
    if(Math.random() > .5){
      document.querySelector(oppositeOrder[0][0]).classList.toggle(oppositeOrder[0][1]);
      document.querySelector(oppositeOrder[1][0]).classList.toggle(oppositeOrder[1][1]);
    }
  };
  
  
  
  //***********************************
  //***********INITIAL STATE***********
  //***********************************
  myDB.once("value", function(snapshot) {
      // doTheRag(snapshot);
      myDB.on("value", doTheRag);
      myDB.once("value", nextTheme);
  });
  var doTheRag = function(snapshot){
      resetPosts();
      populatePosts(snapshot);
      reApplyTheme();
      console.log(currentThemeIndex);
      console.log("HERE BE TRIGGERS");
  };

  document.querySelector(".content").classList.add("sideLayout");
  
  //Event Listenters
  //(popOut listeners are added in populatePosts() )
  document.getElementById("sendPost").addEventListener('click', sendPost);
  document.getElementById("swap_theme").addEventListener('click', nextTheme);
  document.getElementById("swap_layout").addEventListener('click', nextLayout);
});