// get items
const outputList = document.querySelector('#output');
const searchBtn = document.querySelector('#search-btn');
const inputSearch = document.querySelector('#search-input');
const searchModal = document.querySelector('.search-modal');
const closeModal = document.querySelector('#close-modal');

// API variables
const APP_ID = '5cd51adb';
const APP_KEY = '7a388552eed798a44a8ad5fd8651611c';

// new array from fetch
let recipes = [];

// add eventlistener
searchBtn.addEventListener('click', searchFood);
closeModal.addEventListener('click', closeSearch);

// function
function closeSearch(){
  searchModal.style.display = 'none';
}

function searchFood(e){
  e.preventDefault();

  if(inputSearch.value == ''){
    return
  } else {
    searchModal.style.display = 'block';

    const callFromApi = inputSearch.value;
        
    fetch(`https://api.edamam.com/search?q=${callFromApi}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      recipes = data.hits;
          
      const output = recipes
      .map(function(recipe){
        return `
          <div class="recipe-box">
            <h2 class="recipe-name">${recipe.recipe.label}</h2>
            <a href=${recipe.recipe.image} target="_blank" class="image-link"><img class="recipe-image" src=${recipe.recipe.image} alt="recime image"></a>
            <h3 class="recipe-cal">${Math.floor(recipe.recipe.calories)} kCal per Serving</h3>
            <p class="recipe-ing">${recipe.recipe.ingredientLines}</p>
          </div>`;
      }).join('') // <=== this removes the comma that seperate the arrays
      outputList.innerHTML = output;
    })
  
    inputSearch.value = '';
  }
  
}
