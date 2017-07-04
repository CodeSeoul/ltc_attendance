console.log('shared js loaded');

document.addEventListener("DOMContentLoaded", function() {
  let alertMsg = document.querySelector('.alert');
  let alertWrapper = document.querySelector('.alert-wrap');
  if(alertMsg) {
    setTimeout( () => {
      alertWrapper.removeChild(alertMsg);
    }, 2600);
  }
});
