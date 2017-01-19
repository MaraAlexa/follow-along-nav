const triggers = document.querySelectorAll('.main-links > li'); // select all the list items
const background = document.querySelector('.dropdownBackground'); // selecty the white dropdown bg
const nav = document.querySelector('#main-nav'); // select the navigation
const topOfNav = nav.offsetTop;

function fixNav() {
  if(window.scrollY >= topOfNav) {
    // nav.offsetHeight gives a number however large it is
    document.body.style.paddingTop = nav.offsetHeight + 'px'; // 2.add back the height of the nav
    document.body.classList.add('fixed-nav'); // 1.has position fixed => takes no space in DOM anymore => kind of floating, takes no height
  } else {
    document.body.style.paddingTop = 0; // 2.remove the height of the nav on body
    document.body.classList.remove('fixed-nav');

  }
}

function handleEnter() {
  this.classList.add('trigger-enter'); // this = <li>
  // after 150milisec add class trigger-enter-active
  setTimeout(() => {
    if(this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
  }, 150);

  background.classList.add('open');

  // figure out where each of the dropdown is on the page
  const dropdown = this.querySelector('.dropdown');

  // GET the COORDINATES of that dropdown(where on the page it is)
  const dropdownCoordinates = dropdown.getBoundingClientRect();
  // get the coordinates of the nav
  // in case some new elements apear above your nav ( like a banner or a h1)
  const navCoordinates = nav.getBoundingClientRect();

  // declare your coordinates for the dropdowns
  const coords = {
    height: dropdownCoordinates.height,
    width: dropdownCoordinates.width,
    top: dropdownCoordinates.top - navCoordinates.top,
    left: dropdownCoordinates.left - navCoordinates.left

  };

  // make the white bg the same size with the dropdown
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  // top and left coords: transform, translate(x,y)
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);

}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}
// for each nav link trigger listen for mouseenter
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

// listen for scrolling on window
window.addEventListener('scroll', fixNav);
