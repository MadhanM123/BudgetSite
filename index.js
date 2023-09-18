let totalAmt = document.getElementById("total-amt");
let userAmt = document.getElementById("user-cost");
const checkAmtBtn = document.getElementById("check-amt");
const totalAmtBtn = document.getElementById("total-submit-btn");
const prodTitle = document.getElementById("prod-title");
const errMsg = document.getElementById("budget-err");
const prodTitleErr = document.getElementById("prod-title-err");
const prodCostErr = document.getElementById("prod-cost-err");
const amt = document.getElementById("amt");
const expenseVal = document.getElementById("expense-value");
const balanceAmt = document.getElementById("balance-amt");
const list = document.getElementById("list");

let tempAmt = 0;

//Budget setting
totalAmtBtn.addEventListener('click', () => {
    tempAmt = totalAmt.value;

    if(tempAmt === "" || tempAmt < 0){
        errMsg.classList.remove("hide");
    }
    else{
        errMsg.classList.add("hide");
        amt.innerHTML = tempAmt;
        balanceAmt.innerText = tempAmt - expenseVal.innerText;
        totalAmt.value = "";
    }
});

//Disables edit/delete options
const disableBtns = (bool) => {
    let editBtns = document.getElementsByClassName("edit");
    Array.from(editBtns).forEach((element) => {
        element.disabled = bool;
    });
};

//Function to modify expense list
const modifyElement = (element, edit = false) => {
    console.log("sup");
    let parent = element.parentElement;
    let currBalance = balanceAmt.innerText;
    let currExp = expenseVal.innerText;
    let parentAmt = parent.querySelector(".amt").innerText;

    if(edit){
        let parentTxt = parent.querySelector(".product").innerText;
        prodTitle.value = parentTxt;
        userAmt.value = parentAmt;
        disableBtns(true);
    }
    balanceAmt.innerText = parseInt(currBalance) + parseInt(parentAmt);
    expenseVal.innerText = parseInt(currExp) - parseInt(parentAmt);
    parent.remove();
}

const listCreator = (expenseName, expenseVal) => {
    let listContent = document.createElement("div");
    listContent.classList.add("sublist-content", "flex-space");
    list.appendChild(listContent);
    listContent.innerHTML = `<p class = "product">${expenseName}</p><p class = "amount">${expenseVal}</p>`;

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.style.fontSize = "1.2em";
    editBtn.addEventListener("click", () => {
        modifyElement(editBtn, true);
    });
    
    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.style.fontSize = "1.2em";
    delBtn.addEventListener("click", () => {
        modifyElement(delBtn, true);
    });

    listContent.appendChild(editBtn);
    listContent.appendChild(delBtn);

    document.getElementById("list").appendChild(listContent);
}

//Expense adder
checkAmtBtn.addEventListener("click", () => {
    //empty errors
    if(!prodTitle.value || !userAmt.value){
        prodTitle.classList.remove("hide");
        return false;
    }

    disableBtns(false);

    let expense = parseInt(userAmt.value);
    let expTotal = expense + parseInt(expenseVal.innerText);
    expenseVal.innerText = expTotal;

    const totalBal = tempAmt - expTotal;
    balanceAmt.innerText = totalBal;

    listCreator(prodTitle.value, userAmt.value);

    prodTitle.value = "";
    userAmt.value = "";
})


