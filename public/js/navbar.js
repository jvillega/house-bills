function addResponsive() {
  var x=document.getElementByClassName("navbar")[0];

  if (x.className==='navbar') {
    x.className+=' responsive';
  } else {
    x.className='navbar';
  }
}

function addActiveClass() {
  var page=window.location.pathname.split('/');
  var page=page[page.length-1];
  if (page==='') {
    page='home';
  }
  document.getElementById(page).className+=' active';
}

function myFunction() {
  var x=document.getElementById('navbar');
  if (x.className==='navbar') {
    x.className+=' responsive';
  } else {
    x.className='navbar';
  }
}
