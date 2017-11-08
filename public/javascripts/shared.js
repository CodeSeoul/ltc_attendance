console.log('shared js loaded');

// const userRepo = require("../../src/userRepository")

document.addEventListener("DOMContentLoaded", function() {
  let alertMsg = document.querySelector('.alert');
  let alertWrapper = document.querySelector('.alert-wrap');
  if(alertMsg) {
    setTimeout( () => {
      alertWrapper.removeChild(alertMsg);
    }, 2600);
  }
  $(".dropdown-menu").click((e) => {
  	 $("#dropdownMenuButton").html(e.target.innerHTML)
     $("#type").val(e.target.innerHTML)
  });
});
