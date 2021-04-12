function createRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        console.log('no way to create XMLHttpRequest object')
      }
    }
  }

  return request;
}

function calculateImcAPI(person) {
  var request = createRequest();
  if (!request) return null;

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        renderImc(JSON.parse(this.responseText));
      }
    }
  };
  request.open('POST', 'http://localhost:8080/imc/calculate', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({
    'height': person.height,
    'weight': person.weight
  }));
}


function renderImc(person) {
  document.getElementById('imc').innerHTML = parseFloat(person.imc).toFixed(2) + ' ' + person.imcDescription;
}

function Person(height, weight) {
  if (typeof(height) !== 'number' || isNaN(height))
    throw Error('height is not a number!');

  if (typeof(weight) !== 'number' || isNaN(weight))
    throw Error('weight is not a number!');

  this.height = height;
  this.weight = weight;
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;
console.log(Dietician.prototype.constructor);

function calculateImc(dietician) {
  console.log('dietician is a person?');
  console.log(dietician instanceof Person);

  calculateImcAPI(dietician);
}

function buildCalculateImc() {
  var heightEl = document.getElementById('altura');
  var weightEl = document.getElementById('peso');

  return function(evt) {
    calculateImc(new Dietician(parseFloat(heightEl.value), parseFloat(weightEl.value)));
  }
}


window.onload = function() {
  var btn = document.querySelector('.data .form button');
  btn.addEventListener('click', buildCalculateImc());
}

// Atividade 12/07/2021
// #Daisy L. O. Salgado – RA:1905248 – #daisy.salgado@aluno.faculdadeimpacta.com.br 
//Guilherme Costa Silva – RA:2100102 – #guilherme.csilva@aluno.faculdadeimpacta.com.br 
//Kleber Eiji Yokomizo Oshita – RA:1905475 – #kleber.oshita@aluno.faculdadeimpacta.com.br 
//Ramon D. Freitas – RA:1905270 – #ramon.freitas@aluno.faculdadeimpacta.com.br
//Thiago Pereira Silveira – RA:1905339 – #	thiago.psilveira@aluno.faculdadeimpacta.com.br

// api url
const api_url = 
  "http://localhost:8080/imc/table";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>Tipos</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.list) {
        tab += `<tr> 
    <td>${0} </td>
    <td>${99}</td>
    <td>${18.5}</td> 
    <td>${24.9}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("tabelaimc").innerHTML = tab;
}

