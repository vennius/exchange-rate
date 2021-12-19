//https://v6.exchangerate-api.com/v6/75fe1a1155ffd487694cab79/latest/IDR

const inputFrom = document.querySelector('.input-from');
const inputTo = document.querySelector('.input-to');
const inputAmount = document.querySelector('.input-amount');
const output = document.querySelector('.output p');
const btn = document.querySelector('button');


const rateUrl = (curr) => 'https://v6.exchangerate-api.com/v6/75fe1a1155ffd487694cab79/latest/'+curr;

const detailUrl = (country) => `https://restcountries.com/v3.1/name/${country}`;

let exchanged = '';

btn.addEventListener('click', () => {
  main();
});


async function main(){
  await exchange(parseInt(inputAmount.value), inputFrom.value, inputTo.value);
  output.textContent = exchanged;
}

async function exchange (amount, from, to) {
  const fromDetail = await getData(detailUrl(from));
  const toDetail = await getData(detailUrl(to));
  
  const fromCurrency = Object.keys(fromDetail[0].currencies)[0];
  const toCurrency = Object.keys(toDetail[0].currencies)[0];
  
  const symbol = toDetail[0].currencies[Object.keys(toDetail[0].currencies)[0]].symbol;
  
  const rate = await getData(rateUrl(fromCurrency));
  
  //console.log(toDetail);
  //console.log(toCurrency);
  //console.log(rate);
  //console.log(Math.ceil(rate.conversion_rates[toCurrency]*amount)+' '+symbol);
  exchanged =  Math.ceil(rate.conversion_rates[toCurrency]*amount)+' '+symbol;
}

function getData(url){
  return fetch(url)
          .then(res => res.json())
          .then(data => data)
          .catch(err => err);
}
