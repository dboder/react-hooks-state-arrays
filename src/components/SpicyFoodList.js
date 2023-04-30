import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";
/* 
Array Cheat Sheet
Add: use the spread operator ([...])
Remove: use .filter
Update: use .map
*/
function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [selectedCusine, setCuisine] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods(foods => [...foods, newFood]); // quick way this creates a new array entirely and adds new element
    console.log(newFood);
    /* Again, to repeat!
     React will only re-render our component when we set state with a new value;
    so we need to create a new copy of our original array to pass to the setter function,
    rather than mutating the original array directly and passing a reference to the original array.
    */
  }

  function handleLiClick(id) {
    // Removing Element
    // const newFoodArray = foods.filter((food) => food.id !== id);
    // setFoods(newFoodArray);

    // Updating Element
    const newFoodArray = [...foods];
    const arrIndex = newFoodArray.findIndex((food) => food.id === id);
    newFoodArray[arrIndex].heatLevel++;
    setFoods(newFoodArray)
    console.log(newFoodArray[arrIndex]);


  }

  function filterList(event) {
    setCuisine(event.target.value);
  }
  // function blah() {
  //   if (selectedCusine === "All")
  //   {
  //     return (foods.map((food) => (
  //       <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //         {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //       </li>
  //     )));
  //   }
  //   else{
  //     return (foods.filter((food) => food.cuisine === selectedCusine).map((food) => (
  //       <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //         {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //       </li>
  //     )));
  //   }
  // }
  const foodCuisine = foods.map((food) => (
    <option key={food.id} >
      {food.cuisine}
    </option>
  ));

  // Determines the list of foods that need to be shown
  const foodsToDisplay = foods.filter((food) => {
    if (selectedCusine === "All") {
      return true;
    } else {
      return food.cuisine === selectedCusine;
    }
  });

  // Formats the list of foods that are shown
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select  name="filter" onChange={filterList}>Filter
      <option value="All">All</option>
      {foodCuisine}
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
