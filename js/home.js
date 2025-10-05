
// imports
import { islogin,navaAction,logout,  } from "./global.js";

// elements
const actions = document.querySelectorAll("li.actions"); 
const userElement = document.querySelector("li.User");   // username
const reg = document.querySelector("a.reg");
const log = document.querySelector("a.log");
logout(reg,log);



navaAction(actions, userElement);
islogin();
// active nav links and their elements 
// const Active_links = document.querySelectorAll("a.nav-link")
// Activenav(Active_links);


const Api ="https://www.themealdb.com/api/json/v1/1/categories.php";
const Grid  = document.getElementById("categoriesGrid");
const getcat = async() => {
   try{
     const response = await fetch(Api);
   const data =  await response.json();
 data.categories.forEach((cat)=>{
// first you have to get cards inside index.html 
// console.log(cat);
const card = document.createElement("div")
card.classList.add("card")
card.innerHTML= `   <img
              src=${cat.
strCategoryThumb
}
              alt="Teriyaki Chicken Casserole"
            />
            <div class="card-content">
              <h3>
                <a href="meallist.html?cat=${cat.strCategory}">${cat.strCategory}</a>
              </h3>
              <p>
            ${cat.strCategoryDescription.substring(1,100)}
              </p>
            </div>`;
            Grid.appendChild(card)



    

 })

   }
 
   catch(Error){
Grid.innerHTML=`<p class="Error">${Error.message}</P>`
   }
    
}
getcat();