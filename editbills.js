const container = document.getElementById('container');
const displayBill = document.getElementById('display_bills');
let results = location.hash.substring(1)
let string = results.replace(/%20/ig, ' ')
const name = document.getElementById('name'); 
const account = document.getElementById('account');
const dueDate = document.getElementById('due_date');
const amount = document.getElementById('amount');
const upDateEditBill = document.getElementById('updateEditBill')

container.textContent = `Edit: ${string}`

function getSavedBills() {
    const billsJSON = localStorage.getItem('bills');
    if (billsJSON !== null) {
        return JSON.parse(billsJSON);
    } else {
        return [];
    };

};

function saveBills(bills) {
    localStorage.setItem('bills', JSON.stringify(bills));
}

let bills = getSavedBills()

const generateEditBillDom = () => {
    
    bills.forEach(element => {
        if(element.name == string){
            name.value = element.name;
            account.value = element.account;
            amount.value = element.amount;
            dueDate.value = element.dueDate
        }
    })

}





const updateBill = () => {


   updateEditBill.addEventListener('click', function(e){
       bills.forEach(element => {
        if(element.name == string){
            let i = bills.indexOf(element)
                bills.splice(i, 1)
            
        }
       })
                
        bills.push({
            name: `${name.value}`,
            account: `${account.value}`,
            dueDate: `${dueDate.value}`,
            amount: `${amount.value}`,
            paid: false,
        })
         saveBills(bills)
         location.assign('index.html')
    })
}
updateBill()
generateEditBillDom()