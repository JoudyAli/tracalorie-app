class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  _displayCaloriesTotal() {
    document.getElementById('calories-total').innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    document.getElementById('calories-limit').innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    document.getElementById('calories-consumed').innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    document.getElementById('calories-burned').innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.classList.add('bg-danger');
      progressEl.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
    } else {
      caloriesRemainingEl.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');

    const percentage = (this._totalCalories / this._calorieLimit) * 100;

    progressEl.style.width = `${Math.min(percentage, 100)}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);
const lunch = new Meal('Lunch', 200);
tracker.addMeal(lunch);

const run = new Workout('Morning Run', 350);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);
