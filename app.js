const name = document.getElementById('name');
const account = document.getElementById('account');
const dueDate = document.getElementById('due_date');
const amount = document.getElementById('amount');
const addBill = document.getElementById('addBill');
const newBillForm = document.getElementById('newBillForm');
const addNewBills = document.getElementById('addNewBills');
const showBills = document.getElementById('showBills');
const resetBillsToUnpaid = document.getElementById('resetBillsToUnpaid');
const showBillTotal = document.getElementById('showBillTotal');
const editBills = document.getElementById('editBills');
const removeBill = document.getElementById('removeBill');
const title = document.getElementById('title');
const getBillTotal = document.getElementById('getBillTotals');
const totalDiv = document.getElementById('total-div')
const showAmountPaidHeader = document.getElementById('showAmountPaidHeader')
const showleftToPayHeader = document.getElementById('showleftToPayHeader')
const showTotalHeader = document.getElementById('showTotalHeader')
const viewBills = document.getElementById('viewBills')
let totalArray = [0];
let billHeaderArray = [0];
let paidHeaderArray = [0];
let difference = [0];



//working...Finished. 
function saveBills(bills) {
    localStorage.setItem('bills', JSON.stringify(bills));
}

//Working..Finished...get bills from local Storage
function getSavedBills() {
    const billsJSON = localStorage.getItem('bills');
    if (billsJSON !== null) {
        return JSON.parse(billsJSON);
    } else {
        return [];
    }

}

const bills = getSavedBills()


// finished..button to add new bill and save to local storage
const addNewBill = () => {
    
    totalDiv.setAttribute('class', 'hide')
    totalArray = [0];
    addBill.addEventListener('click', function(){
        showBills.textContent = '';
        if(name.value == ''|| account.value == '' || dueDate.value == '' || amount.value ==''){
            alert('You must fill in all fields.');
        } else {
            bills.push({
            name: `${name.value}`,
            account: `${account.value}`,
            dueDate: `${dueDate.value}`,
            amount: `${amount.value}`,
            paid: false
        });

        name.value = '';
        account.value = '';
        dueDate.value = '';
        amount.value = '';
        saveBills(bills);
        billHeaderArray = [0]   
        getTotalsForHeader()
        }; 
        
    });
};

// Working...finished Maybe??? 
const generateBillDom = () => {
    
    totalDiv.setAttribute('class', 'hide')
    totalArray = [0];
    showBills.textContent = '';
    title.textContent = 'Monthly Bills'
    let sortedBills = bills.sort(function(a,b){
        return a.dueDate - b.dueDate;
    });

    if(sortedBills.length === 0){
        showBills.textContent = 'Click on "Add New Bill" button to get started!';
        showBills.setAttribute('class', 'displayBills');
    };
    
    sortedBills.forEach(element => {
    let a = document.createElement('a');
    let div = document.createElement('div');
    let input = document.createElement('input');

        a.setAttribute('href', `displaybill.html#${element.name}`);
        a.setAttribute('class', 'a');
        a.textContent = element.name;
        input.type = 'checkbox';
        
        
        div.appendChild(a);
        div.appendChild(input);
        div.setAttribute('class', 'displayBills');
        showBills.appendChild(div);
        
    if(element.paid == true){
        a.removeAttribute('class', 'a');
        a.setAttribute('class', 'paid');
        input.checked = true;;
        
    } ;
    
        input.addEventListener('change', function(){
            
                if(input.checked == true){
                    
                    element.paid = true;
                    a.setAttribute('class', 'paid');
                    saveBills(bills);
                    paidHeaderArray = [0];

                    getPaidTotalHeader();
                    getDifHeader();
                    
                    
                } else {
                  
                    input.checked = false;
                    element.paid = false;
                    a.removeAttribute('class', 'paid');
                    a.setAttribute('class', 'a')
                    saveBills(bills);
                    paidHeaderArray = [0];
                    
                    getPaidTotalHeader();
                    getDifHeader();
                 };
            });
    });


};

