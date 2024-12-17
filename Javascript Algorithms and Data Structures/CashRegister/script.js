// let price = 1.87;
// let cid = [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100]
// ];

let price = 19.5;
let cid = [
  ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
];



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
}

const priceSpan = document.getElementById('price')

priceSpan.textContent += `$${price}`

const currencyUnits = document.getElementsByClassName('currency-unit')

function getBeforeHyphen(str) {
  const index = str.indexOf('-');
  return index !== -1 ? str.substring(0, index) : str;
}

const updateRegister = () => {[...currencyUnits].forEach(
  (curr) => {
    const registerAmount = currIds[curr.id][0];
    const currValue = parseFloat(currIds[curr.id][2]);
    currIds[curr.id][1] = (registerAmount / currValue).toFixed(0);
    curr.children[0].textContent = `In Register: ${currIds[curr.id][1]}`
  }
)
}
updateRegister();

const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

const calculateChange = () => {
  //const changeAmount = tender - price
  // if changeAmount < 0 then alert 
  // let remainingChange = changeAmount
  // subtract each currency from remainingChange starting with 100 until remainingChange < currency
  // subtract each unit of currency given from In Register amount
  // if in register amount ever < 0, then alert

  const changeAmount = Number(cash.value) - price;
  if (changeAmount<0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  let change = {};
  let remainingChange = changeAmount; 
  const tempCurrIds = [...Object.keys(currIds)];
  tempCurrIds.reverse().forEach(
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
  )
  console.log(change);
  // console.log(change.reduce((a,b) => a + b, 0));
  console.log(remainingChange);
  const changeText = document.getElementById('change-due');
  if (remainingChange > 0) {
    changeText.textContent = "Status: INSUFFICIENT_FUNDS";
    // alert("Register does not have enough cash to make change.");
    return
  } else {
    const tempChange = [...Object.keys(change)];
    tempChange.forEach(
      (curr) => {
        const currElement = document.getElementById(curr);
        currElement.children[1].textContent = `Due for Change: ${change[curr]}`;
      }
    )
    
    if (price === Number(cash.value)) {
      changeText.textContent = "No change due - customer paid with exact cash";
    } else {
      changeText.textContent = ` $${changeAmount}`;
    }
  }
  
}

purchaseBtn.addEventListener("click", calculateChange)