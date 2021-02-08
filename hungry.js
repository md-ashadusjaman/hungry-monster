const itemButton = document.getElementById("button");
itemButton.addEventListener("click", async() => {
    let items = document.getElementById("findItems").value.trim();

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${items}`
    let res = await fetch(url);
    let data = await res.json();
    showingItems(data);
});


const showingItems = data => {
    if (data.meals) {
        data.meals.forEach(meal => {
            const findResultDiv = document.getElementById("findResult");
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-info';
            const foodInfo = `
            <img src = "${meal.strMealThumb}" onclick="foodDetails('${meal.idMeal}')";> 
            <h4 onclick="foodDetails('${meal.idMeal}')";>${meal.strMeal}</h4>
            `
            foodDiv.innerHTML = foodInfo;
            findResultDiv.appendChild(foodDiv);
        })
    } else {
        const error = document.getElementById("error-messege");
        const foodDiv = document.createElement('div');
        foodDiv.className = 'errorText';
        const foodInfo = `
            <h2> Plese type the valid item </h2>
        `
        foodDiv.innerHTML = foodInfo;
        error.appendChild(foodDiv);
    }
}

const foodDetails = async(foodName) => {
    const findResultDiv = document.getElementById("findResult");
    findResultDiv.style.display = "none";
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`
    let res = await fetch(url);
    let data = await res.json();
    itemDetails(data);
}

const itemDetails = data => {
    const food = data.meals[0];

    const lastDiv = document.getElementById("show-details");
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'itemsInfo';
    const lastItem = `
    <img src = "${food.strMealThumb}">
    <p> </p>
    <h2>${food.strMeal}</h2>
       <h5> Ingredient: </h5>
    <ol>
    <li>${food.strIngredient1}</li>
    <li>${food.strIngredient2}</li>
    <li>${food.strIngredient3}</li>
    <li>${food.strIngredient4}</li>
    <li>${food.strIngredient5}</li>
    <li>${food.strIngredient6}</li>
    <li>${food.strIngredient7}</li>
    <li>${food.strIngredient8}</li>
    <li>${food.strIngredient9}</li>
    <li>${food.strIngredient10}</li>
    </ol>
    <button onclick="minimize()" class="btn bg-warning bottom-btn">Search Another Item</button>
    `
    itemsDiv.innerHTML = lastItem;
    lastDiv.appendChild(itemsDiv);
}

const minimize = () => {
    window.location.reload();
};