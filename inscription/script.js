var pass1 = document.getElementById('passwordInput');
var pass2 = document.getElementById('passwordInput2');
var wrong = document.getElementById('wrong');
var submit = document.getElementById('submit');

function verifPassword(ele1,ele2){
    var str1 = pass1.value;
    var str2 = pass2.value;
    if(str1 === str2){
      return true;
    }else {
      return false;
    }
}

function verifListener(){
  if(!verifPassword(pass1,pass2)){
      wrong.style.display = "inline";
      wrong.style.opacity = 1;
      submit.disabled = true;
      console.log("verifier not ok "+verifPassword(pass1,pass2));
  }else{
      wrong.style.opacity = 0;
      submit.disabled = false;
      console.log("verif ok"+verifPassword(pass1,pass2))
  }
}

pass2.addEventListener("keyup", verifListener);
