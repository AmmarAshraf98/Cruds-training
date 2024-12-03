// global variables
// inputs
var productName = document.querySelector("#productName");
var productPrice = document.querySelector("#productPrice");
var productCategory = document.querySelector("#productCategory");
var productImage = document.querySelector("#productImage");
var productDesc = document.querySelector("#productDesc");
var searchInput = document.querySelector("#searchInput");
var data = document.querySelector("#data");

// buttons
var addBtn = document.querySelector("#addBtn");
var updateBtn = document.querySelector("#updateBtn");
// global array
var allProduct = [];
// global element || selected element
var selectedIndex;

// get data from localstorage if exist
if (localStorage.getItem("products")) {
  allProduct = JSON.parse(localStorage.getItem("products"));
  display(allProduct);
}

// save data in localstorage
function saveData() {
  localStorage.setItem("products", JSON.stringify(allProduct));
}

// update inputs valu
function updateInputsValue(ele) {
  productCategory.value = ele ? ele.category : "";
  productDesc.value = ele ? ele.desc : "";
  productName.value = ele ? ele.name : "";
  productPrice.value = ele ? ele.price : "";
  productImage.value = "";
  searchInput.value = "";
}

// add function
function addProduct() {
  // create product
  const product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    image: productImage.value,
    img2: productImage.files[0].name,
    desc: productDesc.value,
    id: Math.trunc(Math.random() * 10000),
    id2: allProduct.length + 1,
  };

  // save product in array
  allProduct.push(product);

  // display data
  display(allProduct);

  // clear inputs
  updateInputsValue();

  // save produt in localstorage
  saveData();
}

addBtn.addEventListener("click", addProduct);

// display function
function display(array) {
  var cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
            <div class="col-md-6 col-lg-4">
            <div class="card">
              <img
                src="images/${array[i].img2}"
                class="card-img-top"
                alt="product image"
              />
              <div class="card-body">
                <h2 class="card-title h4">${array[i].name}</h2>
                <h3 class="h5">${array[i].price}</h3>
                <h4 class="h5">${array[i].category}</h4>
                <p class="card-text">${array[i].desc}</p>
                <div
                  class="buttons d-flex align-items-center justify-content-between py-2"
                >
                  <button onclick="deleteProduct(${array[i].id},${i})" class="btn btn-danger text-uppercase">
                    <i class="fa-solid fa-trash"></i> delete
                  </button>
                  <button onClick="setFormToUpdate(${i},${array[i].id})" class="btn btn-warning text-uppercase">
                    <i class="fa-solid fa-pen-to-square"></i>
                    update
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
  }

  data.innerHTML = cartona;
}

// delete function
function deleteProduct(id, index) {
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].id === id) {
      // delete selected product
      allProduct.splice(i, 1);
      break;
    }
  }

  // call display method
  display(allProduct);

  // update data in localstorage
  saveData();
}

// setFormToUpdate function
function setFormToUpdate(index, id) {
  // change cmurrent index

  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].id === id) {
      selectedIndex = i; //10
    }
  }

  // array => index => show data in inputs
  //   console.log(allProduct[i]);
  // update  inputs value
  updateInputsValue(allProduct[selectedIndex]);

  // toogle buttons
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

// update function
function update() {
  //get inputs value => save in object ======= done
  // change selected product value with the new value [0,1,2] => [0,new,2]

  const product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    img2: productImage.files[0]
      ? productImage.files[0].name
      : allProduct[selectedIndex].img2,
    desc: productDesc.value,
  };

  // delete => add new product
  allProduct.splice(selectedIndex, 1, product);

  // display new data
  display(allProduct);

  // save in localstorage
  saveData();

  // clear inputs
  updateInputsValue();

  // toggle buttons
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}

updateBtn.addEventListener("click", update);

// search function
function search(trem) {
  var searchedProduct = [];
  console.log(trem);

  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name.trim().toLowerCase().includes(trem.toLowerCase())) {
      searchedProduct.push(allProduct[i]);
    }
  }

  console.log(searchedProduct, "searched");

  display(searchedProduct);
}

searchInput.addEventListener("input", function (e) {
  search(e.target.value);
});
