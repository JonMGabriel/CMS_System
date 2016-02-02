var pages = ['page1', 'page2', 'page3', 'page4'];
var currentPageIndex = 0;
var showNextPage = function(){
  document.getElementById(pages[currentPageIndex]).classList.add('hidden');
  currentPageIndex = (currentPageIndex + 1) % pages.length;
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
}

document.body.addEventListener('click', showNextPage);