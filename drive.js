document.addEventListener("DOMContentLoaded", function(){
//ends at bottom
  
  //initial
  document.querySelector(".content").classList.add("sideLayout");
  // themes[0].forEach(applyThemePair);
  // updatePosts();
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
  
  //if post title already exists in database, display message, cant add
  // To post content to our DB, it might look something like...
  var sendPost = function() { 
    var title = document.getElementById('postTitle').val;
    var content = document.getElementById('postContent').val;
    myDB.set('Title' + title + 'Content' + content); //the stuff in set needs to be changed (maybe to an object?) so it's more similar to json, i think
  };
  // document.getElementById('submit').addEventListener('click', sendPost);
  
  
  
  // needs to grab last few posts from DB
  // line also needed on page loading that runs getPost and grabs the content
  // getPost also needs to run when sendPost runs, since the new page will
  // show in the previous posts section
  
  
  
  var populatePosts = function(snapshot, prevChildKey){
    var docPostsMaxLength = 2; //base off of heights and container height?
    var docSidePostsMaxLength = 4;
    
    var postsEl = document.querySelector(".posts");
    var sidePostsListEl = document.querySelector(".otherPosts").querySelector("ul");
    var docPostsLength = postsEl.getElementsByClassName("post").length;
    var docSidePostsLength = sidePostsListEl.querySelectorAll("li").length;
    
    snapshot.child("DesignPatterns").forEach(function(childSnapshot){
      var template;
      var clone;
      if(docPostsLength < docPostsMaxLength){ //yes, redundant code, but more space efficient this way
        template = document.querySelector('#postTemplate');
        clone = document.importNode(template.content, true);
        clone.querySelector(".postTitle").innerHTML = childSnapshot.key();
        clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
        clone.querySelector("time").innerHTML = childSnapshot.val().Time_Posted;
        postsEl.appendChild(clone);
        docPostsLength++;
      }
      else if(docPostsLength == docPostsMaxLength){
        //add see more...
        console.log("docPostsLength == docPostsMaxLength");
        docPostsLength++;
      }
      if(docSidePostsLength < docSidePostsMaxLength){
        //think about click listener here. how to add popOut class if clicked?
        var li = document.createElement("li");
        li.innerHTML = "<a href='#'>" + childSnapshot.key() + "</a>";
        sidePostsListEl.appendChild(li);
        docSidePostsLength++;
      }
      else if(docSidePostsLength == docSidePostsMaxLength){
        //add "see more..."
        docSidePostsLength++;
      }
      
      if((docSidePostsLength > docSidePostsMaxLength) && (docPostsLength > docPostsMaxLength))
        return true;
    });
  };
  
  var updatePosts = function(){
    myDB.once("value", populatePosts);
    // myDB.once("child_added", populatePosts);
  };
  var initPosts = function(){
    myDB.once("value", populatePosts);
    nextTheme();
    //if(posts no lenght) innerhtml = "no posts to show..."
  };
  
  //add listener to run updatePosts
      //when something is added, appendChild from template
          //only if length is < max length
  //on page load
      //populate posts and otherPosts
          //forEach child in snapshot->Posts
          //if < max length
              //appendChild
    

// Retrieve new posts as they are added to our database
  // myDB.on("child_added", function(snapshot, prevChildKey) {
  //   var newPost = snapshot.val();
  //   console.log("Content: " + newPost.Content);
  //   console.log("Date Posted: " + newPost.Date_Posted);
  //   console.log("Previous Post ID: " + prevChildKey);
  //   }
  // );
  // var insertPost = function(xxx){};
  // var getPost = function(x){};
  
  // var updateDB = function(){
  //   var time = new Date();
    // myDB.child('blogPost2').set(time.toJSON());
    // document.querySelector("#blah").innerHTML = time;
  // };
  // document.getElementById('update').addEventListener('click', updateDB);
  
  
  // document.querySelector("button[name='sendPost']").addEventListener("click", write_post);
      //add to firebase
      //trigger previous posts update, trigger otherposts update
  /* function write_post takes content in textarea "postContent"
  and submits the content to the site*/
  // var write_post = function() {
  //   alert();
  //   document.querySelector("input[name='postTitle']").value;
  //   document.querySelector("textarea[name='postContent']").innerHTML;
  //   myDB;
  // };



  // Swapping between themes
  /* NOTES:
   -
  */
  
  var theme0 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'blue'],
                ['.sidebar', 'blue'], ['.sidebar li', 'green'], ['.sidebar li a','black_text'],
                ['.poster','pink'], ['.posts', 'yellow'],
                ['footer','pink'],
                ['#swap_layout','green'], ['#swap_theme','green'],
                ['header','yellow']];
  
  var theme1 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'darkblue'],
                ['.sidebar', 'darkblue'], ['.sidebar li', 'orange'],
                ['.poster','purple'], ['.posts', 'gold'],
                ['footer','purple'], ['h2','white_text'], ['footer', 'white_text'],
                ['#swap_layout','orange'], ['#swap_theme','orange'],
                ['header','gold'], ['.sidebar li a','black_text']];
  
  var theme2 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'teal'],
                ['.sidebar', 'teal'], ['.sidebar li', 'orange'],
                ['.poster','orange'], ['.posts', 'lightblue'],
                ['footer','lightteal'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','orange'], ['#swap_theme','orange'],
                ['header','lightblue'], ['.sidebar li a','black_text']];
  
  var theme3 = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'bloodorange'],
                ['.sidebar', 'bloodorange'], ['.sidebar li', 'lime'],
                ['.poster','lime'], ['.posts', 'coolblue'],
                ['footer','lightblue'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','lime'], ['#swap_theme','lime'],
                ['header','coolblue'], ['.sidebar li a','black_text']];
                
  var basic_theme = [['.post', 'grey'], ['.post', 'rounded'],
                ['.mainWrapper', 'coolblue'],
                ['.sidebar', 'bloodorange'], ['.sidebar li', 'lightblue'],
                ['.poster','lime'], ['.posts', 'coolblue'],
                ['footer','lightblue'], ['h2','white_text'], ['footer', 'white_text'], 
                ['#ppost', 'white_text'], ['#swap_layout','lime'], ['#swap_theme','lime'],
                ['header','coolblue'], ['.sidebar li a','black_text']];
  
  // var themes = ['theme1', 'theme2', 'theme3'];
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
  
  
  
  initPosts();
  // setTimeout(nextTheme, 300)
  // myDB.on("value", populatePosts);
});