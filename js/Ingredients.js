async function getIngredients() {
  $(".inner-loading-scree").fadeIn(300);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-scree").fadeOut(300);
}

function displayIngredients(arr) {
  let cartona = ``;

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursorPointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  document.querySelector("#rowData").innerHTML = cartona;
}
getIngredients();

async function getIngredientsMeals(ingredients) {
  $(".inner-loading-scree").fadeIn(300);
  document.querySelector("#Ingredients").style.display = "none";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-scree").fadeOut(300);
}
function displayMeals(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="item-container rounded cursorPointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer rounded">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  document.querySelector("#ingredientsMeals").innerHTML = cartona;
}

/**********************************************************/
let dispalyDetOfData;
async function getApiMealDetails(id) {
  $(".inner-loading-scree").fadeIn(300);

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const finalResponse = await response.json();
  dispalyDetOfData = finalResponse;
  let mealIngredient = [
    ...new Map(Object.entries(dispalyDetOfData.meals[0])).values(),
  ]
    .slice(9, 28)
    .filter((el) => el.length > 1);
  let mealMeasure = [
    ...new Map(Object.entries(dispalyDetOfData.meals[0])).values(),
  ]
    .slice(29, 48)
    .filter((el) => el.length > 1);
  displayMealDetails(dispalyDetOfData.meals, mealIngredient, mealMeasure);
  $(".inner-loading-scree").fadeOut(300);
}
function getMealDetails(id) {
  getApiMealDetails(id);
  document.querySelector("#IngredientsMeals").style.display = "none";
  document.querySelector("#deatailsIngredientsMeals").style.display = "block";
}
function displayMealDetails(list, ingredientsList, measureList) {
  let detailsContent = ``;
  let recipeDesc = ``;

  for (let i = 0; i < ingredientsList.length; i++) {
    recipeDesc += `<p class="bg-info-subtle text-info-emphasis p-1  rounded me-3">${ingredientsList[i]} ${measureList[i]}</p>`;
  }

  detailsContent += `
      <div class="d-flex container justify-content-between mt-3">
        <h1 class="text-dark">Details Meal</h1>
        <div id="exiteBtn" class="exite cursorPointer" onclick="closeItem()">
          <i class="fa-solid fa-xmark fa-2x text-dark"></i>
        </div>
      </div>
        <div class="col-md-4 g-4">
          <div id="mealImg" class="text-dark ">
            <figure>
                <img src="${list[0].strMealThumb}" class="w-100 rounded" alt="${
    list[0].strMeal
  }">
            </figure>
            <h2  class=" fs-1 ">${list[0].strMeal}</h2>
          </div>
        </div>
        <div class="col-md-8 g-4">
          <div id="meadDesc" class="text-dark mb-5">
            <h2 class=" fs-2 ">Instructions</h2>
            <p>${list[0].strInstructions} </p>
            <div id="mealArea" class="d-flex align-items-center">
                <h2 class=" fs-2 ">Area :</h2>
                <h3 class="fs-3 pt-1 ms-2">${list[0].strArea}</h3>
            </div>
            <div id="mealCategory" class="d-flex align-items-center">
                <h2 class=" fs-2 ">Category :</h2>
                <h3 class="fs-3 pt-1 ms-2">${list[0].strCategory}</h3>
            </div>
            <div id="mealRecipes">
                <h2 class=" py-1 fs-2 ">Recipes : </h2>
                <div class="d-flex align-items-center flex-wrap "> ${recipeDesc} </div>
            </div>
            <h2 class=" fs-2 mb-2">Tags : </h2>
            <div id="mealTags" class="d-flex mt-3">
                ${
                  list[0].strTags == null
                    ? ""
                    : `<p class="bg-danger-subtle rounded text-danger-emphasis p-1 me-3">${
                        list[0].strTags.split(",")[0]
                      }</p>`
                } 
                ${
                  list[0].strTags == null
                    ? ""
                    : list[0].strTags.split(",")[1] == undefined
                    ? ""
                    : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                        list[0].strTags.split(",")[1]
                      }</p>`
                } 
                ${
                  list[0].strTags == null
                    ? ""
                    : list[0].strTags.split(",")[2] == undefined
                    ? ""
                    : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                        list[0].strTags.split(",")[2]
                      }</p>`
                } 
                ${
                  list[0].strTags == null
                    ? ""
                    : list[0].strTags.split(",")[3] == undefined
                    ? ""
                    : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                        list[0].strTags.split(",")[3]
                      }</p>`
                } 
            </div>
    
            <a href="${
              list[0].strSource
            }" target="_blank" class="btn btn-success text-white"> Source</a>
            <a href="${
              list[0].strYoutube
            }" target="_blank" class="btn btn-danger text-white ms-2"> Youtube</a>
        </div>
      </div>`;
  document.querySelector("#detIngredientsMeals").innerHTML = detailsContent;
}
function closeItem() {
  document.querySelector("#deatailsIngredientsMeals").style.display = "none";
  document.querySelector("#IngredientsMeals").style.display = "block";
}
