
let orderList = null;
let orderMenu = null;

const baseURL = "http://localhost:3000/burgers";

document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here

  orderList = document.getElementById("order-list");
  orderMenu = document.getElementById("burger-menu");
  const customBurgerForm = document.getElementById("custom-burger");

  orderMenu.addEventListener("click", addBurgerToOrder);
  customBurgerForm.addEventListener("submit", addCustomBurger);

  getBurgers();
});

function addBurgerToOrder(event){
  console.log("click", event.target);
  if(event.target.className === "button"){
    console.log("button clicked");
    const burgerDiv = event.target.parentNode;
    const orderBurger = createOrderBurger(burgerDiv);
    orderList.append(orderBurger);
  }
}

function createOrderBurger(div){
  const li = document.createElement("li");
  const orderBurger = div.cloneNode(true);
  const button = orderBurger.querySelector("button");
  button.remove();
  li.append(orderBurger);
  return li;
}

function addCustomBurger(event){
  event.preventDefault();
  const burger = {
    name: event.target.name.value,
    description: event.target.description.value,
    image: event.target.url.value
  }

  fetch(baseURL,{
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(burger)
  })
  .then(res => res.json())
  .then(data => {
    const burgerDiv = createIndividualBurger(burger);
    orderMenu.append(burgerDiv);
    const orderBurger = createOrderBurger(burgerDiv);
    orderList.append(orderBurger);
  })
  .catch(err => console.log("error", err));
}

function getBurgers(){
  fetch(baseURL)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderBurgers(data);
  })
  .catch(err => console.log("error", err));
}

function renderBurgers(burgers){
  burgers.forEach(burger => {
    const burgerDiv = createIndividualBurger(burger);
    orderMenu.append(burgerDiv);
  });
}

function createIndividualBurger(burger){
  const div = document.createElement("div");
  div.className = "burger";
  div.dataset.id = burger.id;
  div.dataset.title = burger.title;
  div.dataset.description = burger.description;
  div.innerHTML = createBurgerHTML(burger);
  return div;
}

function createBurgerHTML(burger) {
  return `
    <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="burger_description">
      ${burger.description}
    </p>
    <button class="button">Add to Order</button>
  `;
}
