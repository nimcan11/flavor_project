// imports 
import { Activenav} from "./global.js";

// get elements 
const passwordInput = document.getElementById("password");
const strengthfill = document.querySelector("div.strength-fill");
const strengthtext = document.querySelector("span.strength-text");
const form = document.getElementById("signupForm");  
// Active and there elements 
const Active_links = document.querySelectorAll("a.nav-link")
Activenav(Active_links);

// password input function 
passwordInput.addEventListener("input",function(){
    const password = this.value;
   const strength= passwordinputchecker(password);
  strengthfill.style.width=`${strength.percentage}%`;
  strengthfill.className=`strength-fill ${strength.class}`
  strengthtext.textContent=strength.Text;


})
const passwordinputchecker = (password)=>{
    // console.log(password);
    let feedback= [];
    let score = 0;
    if(password.length >= 8){
       score+= 25;
       
    }else{
         feedback.push("add your password eight charters")
    }
    if(/[a-z]/.test(password)){
        score+= 25;
    }else{
        feedback.push("add your password lowercase!!")
    }
    if(/[A-Z]./.test(password)){
        score+= 25;
    }else{
        feedback.push("add your password uppercase")
    }

      if(/[0-9]/.test(password)){
        score+= 25;
    }else{
        feedback.push("add numbrs ")
    }



    if(score < 50){
        return {percentage: score, class:"weak",Text:`weak - add ${feedback.join(",")}`}
    }else if (score < 75){
                return {percentage: score, class:"medium",Text:`Good password`}
    }else{
        
         return {percentage: score, class:"strong",Text:`strong password`}
    }

}


// signup form handling 
const Lusers = localStorage.getItem("users");
const Users = JSON.parse(Lusers) || [];

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email");
  const firstname = formData.get("firstName");
  const lastname = formData.get("lastName");
  const password = formData.get("password");

  if(!firstname || !lastname || !email){
      alert("please fill required inputs!!");
      return;
  }

  const currentUser = {
      firstname,
      lastname,
      email,
      password:btoa(password)
  }

  const checkUsers = () => {
    const check = Users.filter((user) => user.email === currentUser.email);
    return check.length > 0;
  }

  if(checkUsers()){
  swal("this account is taken!", "plz crete new acount or login ", "error")
  }else{
    const btn = document.querySelector('button[type="submit"]');
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Creating account...`;

    setTimeout(()=>{
      Users.push(currentUser);
      localStorage.setItem("users", JSON.stringify(Users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    swal("Account created !", "Welcome ", "success")
      window.location.href = "index.html"
      btn.innerHTML = "Account created ";
    },2000);
  }
});