//Working...maybe Finished?...Change home page to add bill
const addBillDomChange = () => {
    
    addNewBills.addEventListener('click', function(){
        showBills.textContent = ''
        totalDiv.setAttribute('class', 'hide');
        totalArray = [0];
        title.textContent = "Add A New Bill";
        newBillForm.removeAttribute('class', 'hide');
        newBillForm.setAttribute('class', 'form');       
                
    });
};

//Working...maybe finished?....Reset Bills to unpaid
const resetBills = () => {
    resetBillsToUnpaid.addEventListener('click', function(){
      let r = confirm('Reset all bills to unpaid?')
        bills.forEach(element => {
            if(r == true){
            element.paid = false;
            saveBills(bills);
            paidHeaderArray = [0];
            getPaidTotalHeader();
            location.reload();
            }
        });
    });
    
};
//working....not finished...need to calc total of all bills
const showBillTotalDomChange = () => {
    
   showBillTotal.addEventListener('click', function(){
    totalDiv.setAttribute('class', 'hide'); 
    totalArray = [0];  
    title.textContent = 'All Bills';
    newBillForm.setAttribute('class', 'hide');
    showBills.textContent = '';
      
       bills.forEach(element => {
           
           let accountName = document.createElement('p');
           let accountTotal = document.createElement('p');
           let div = document.createElement('div');
           let spanOne = document.createElement('span')
           let spanTwo = document.createElement('span');
           spanOne.textContent = 'Account Name:';
           spanTwo.textContent = 'Bill Total: $';
           spanOne.setAttribute('class', 'span');
           spanTwo.setAttribute('class', 'span');
           div.setAttribute('class', 'total');
           accountName.textContent += `${spanOne.textContent} ${element.name}`;
           accountTotal.textContent += `${spanTwo.textContent} ${element.amount}`;
           div.appendChild(accountName);
           div.appendChild(accountTotal);
           showBills.appendChild(div);
           
        });
        
   });
};

//Not Working.......
const editBill = () => {
editBills.addEventListener('click', function(){
    title.textContent = 'Edit Bills'
    showBills.textContent = '';
    newBillForm.setAttribute('class', 'hide');

    bills.forEach(element => {
        let a = document.createElement('a');
        a.textContent = element.name;
        a.setAttribute('href', `editbills.html#${element.name}`);
        a.setAttribute('class', 'editBill')
        showBills.appendChild(a)
    })

})
    
}



//Working finished Maybe?.......
const removePaidBillListener = () => {
removeBill.addEventListener('click', function(){
    
    totalDiv.setAttribute('class', 'hide');
    title.textContent = 'Remove a Bill';
    
    showBills.textContent = 'Click the box to remove your Bill';
    newBillForm.setAttribute('class', 'hide');
    bills.forEach(element => {
        
        let p = document.createElement('p');
        let div = document.createElement('div');
        let input = document.createElement('input');
        
        p.textContent = element.name;
        input.type = 'checkbox';
        
        div.appendChild(p);
        p.appendChild(input);
        div.setAttribute('class', 'displayBills');
        showBills.appendChild(div);

        input.addEventListener('click', function(){
           
            if(input.checked == true){
               
                let i = bills.indexOf(element);
               let r = confirm('Are You Sure?\nThis Cant Be un-done.\nYou will be re-direted to the home-page')
               
            if(r == true){
                
                bills.splice(i, 1)
                saveBills(bills);
                billHeaderArray = [0];
                paidHeaderArray = [0];
                getPaidTotalHeader();
                getTotalsForHeader();
                generateBillDom();
              
            } else {
                   
                input.checked = false;
               
            }
        };
    });
});
});
};

