# CMS_System
Designing a Content Management System for Blog Posts

Project 4: CMS (Blog) about Design Patterns

So for the last project (which is actually 1.5-2 projects worth or work) 
I want to you to build a blog engine. 
You'll have to think about modular, user-created, content with at 
least two themed options to choose from.

For the content of your blog you'll pick 4 of the classic Gang of Four 
design patterns and create an article 
explaining the JavaScript version of that design pattern 
(include illuminating examples).



/* OUR GITHUB FOR COMMITS AND ISSUES */

https://github.com/JonMGabriel/CMS_System

/* --------------------------------- */



Ideas to remember moving forward:
Let's use GitHub more efficiently moving forward:
    - Routinely commiting
    - Opening issues on GitHub with problems
    - Closing issues on GitHub
Plan ahead of time and be diligent of what we're accomplishing each day
    

    
Schedule:
    - Monday: get interface(s) done / write articles for content (include illuminating examples)
        - This includes creating the two themes for users to choose from (index.html & theme.css)
            - Maybe we use abstract classes from project 3
        - Writing the articles from the list below (think of good illuminating example)
        
    - Tuesday: 
    
    
    write scripts
        - This may include swapping classes for the different design patterns (single page design)
        - our user created interfaces with user generated content (?)
        
        - Are we going to be using Firebase (?)
            - Andy linked something called localstorage
            which saves content to the browser.
                - detailed description: 
                https://www.w3.org/TR/webstorage/#dom-localstorage
                - less detailed:
                http://www.w3schools.com/html/html5_webstorage.asp
        
        Need to do:
            - JavaScript:
                - Write click listener and function for posting content
                - Write swap theme function for alternating between content
            - CSS:
                - Alter between the themes in posts
        
    - Wednesday:
        TO-DO:
            - Firebase communication
            - Finalize Themes
            - Replicated the posts from the database to our Previous Posts section
            - Present the other-posts and links section when clicked
            
        
    
    - Thursday: touch up final details, work on how we will be presenting the final product
    
    - Friday: Presentation day
    
    
    
Design patterns (4):
    - PDF of the textbook andy's referencing here:
        - http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf <!-- -->
        
        Quickly chosen design patterns for content:
        1.) Composite (pg. 183)
            - Compose objects into tree structures to represent part-whole
            hierarchies. Composite lets clients treat individual objects and
            compositions of objects uniformly. 
        2.) Flyweight (pg. 218)
            - Use sharing to support large numbers of fine-grained objects
            efficiently. 
        3.) Prototype (pg. 133)
            - Specify the kinds of objects to create using a prototypical instance,
            and create new objects by copying this prototype.
        4.) Factory (pg. 121)
            - Define an interface for creating an object, but let subclasses decide
            which class to instantiate. Factory Method lets a class defer instantiation
            
            
            
OPEN SPACE FOR DISCUSSION:
    - How are we making this project modular
    - How are we taking user input and applying it to our site
    