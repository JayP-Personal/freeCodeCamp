let price = 3.26;
let cid = [ [ 'PENNY', 1.01 ],
[ 'NICKEL', 2.05 ],
[ 'DIME', 3.1 ],
[ 'QUARTER', 4.25 ],
[ 'ONE', 90 ],
[ 'FIVE', 55 ],
[ 'TEN', 20 ],
[ 'TWENTY', 60 ],
[ 'ONE HUNDRED', 100 ] ];



// id: [cash amount in register, quantity in register, currValue]
let currIds = {
  'penny': [cid[0][1], 0, 0.01],
  'nickel': [cid[1][1], 0, 0.05],
  'dime': [cid[2][1], 0, 0.1],
  'quarter': [cid[3][1], 0, 0.25],
  'one-dollar': [cid[4][1], 0, 1],
  'five-dollars': [cid[5][1], 0, 5],
  'ten-dollars': [cid[6][1], 0, 10],
  'twenty-dollars': [cid[7][1], 0, 20],
  'one-hundred-dollars': [cid[8][1], 0, 100]
};



const priceSpan = document.getElementById('price');

priceSpan.textContent += `$${price}`;

const currencyUnits = document.getElementsByClassName('currency-unit');

function getBeforeHyphen(str) {
  const index = str.indexOf('-');
  return index !== -1 ? str.substring(0, index) : str;
};

let registerAmountTotal = 0;

const updateRegister = () => {[...currencyUnits].forEach(
  (curr) => {
    const registerAmount = currIds[curr.id][0];
    registerAmountTotal += registerAmount;
    const currValue = parseFloat(currIds[curr.id][2]);
    currIds[curr.id][1] = (registerAmount / currValue).toFixed(0);
    curr.children[0].textContent = `In Register: ${currIds[curr.id][1]}`
  }
)
}
updateRegister();

const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
let changeDueStatus = "";

const calculateChange = () => {

  const changeText = document.getElementById('change-due');
  changeText.textContent = "";

  // id: [cash amount in register, quantity in register, currValue]
  let currIds = {
    'penny': [cid[0][1], 0, 0.01],
    'nickel': [cid[1][1], 0, 0.05],
    'dime': [cid[2][1], 0, 0.1],
    'quarter': [cid[3][1], 0, 0.25],
    'one-dollar': [cid[4][1], 0, 1],
    'five-dollars': [cid[5][1], 0, 5],
    'ten-dollars': [cid[6][1], 0, 10],
    'twenty-dollars': [cid[7][1], 0, 20],
    'one-hundred-dollars': [cid[8][1], 0, 100]
  };



  const priceSpan = document.getElementById('price');

  priceSpan.textContent += `$${price}`;

  const currencyUnits = document.getElementsByClassName('currency-unit');

  function getBeforeHyphen(str) {
    const index = str.indexOf('-');
    return index !== -1 ? str.substring(0, index) : str;
  };

  let registerAmountTotal = 0;

  const updateRegister = () => {[...currencyUnits].forEach(
    (curr) => {
      const registerAmount = currIds[curr.id][0];
      registerAmountTotal += registerAmount;
      const currValue = parseFloat(currIds[curr.id][2]);
      currIds[curr.id][1] = (registerAmount / currValue).toFixed(0);
      curr.children[0].textContent = `In Register: ${currIds[curr.id][1]}`
    }
  )
  }
  updateRegister();

  const cash = document.getElementById('cash');
  const purchaseBtn = document.getElementById('purchase-btn');
  let changeDueStatus = "";

  const changeAmount = Number(cash.value) - price;
  if (changeAmount<0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  let change = {};
  let remainingChange = changeAmount; 
  const tempCurrIds = [...Object.keys(currIds)];

  tempCurrIds.reverse();

  tempCurrIds.forEach(
    (curr) => {
      let quantityInRegister = currIds[curr][1];
      const currValue = currIds[curr][2];
      
      while (quantityInRegister > 0) {
        quantityInRegister--;
        remainingChange = (remainingChange - currValue).toFixed(2);
        remainingChange = parseFloat(remainingChange);
        change[curr] =  (change[curr] || 0) + 1;

        if (remainingChange < 0) {
          remainingChange += currValue;
          change[curr] -= 1;
          break;
        } else if (remainingChange === 0) {
          return
        }
      }
    }
  );
  
  if (remainingChange > 0) {
    changeText.textContent = "Status: INSUFFICIENT_FUNDS";
    // alert("Register does not have enough cash to make change.");

    return
  } else {
    const tempChange = [...Object.keys(change)];
    tempChange.forEach(
      (curr) => {
        if (change[curr] > 0) {
          const currElement = document.getElementById(curr);
        currElement.children[1].textContent = `Due for Change: ${change[curr]}`;
        // get index of cid
        // add key text to change due status ex. PENNY: $0.04
        let cidIndex = cid.findIndex(item => item[0] === curr.toUpperCase());
        if (curr === "one-hundred-dollars"){
          cidIndex = 8;
        } else if (curr.includes('-')) {
          cidIndex = cid.findIndex(item => item[0] === curr.split("-")[0].toUpperCase());
        }

        const cidKeyText = cid[cidIndex][0];
        function formatCurrency(amount) {
          // Round to 2 decimal places and convert to string
          let formatted = (amount).toFixed(2);
          
          // Remove trailing zeros after the decimal point
          formatted = formatted.replace(/\.?0+$/, '');
          
          return formatted;
        }
        changeDueStatus += ` ${cidKeyText}: $${formatCurrency(change[curr] * currIds[curr][2])}`;

        }
      }
    );
    changeText.textContent = "Status: ";

    changeAmount === registerAmountTotal
      ? changeText.textContent += "CLOSED"
      : changeText.textContent +="OPEN";
    
    if (changeDueStatus) {
      changeText.textContent += changeDueStatus;
    }
    
    if (price === Number(cash.value)) {
      changeText.textContent = "No change due - customer paid with exact cash";
    } 
    // else if (price < Number(cash.value)) {
    //   changeText.textContent = "Status: CLOSED"
    // };
  }
  console.log("Final #change-due value:", changeText.textContent);
};

purchaseBtn.addEventListener("click", calculateChange);