//working not finished..... 
const getAllTotals = () => {
    
    getBillTotal.addEventListener('click', function(){
        
        totalDiv.removeAttribute('class', 'hide');
        showBills.textContent = '';
        title.textContent = 'Get Totals';
        newBillForm.setAttribute('class', 'hide');
        totalDiv.textContent = 'Check The Boxes to Calculate your Bills';
        bills.forEach(element => {
            if(element.paid == false){
            let accountName = document.createElement('p');
            let accountTotal = document.createElement('p');
            let payFrom = document.createElement('p');
            let div = document.createElement('div');
            let spanOne = document.createElement('span');
            let spanTwo = document.createElement('span');
            let input = document.createElement('input');
            payFrom.textContent = `Pay From: ${element.account}`;
            input.type = 'checkbox';
            spanOne.textContent = 'Account Name:';
            spanTwo.textContent = 'Bill Total: $';
            spanOne.setAttribute('class', 'span');
            spanTwo.setAttribute('class', 'span');
            div.setAttribute('class', 'total');
            accountName.textContent += `${spanOne.textContent} ${element.name}`;
            accountTotal.textContent += `${spanTwo.textContent} ${element.amount}`;
            
            div.appendChild(accountName);
            div.appendChild(payFrom)
            div.appendChild(accountTotal);
            div.appendChild(input);
            showBills.appendChild(div);
            
        input.addEventListener('change', function(){ 
            
            if(input.checked == true){
                    
                    let total = parseFloat(element.amount);
                    totalArray.push(total);
                    
                    let showTotal = totalArray.reduce(function(a, b){
                        return a + b;
                    });
                    
                    total = parseFloat(element.amount);
                    totalDiv.setAttribute('class', 'totalDiv');
                    totalDiv.textContent = `Total Amount: $${showTotal.toFixed(2)}`;                     
                    
            } else if (this.checked == false){
                    
                    let i = totalArray.findIndex(function(amount, index){
                        if(amount == element.amount){
                            return index;
                        };
                    });
                    
                    totalArray.splice(i, 1 );
                    
                    let showTotal = totalArray.reduce(function(a,b){
                        return a + b;
                    });
                    
                    totalDiv.setAttribute('class', 'totalDiv');
                    totalDiv.textContent = `Total Amount: $${showTotal.toFixed(2)}`;
                    
            } else {

                totalArray = [0];
                totalDiv.textContent = '';
            }
        
        });
    };
        });
    });
};

//working...hopefully finished
const getTotalsForHeader = () => {
     
    bills.forEach(function(element){
        billHeaderArray.push(parseFloat(element.amount))
        return billHeaderArray;
    });
    
    let grandTotal = billHeaderArray.reduce(function(a,b){
        return a + b
    });
    
    showTotalHeader.textContent = ` $ ${grandTotal.toFixed(2)}`;
};

//working..hopefully finished
const getPaidTotalHeader = () => {
   
    bills.forEach(function(element){
         if(element.paid == true){
            let total = parseFloat(element.amount);
            paidHeaderArray.push(total);
            
        };
        
        let paidTotal = paidHeaderArray.reduce(function(a,b){
            return a + b;
        });
        
            showAmountPaidHeader.textContent = ` $ ${paidTotal.toFixed(2)}`;
        
    });
};

const getDifHeader = () => {
    let paidArray = [0];
    let totalArrayHeader = [0];
    
    bills.forEach(function(element){
       let total = parseFloat(element.amount);
       totalArrayHeader.push(total);
       if(element.paid == true){
        totalPaid = parseFloat(element.amount);
        paidArray.push(totalPaid);
    };
});
    
    difference = totalArrayHeader.filter(x => paidArray.indexOf(x)  == -1);
    difference.push(0);
    let totalDif = difference.reduce(function(a,b){
            
        return a + b;
        
    });
    
    showleftToPayHeader.textContent = `$ ${totalDif.toFixed(2)}`;

};

const viewBillsListener = () => {
    viewBills.addEventListener('click', function(){
    newBillForm.setAttribute('class', 'hide')
    generateBillDom()
})
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Add Animations... buttons and display bills 
// connect Edit Bills Button...and remove bill button.....
// style with css...
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



generateBillDom();
addBillDomChange();
addNewBill();
resetBills();
showBillTotalDomChange();
editBill();
getAllTotals();
getTotalsForHeader();
getPaidTotalHeader();
getDifHeader()
removePaidBillListener()
viewBillsListener()
































