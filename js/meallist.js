// imports 
import { Activenav ,navaAction } from "./global.js";
const Active_links = document.querySelectorAll("a.nav-link")
Activenav(Active_links);
const actions = document.querySelectorAll("li.actions"); 
const userElement = document.querySelector("li.User");   // username
navaAction(actions,userElement)

const cat = decodeURIComponent(window.location.search.split("=")[1]).trim();  /// to get the name of the food 
const title = document.querySelector("h2.section-title");
const Grid = document.getElementById("categoriesGrid");
title.textContent = `${cat} meals list `

const Api = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

const getmeals = async() => {
   try{
     const res = await fetch(Api);
   const data =  await res.json();
// console.log(data);
data.meals.forEach(meal => {
    console.log(meal);
    // create the card 
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `   <img
              src="${meal.strMealThumb}"
              alt="Boulangère Potatoes"
            />
            <div class="card-content">
              <h3>
                <a href="meal.html?id=${meal.idMeal}">${meal.strMeal} </a>
              </h3>
            </div>
    
    `;
    Grid.appendChild(card);
});
   }
 
   catch(Error){
Grid.innerHTML=`<p class="Error">${Error.message}</p>`
   }
}
getmeals();