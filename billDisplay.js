const container = document.getElementById('container');
const displayBill = document.getElementById('displayBill');
let string = location.hash.substring(1);
let result = string.replace(/%20/ig, ' ');




function getSavedBills() {
    const billsJSON = localStorage.getItem('bills');
    if (billsJSON !== null) {
        return JSON.parse(billsJSON);
    } else {
        return [];
    };

};

const bill = getSavedBills();


const generateViewBillDom = function(){
    container.textContent = result
    bill.forEach(element => {
        if(element.name == result){
            let amountEditEl = document.createElement('p')
            amountEditEl.textContent = `Amount: $${element.amount}`
            let nameEditEl = document.createElement('p');
            nameEditEl.textContent = `Bill Name: ${element.name}`;
            let accountEditEl = document.createElement('p');
            accountEditEl.textContent = `Pay from account: ${element.account}`;
            let dueDateEditEl = document.createElement('p');
            dueDateEditEl.textContent = `Due on the: ${element.dueDate}`;
            let paidEditEl = document.createElement('p');
            let btn = document.createElement('button');
            btn.textContent = 'Back to Home';
            btn.setAttribute('class', 'total')
            btn.addEventListener('click', function(){
                location.assign('index.html');
            });
            if(element.paid == true){
                 msg = 'PAID!';
            } else {
                 msg = 'NOT PAID!';
            }
            paidEditEl.textContent = `Paid: ${msg}`;
            let divEdit = document.createElement('div');
            divEdit.appendChild(nameEditEl);
            divEdit.appendChild(amountEditEl)
            divEdit.appendChild(accountEditEl);
            divEdit.appendChild(dueDateEditEl);
            divEdit.appendChild(paidEditEl);
            displayBill.appendChild(divEdit);
            displayBill.appendChild(btn);
        };
    });
};




generateViewBillDom()



