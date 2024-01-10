const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


let dropdowns=document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');

const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const  msg = document.querySelector('.msg');

// let fromCurr= document.querySelector('')

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(currCode==='USD'&&select.name ==='from'){
            newOption.selected='selected';
        }
        if(currCode==='INR'&&select.name ==='to'){
            newOption.selected='selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector('img');
   img.src=newsrc;
}
btn.addEventListener('click',(evt)=>{
    evt.preventDefault(); 
    updateExchange();
});
const updateExchange = async()=>{
    let amount = document.querySelector('.amount input');
    let amtval = amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(amtval); 
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    console.log(rate);

    let finalVal = rate*amtval;
    // finalVal=Math.round(finalVal);
    
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;

}
window.addEventListener('load',updateExchange);