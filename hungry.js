const minimize = () => {
    window.location.reload();
};

const itemButton = document.getElementById("button");
itemButton.addEventListener("click", function() {
    let items = document.getElementById("findItems").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${items}`)
        .then(res => res.json())
        .then(data => showingItems(data))
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

const foodDetails = foodName => {
    const findResultDiv = document.getElementById("findResult");
    findResultDiv.style.display = "none";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`)
        .then(res => res.json())
        .then(data => itemDetails(data));
}



const itemDetails = data => {
    const food = data.meals[0];
    console.log(food);
    const lastDiv = document.getElementById("show-details");
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'itemsInfo';
    const lastItem = `
    <img src = "${food.strMealThumb}">
    <h5>${food.strMeal}</h5>
    <h5>${food.strArea} Dish</h5>
    <h5>Category: ${food.strCategory}</h5>
    Ingredient:
    <ol>
    <li>${food.strIngredient1}</li>
    <li>${food.strIngredient2}</li>
    <li>${food.strIngredient3}</li>
    <li>${food.strIngredient4}</li>
    </ol>
    <button onclick="minimize()" class="btn bg-warning">Search Another Item</button>
    `
    itemsDiv.innerHTML = lastItem;
    lastDiv.appendChild(itemsDiv);
}