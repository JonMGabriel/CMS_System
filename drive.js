document.addEventListener("DOMContentLoaded", function(){
//ends at bottom
  
  //initial
  // themes[0].forEach(applyThemePair);
  // updatePosts();
  //end initial
  
  
  // http://codepen.io/AndyNovo/pen/YwOwBO?editors=1010
  // Andy's example of grabbing content from Firebase ^
  
  
  /*********************/
  /* Firebase commands */
  /*********************/
  var myDB = new Firebase("https://cisc-479-project4.firebaseio.com/");
  // console.log(myDB.child("DesignPatterns"));
  var designPatterns = "DesignPatterns"; //unused currently
  // var workingSection = "TestPosts";
  var workingSection = designPatterns;
  myDB.child(workingSection).orderByPriority();
  
  //if post title already exists in database, display message, cant add
  // To post content to our DB, it might look something like...
  var sendPost = function(ev) {
    // var existsAlready = false;
    var date = (new Date()).toISOString();
    var postTitle = document.getElementById("postTitle");
    var postContent = document.getElementById("postContent");
    
    // // console.log("outside: " + postTitle.value);
    // myDB.child(workingSection).child(postTitle.value).once("value", function(snapshot){
    //   console.log("exists");
    //   // return false;
    // }, function(error){
    //   console.log("fail triggered");
    //   // return true;
    // });
    // console.log("existsAlready: " + existsAlready);
    
    // myDB.child(workingSection).once("value", function(snapshot){
    //   console.log("inside: " + postTitle.value);
    //   existsAlready = snapshot.child(postTitle.value).exists();
    //   console.log("existsAlready: " + existsAlready);
    // });
    // setTimeout(function(){
    //   myDB.child(workingSection).once("value", function(snapshot){
    //     console.log("inside: " + postTitle.value);
    //     existsAlready = snapshot.child(postTitle.value).exists();
    //     console.log("existsAlready: " + existsAlready);
    //   });
    // }, 3000);
    
    // console.log(myDB.child(workingSection).val());//.hasOwnProperty(postTitle.value));
    // myDB.child(workingSection);
    
    // if(existsAlready)
    //   return;
    
    if(postTitle.value > ""){
      myDB.child(workingSection).child(postTitle.value).child("Content").set(postContent.value);
      myDB.child(workingSection).child(postTitle.value).child("Time_Posted").set(date);
      myDB.child(workingSection).child(postTitle.value).setPriority(date);
      //Clear sumbits
      postTitle.value = "";
      postContent.value = "";
      //Refresh lists
      resetPosts();
      myDB.once("value", populatePosts);
    }
    else
      alert("You must enter a title for your blog entry, please!");
  };
  document.getElementById("sendPost").addEventListener('click', sendPost);
  
  
  
  var resetPosts = function(){
    // console.log(document.querySelector(".otherPosts"));
    document.querySelector(".posts").innerHTML = "<h1 id = ppost>Recent Posts</h1>";
    document.querySelector(".otherPosts").innerHTML = "<ul><h2>Other Posts</h2></ul>";
  };
  
  // needs to grab last few posts from DB
  // line also needed on page loading that runs getPost and grabs the content
  // getPost also needs to run when sendPost runs, since the new page will
  // show in the previous posts section

  var populatePosts = function(snapshot, prevChildKey){
    var postsEl = document.querySelector(".posts");
    var sidePostsListEl = document.querySelector(".otherPosts").querySelector("ul");
    
    var docPostsLength = postsEl.getElementsByClassName("post").length; //is 0 always...in our implementation at least
    var docPostsMaxLength = 4; //base off of heights and container height?
    
    snapshot.child(workingSection).forEach(function(childSnapshot){
      //Populate Main Post Area
      //***********************
      if(docPostsLength < docPostsMaxLength){
        var template = document.querySelector('#postTemplate');
        var clone = document.importNode(template.content, true);
        clone.querySelector(".postTitle").innerHTML = childSnapshot.key();
        clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
        clone.querySelector("time").innerHTML = (new Date(childSnapshot.val().Time_Posted)).toTimeString();
        //**********************************
        clone.querySelector(".postTitle").addEventListener('click', addPopoutListener);
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
      a.addEventListener('click', addPopoutListener);
      //**********************************
      var li = document.createElement("li");
      li.appendChild(a);
      sidePostsListEl.appendChild(li);
    });
  };
  
  
  // var populatePosts = function(snapshot, prevChildKey){
  //   var docPostsMaxLength = 2; //base off of heights and container height?
  //   var docSidePostsMaxLength = 4;
    
  //   var postsEl = document.querySelector(".posts");
  //   var sidePostsListEl = document.querySelector(".otherPosts").querySelector("ul");
  //   var docPostsLength = postsEl.getElementsByClassName("post").length;
  //   var docSidePostsLength = sidePostsListEl.querySelectorAll("li").length;
    
  //   snapshot.child(workingSection).forEach(function(childSnapshot){
  //     if((docSidePostsLength > docSidePostsMaxLength) && (docPostsLength > docPostsMaxLength))
  //       return;
  //     if(docPostsLength <= docPostsMaxLength){ //yes, redundant code, but more space efficient this way
  //       var template = document.querySelector('#postTemplate');
  //       var clone = document.importNode(template.content, true);
  //       clone.querySelector(".postTitle").innerHTML = childSnapshot.key();
  //       clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
  //       clone.querySelector("time").innerHTML = (new Date(childSnapshot.val().Time_Posted)).toTimeString();
  //       //**********************************
  //       clone.querySelector(".postTitle").addEventListener('click', addPopoutListener);
  //       //**********************************
  //       postsEl.insertBefore(clone, postsEl.firstElementChild.nextElementSibling);
  //       docPostsLength++;
  //     }
  //     // else if(docPostsLength == docPostsMaxLength){
  //     //   //add see more...
  //     //   // console.log("docPostsLength == docPostsMaxLength");
  //     //   docPostsLength++;
  //     // }
      
  //     if(docSidePostsLength <= docSidePostsMaxLength){
  //       var a = document.createElement("a");
  //       a.setAttribute("href", "#");
  //       a.innerHTML = childSnapshot.key();
  //       //**********************************
  //       a.addEventListener('click', addPopoutListener);
  //       //**********************************
        
  //       var li = document.createElement("li");
  //       li.appendChild(a);
  //       sidePostsListEl.appendChild(li);
  //       docSidePostsLength++;
  //     }
  //     // else if(docSidePostsLength == docSidePostsMaxLength){
  //     //   //add "see more..."
  //     //   docSidePostsLength++;
  //     // }
  //   });
  // };
  
  var addPopoutListener = function(ev){
    var currentValue = ev.currentTarget;
    // var currentValue = currentTarget.qu0erySelector("a");
    // console.log(currentTarget);
    
    myDB.once("value", function(snapshot, prevChildKey) {
      var childSnapshot = snapshot.child(workingSection).child(currentValue.innerHTML);
      
      var template = document.querySelector('#postTemplate');
      var clone = document.importNode(template.content, true);
      
      //Override template title "a" to "h1"
      clone.querySelector(".postTitle").parentElement.innerHTML = "<h1 class=\".postTitle\">" + childSnapshot.key() + "</h1>";
      clone.querySelector(".postContent").innerHTML = childSnapshot.val().Content;
      clone.querySelector("time").innerHTML = (new Date(childSnapshot.val().Time_Posted)).toTimeString();
      
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
  
  var updatePosts = function(){myDB.once("value", populatePosts);};
  var initPosts = function(){
    myDB.once("value", populatePosts);
    // applyThemePair(basic_theme);
    // setTimeout(function(){
      // alert("theme change?");
    // }, 5000);
    
    // console.log(themes[0]);
    nextTheme();
    
    // applyThemePair(theme0);
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
    if(Math.random() > .5){
      document.querySelector(oppositeOrder[0][0]).toggle(oppositeOrder[0][1]);
      document.querySelector(oppositeOrder[1][0]).toggle(oppositeOrder[1][1]);
    }
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
  
  
  
  document.querySelector(".content").classList.add("sideLayout");
  initPosts();
  // nextTheme();
  // setTimeout(nextTheme, 2000)
  // myDB.on("value", populatePosts);
});