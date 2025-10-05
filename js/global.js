const islogin = () => {
  const User = JSON.parse(localStorage.getItem("currentUser"));
  if (User) {
    return {
      login: true,
      name: User.firstname,
      email: User.email
    };
  } else {
    return {
      login: false,
    };
  }
}

const navaAction = (actions, userElement) => {
  const loginStatus = islogin();

  if (loginStatus.login) {
    actions.forEach(el => el.style.display = "none"); 
userElement.innerHTML = `<a class="nav-link">👏 Welcome <span>${loginStatus.name}</span> 👏</a>`;

    userElement.style.display = "block";
  } else {
    actions.forEach(el => el.style.display = "block"); 
    userElement.style.display = "none";
  }
};
// logout and regester buttons 
const logout = (reg,log)=>{
    if(islogin().login=== true){
reg.style.display="none";
log.style.display="block";
log.addEventListener("click",()=>{
    localStorage.removeItem("currentUser")
    window.location.href="index.html";
})
    }else{
        log.style.display="none";
    }
}


const protectRoutes = () => {
  if (islogin().login === true) {
    if (
      window.location.pathname === "../login.html" ||
      window.location.pathname === "../signup.html"
    ) {
      window.location.href = "../index.html";
    }
  }
};
const Activenav = (links) => {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html"; // default to index

  links.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

export{islogin,logout,navaAction,Activenav}