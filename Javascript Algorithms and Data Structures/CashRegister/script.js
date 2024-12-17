let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const priceSpan = document.getElementById('price')

priceSpan.textContent += `$${price}`

const currencyUnits = document.getElementsByClassName('currency-unit')

function getBeforeHyphen(str) {
  const index = str.indexOf('-');
  return index !== -1 ? str.substring(0, index) : str;
}

const updateRegister = () => {[...currencyUnits].forEach(
  (curr) => {
    const idText = curr.id === "one-hundred-dollars"
      ? "one hundred"
      : curr.id.includes("-")
        ? getBeforeHyphen(curr.id)
        : curr.id;
    console.log(idText.toUpperCase());
    const registerAmount = cid[cid.findIndex(item => item[0] === idText.toUpperCase())][1];
    curr.children[0].textContent = `In Register: ${(registerAmount / parseFloat(curr.dataset.amount)).toFixed(0)}`
  }
)
}
updateRegister();

const calculateChange = () => {
  //const changeAmount = tender - price
  // if changeAmount < 0 then alert 
  // let remainingChange = changeAmount
  // subtract each currency from remainingChange starting with 100 until remainingChange < currency
  // subtract each unit of currency given from In Register amount
  // if in register amount ever < 0, then alert
  
}