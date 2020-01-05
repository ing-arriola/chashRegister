const buttonAdd = document.getElementById('add-element')
const elementToBeAdded = document.getElementById('input-box')
const table=document.getElementById('products-table')
const productsList=document.getElementById('products-list')
const productsTotal=document.getElementById('total')

loadListeners()

//Add listeners to the button to add elements and to the productList
function loadListeners(){
    buttonAdd.addEventListener('click',createElementObject)
    productsList.addEventListener('click',modifyTotal)
}


function createElementObject(){    
    let product={
        name:elementToBeAdded.value,
        amount:0
    }
    //Once the objet is created let's create the HTML    
    insertIntoTable(product)

}

//This function add elements to the table of products
//Each row has a input, the name of the product, and two buttons to add or substract products
function insertIntoTable(product){
    const row= document.createElement('tr')
    row.innerHTML=`
    <td id=hola> 
    <input type="text" id="${product.name}-item"> ${product.name} 
    <button id="${product.name}-add">+</button> 
    <button id="${product.name}-less">-</button>
    </td>
    `
    //Once the HTML is builded, the element is added to the DOM
    table.appendChild(row)
    // and of course ... to the Local Storage
    addElementToLS(product)
    
}

//This functions receives a product and push it on an array of objects
//The array is passed trhogh a strinify function and stores in LS
const addElementToLS = (product) =>{
    let products
    products=getProductsFromLS()
    products.push(product)
    localStorage.setItem('products',JSON.stringify(products))
}


var getProductsFromLS=()=>{
    let productsLS//Array to hold the products or an empty array
    if(localStorage.getItem('products')===null){//If the LS is empty in the products variable... then save a empty array in the coursesLS variable
        productsLS=[]
    }else{
        productsLS=JSON.parse(localStorage.getItem('products'))//Else get all the products that are in the LS
    }
    return productsLS//Retrieve data... a empty array or products, it depends of the state of LS
}

const getTotal=(products)=>{
    let suma=0
    products.forEach(element => {
        suma=suma+Number(element.amount)
    });
    return suma
    
}

//This functions increase the number of elements in one position of the array stored in LS
function increaseNumberOfElements (id) {
    let products=getProductsFromLS()    
    products.forEach((element,index) => {
        if(id.search(element.name) !== -1){
            products[index].amount++
            updateElementsOnDOM(products[index])//Call function to update number of elements in the DOM
        }
    });
    localStorage.setItem('products',JSON.stringify(products))
    return products
}

//This functions decrase the number of elements in one position of the array stored in LS
const decreaseNumberOfElements= (id) => {
    let products=getProductsFromLS()
    products.forEach((element,index) => {
        if(id.search(element.name) !== -1){
            products[index].amount--
            updateElementsOnDOM(products[index])
        }
    });
    localStorage.setItem('products',JSON.stringify(products))
    return products
}

//Function to modify the individual vaues in the DOM
const updateElementsOnDOM= (elementModified)=>{
    document.getElementById(elementModified.name+"-item").value=elementModified.amount
}


function modifyTotal(e){
    let productsFromLS, total
    pressed=e.target.id
    //First we need to know if the button preseed if for increase or decrease elements
    if (pressed.search('add') !== -1) {
        productsFromLS=increaseNumberOfElements(pressed) // if the id contains the word 'add' then the elements will be increased
    }else if (pressed.search('less') !== -1) {
        productsFromLS=decreaseNumberOfElements(pressed)// other way if the if contains the word 'less' .. then the elements will be decreased
    }

    total=getTotal(productsFromLS)
    
    productsTotal.innerText=total 
}


