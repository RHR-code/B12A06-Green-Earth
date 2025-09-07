let loader = document.querySelector(".loading");
let treeContainer = document.getElementById("tree-container");
let cartItems = [];

const loadData = () => {
  loader.classList.remove("hidden");
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      plants(data.plants);
      loader.classList.add("hidden");
    });

  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => loadAllCategories(data.categories));
};

const loadAllCategories = (data) => {
  let allCategories = document.getElementById("all-categories");
  data.forEach((data) => {
    allCategories.innerHTML += `
  <p id=lesson-btn-no-${data.id} onclick=loadCategoryData(${data.id}) class="category-btn py-2 pl-2.5 rounded-lg hover:bg-[#1fb857] hover:text-white transition cursor-pointer mb-2">${data.category_name}</p>
  `;
  });
};
const loadCategoryData = (id) => {
  let categoryBtn = document.getElementById(`lesson-btn-no-${id}`);
  removeBtnColor();
  categoryBtn.classList.add("bg-[#15803D]", "text-white");
  console.log(loader);

  loader.classList.remove("hidden");
  treeContainer.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      plants(data.plants);
    });
};
const removeBtnColor = () => {
  let AllCategoryBtn = document.querySelectorAll(".category-btn");
  AllCategoryBtn.forEach((btn) => {
    btn.classList.remove("bg-[#15803D]", "text-white");
  });
};

const plants = (data) => {
  data.forEach((tree) => {
    treeContainer.innerHTML += `
    <div id=${tree.id} class="p-4 bg-white shadow-xl rounded-lg flex flex-col justify-between h-[550px]">
        <div class="h-1/3">
        <img
                class="rounded-lg h-full w-full object-cover"
                src=${tree.image}
                alt=""
              />
        </div>
              
              <h4 onclick=getModal(${tree.id}) class="treeName text-lg font-semibold mt-3 cursor-pointer">${tree.name}</h4>
              <p class="my-2">
                ${tree.description}
              </p>
              <div class="flex items-center justify-between">
                <button
                  class="py-1 px-3 rounded-full bg-[#DCFCE7] border-none text-[#15803D] font-semibold"
                >
                  ${tree.category}
                </button>
                <h4 class="font-bold text-lg"><i class=" fa-solid fa-bangladeshi-taka-sign"></i><span class="treePrice">${tree.price}</span></h4>
              </div>
              <button
                class="cartBtn rounded-full text-white w-full border-none bg-[#15803D] font-semibold mt-3 text-xl py-3"
              >
                Add to Cart
              </button>
            </div>
            `;
  });

  loader.classList.add("hidden");
  let allCart = document.querySelectorAll(".cartBtn");
  allCart.forEach((cart) => {
    cart.addEventListener("click", (e) => {
      let name = e.target.parentElement.querySelector(".treeName").innerText;
      let price = e.target.parentElement.querySelector(".treePrice").innerText;
      let id = e.target.parentElement.id;

      cartItems.push({ name: name, price: price, id: id });
      addToCart();
    });
  });
};
const addToCart = (name, price) => {
  let cart = document.getElementById("cart");
  cart.innerHTML = "";
  cartItems.forEach((item) => {
    cart.innerHTML += `
      <div id=${item.id} class="bg-[#F0FDF4] rounded-lg py-2 px-2.5 my-2 relative">
                  <h5 class="font-semibold">${item.name}</h5>
                  <p>
                  <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                    ${item.price}
                    <i class="fa-solid fa-xmark text-[#8C8C8C] text-[12px]"></i> 1
                  </p>
                  <i
                    class="fa-solid fa-xmark absolute right-3 top-[50%] -translate-y-1/2 text-[#8C8C8C] text-[14px] cross"
                  ></i>
                </div>
      `;
    document.querySelectorAll(".cross").forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteCartItem(event);
      });
    });
  });
  addTotalAmount();
};

const addTotalAmount = () => {
  let total = 0;
  cartItems.forEach((item) => {
    total += Number(item.price);
  });
  let totalAmount = document.getElementById("total-amount");
  totalAmount.innerHTML = `${
    cartItems.length > 0 ? `<h4>Total:</h4> <h4>৳${total}</h4>` : ""
  }
              
              
  `;
};

const deleteCartItem = (event) => {
  event.target.parentElement.remove();
  let id = event.target.parentElement.id;
  console.log(id);
  cartItems.map((cart) => {
    if (id === cart.id) {
      let index = cartItems.indexOf(cart, 0);
      cartItems.splice(index, 1);
      addTotalAmount();
      console.log(cartItems);
    }
  });
};

const getModal = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => createModal(data.plants));
  my_modal_5.showModal();
};

const createModal = (tree) => {
  let modal = document.getElementById("my_modal_5");
  modal.innerHTML = `
  <div id=${tree.id} class="modal-box p-4 bg-white shadow-xl rounded-lg flex flex-col justify-between h-[550px]">
  <h4 onclick=getModal(${tree.id}) class="treeName text-lg font-semibold mt-3">${tree.name}</h4>
        <div class="h-[50%]">
        <img
                class="rounded-lg h-full w-full object-cover "
                src=${tree.image}
                alt=""
              />
        </div>
              <div class="flex flex-col items-start gap-2 ">
                <button
                  
                >
                  <span class="font-bold text-lg">Category:</span> ${tree.category}
                </button>
                <h4 ><span class="font-bold text-lg">Price:</span><i class=" fa-solid fa-bangladeshi-taka-sign"></i><span class="treePrice">${tree.price}</span></h4>
                <h4><span class="font-bold text-lg">Description:</span>${tree.description}</h4>
              </div>
               <div class="modal-action">
               <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
            </div>
            `;
};

loadData();
