import { islogin,Activenav,navaAction } from "./global.js";
const id = window.location.search.split("=")[1];
const Active_links = document.querySelectorAll("a.nav-link")
Activenav(Active_links);
// console.log(id);
// elements 
const container = document.querySelector("div.container");
const mealcard = document.querySelector("div.meal-card");

// nav action 
const actions = document.querySelectorAll("li.actions"); 
const userElement = document.querySelector("li.User");   // username
navaAction(actions,userElement)



if(islogin().login === false){
    window.location.href = "./login.html";
}
const api = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

const getinfo = async ()=>{
try{
const response =  await fetch(api)
const data = await response.json();
const meal = data.meals[0]
// console.log(meal);
const ingredients = Object.keys(meal).filter((keys)=>keys.startsWith("strIngredient") && meal[keys]).map((keys)=>meal[keys]);
console.log(ingredients);
console.log(meal);

mealcard.innerHTML = `
    <div class="img">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />
        </div>
        <div class="meal-info">
          <h2 class="meal-title">${meal.strMeal}</h2>
          <h3>Instructions</h3>
           <p class="instructions"> ${meal.strInstructions.length > 250 ?  meal.strInstructions.substring(1,300) : meal.strInstructions 
}
          </p>
          <p><b>Category:</b> ${meal.strCategory}</p>
          <p><b>Area:</b> ${meal.
strArea
}</p>
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
            ${ingredients.map((ing)=> `<li>${ing}</li>`).join("")}
            </ul>
          </div>
          <a
            class="youtube-link"
            href="${meal.strYoutube}"
            target="_blank"
          >
            ▶ Watch on YouTube
          </a>
        </div>`
}catch(Error){

}
}

getinfo();
