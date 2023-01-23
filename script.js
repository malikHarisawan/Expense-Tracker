const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];
let localStorageTransaction =JSON.parse( localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions')!== null? localStorageTransaction:[];

function addTransaction(e){
    e.preventDefault();
    if (text.value == '' & amount.value == ''){
        alert("please add text and amount")
    }
    else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues();
        updatelocalStorage()

        text.value = ''
        amount.value= ''
    }
  
}


function addTransactionDOM(trans){

    
    let sign = trans.amount < 0 ? '-' : '+';
    let item = document.createElement('li');
    item.classList.add(trans.amount<0?'minus': 'plus');
    item.innerHTML = `${trans.text} <span>${sign} ${Math.abs(trans.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${trans.id})">x</button>`

    list.appendChild(item);
}

function updateValues(){
    const amount = transactions.map(item => item.amount);
    const total = amount.reduce((sum , num)=>(sum+=num),0).toFixed(2)
    const income = amount.filter(item => item>0).reduce((sum , num)=>(sum+=num),0).toFixed(2);
    const expense =  amount.filter(item => item<0).reduce((sum , num)=>(sum+=num),0).toFixed(2);
    

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;
}

function init(){
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM)
    updateValues()
}
function updatelocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}
init();


function generateID(){
    return Math.floor(Math.random()*100);
}

form.addEventListener("submit",addTransaction)

function removeItem(id){
    transactions = transactions.filter(trans => trans.id !== id);
    init()
    updatelocalStorage()
}