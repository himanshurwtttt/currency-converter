const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown = document.querySelectorAll('.dropdowns select');
const btn = document.querySelector('.btn');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

for (let select of dropdown) {

    for (code in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);

        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected"

        }

    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    })

}

const updateFlag = (elem) => {
    let currcode = elem.value;
    let countrycode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = elem.parentElement.querySelector('img');
    img.src = newsrc;
}

btn.addEventListener('click',  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
})

const updateExchangeRate = async()=>{
    let amount = document.querySelector('.amount input')
    let amountval = amount.value
    if (amountval === "" || amountval < 1) {
        amountval = 1,
            amount.value = '1'
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    const response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amountval * rate;
    console.log(finalAmount);

    msg.innerText = `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

window.addEventListener('load' , ()=>{
    updateExchangeRate()
})