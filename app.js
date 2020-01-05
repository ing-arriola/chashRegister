const buttonAdd = document.getElementById('add-element')
const elementToBeAdded = document.getElementById('input-box')
const table=document.getElementById('products-table')
const productsList=document.getElementById('products-list')
const productsTotal=document.getElementById('total')

loadListeners()

function loadListeners(){
    buttonAdd.addEventListener('click',addElement)
    productsList.addEventListener('click',modifyTotal)
}

function addElement(){
    const row= document.createElement('tr')
    row.innerHTML=`
    <td> 
    <input type="text" id="${elementToBeAdded.value}-item"> ${elementToBeAdded.value} <button id="${elementToBeAdded.value}-add">+</button> <button id="${elementToBeAdded.value}-less">-</button>
    </td>
    `
    table.appendChild(row)
    addElementToLS(row)

}

function addElementToLS(row){
    let products
    products=getProductsFromLS()
    products.push(row)
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

const getTotal=()=>{
    let productsFromLS,total
    productsFromLS=getProductsFromLS
    
}

function modifyTotal(e){
    var total=0
    pressed=e.target.id
    if (pressed.search('add')) {
        total++
    }else if (pressed.search('less')) {
        total--
    }
    //number('nmero')    //String to number
    productsTotal.innerText=total
}


