const buttonIn = document.querySelector('.in'),
	buttonMix = document.querySelector('.mix'),
	btnUpdate = document.querySelector('.sum-update'),
	buttonCalc = document.querySelector('.btn-calc'),
	moneyIn = document.querySelector('.money__in'),
	moneyResult = document.querySelector('.result'),
	playlistTable = document.querySelector("#playlist");


const createDiv = (elem, elemClass) => {
	elem = document.createElement('div');
	elem.classList.add(elemClass);
	return elem;
}
const createInput = (elem, type, minValue, maxValue) => {
	elem = document.createElement('input');
	elem.setAttribute('type', type);
	elem.setAttribute('min', minValue);
	elem.setAttribute('max', maxValue);
	return elem;
}
const createButton = (elem, text, attrVal) => {
	elem = document.createElement("button");
	let textElem = document.createTextNode(text);
	let attr = document.createAttribute('onclick');
	attr.value = attrVal;
	elem.appendChild(textElem);
	elem.setAttributeNode(attr);
	return elem;
}





const addNewPlayer = () => {

	let player = createDiv(this, 'player'),
		namecell = createDiv(this, 'name'),
		name = createInput(this, 'text'),
		buyincell = createDiv(this, 'buyin-check'),
		buyin = createInput(this, 'number', 0, 5),
		rebuycell = createDiv(this, 'rebuy-count'),	
		rebuy = createInput(this, 'number', 0, 30),
		buttoncell = createDiv(this, 'd-butts'),
		buttonHide = createButton(this, 'out', 'hideRow(this);'),
		buttonDel = createDiv(this, 'delete'),       
		buttonDelete = createButton(this, 'x', 'deleteRow(this);');
	
	let itemsAll = [namecell, buyincell, rebuycell, buttoncell, buttonDel];
	itemsAll.forEach(el => player.appendChild(el)); 

	namecell.appendChild(name);	
	buyincell.appendChild(buyin);	
	rebuycell.appendChild(rebuy);
	buttoncell.appendChild(buttonHide);
	buttonDel.appendChild(buttonDelete)

	playlistTable.appendChild(player);
}

const deleteRow = row => {
    var rowToDelete = row.parentNode.parentNode;
	rowToDelete.remove();
}

const hideRow = row => {
	let rowTableToHide = row.parentNode.parentNode;
	rowTableToHide.style.display = 'none';
}

const sumArr = arr => {
	let x = 0;
	for( let i = 0; i < arr.length; i++ ) {
		x += +arr[i];
	}
	return x;
}


const mixPlayers = () => {

    let rowsWithPlayers = [].slice.call(document.querySelectorAll('.player')),
		createRow = document.createElement("div");
	createRow.className = 'player';
	

    for (let i = 0; i < rowsWithPlayers.length; i++){

        let rand = Math.floor(Math.random() * rowsWithPlayers.length);
        rowsWithPlayers[i].parentNode.replaceChild(createRow, rowsWithPlayers[i]);
        i != rand && rowsWithPlayers[rand].parentNode.replaceChild(rowsWithPlayers[i], rowsWithPlayers[rand]);
        createRow.parentNode.replaceChild(rowsWithPlayers[rand], createRow);
		
    }



	console.log(rowsWithPlayers);
}
const callMixPlayers = () => {
	let timerId = setInterval(() => mixPlayers(), 200);

	let allTimeMix = Math.floor((Math.random() * 10000)/2);

	setTimeout(() => { clearInterval(timerId); }, allTimeMix);

	console.log(allTimeMix);
}


const money = () => {

	const inputs = playlistTable.querySelectorAll('input[type="number"]'),
		buySum = document.querySelector('.sum');
	let numbers = [];
	
	for( let i = 0; i < inputs.length; i++ ){
		numbers.push( inputs[i].value );
		inputs[i].addEventListener('input', function(){
			numbers[i] = this.value; 
		});
	}
	buySum.value = sumArr(numbers);

	localStorage.setItem('сумма всех взносов', JSON.stringify(buySum.value));

}

const resultMoney = data => {
	let sumNum = localStorage.getItem(data);
	sumNum = parseInt(JSON.parse(sumNum));
	let money = parseInt(moneyIn.value);
	console.log( sumNum * money );
	moneyResult.innerHTML = sumNum * money;
}


buttonIn.addEventListener('click', addNewPlayer);
buttonMix.addEventListener('click', callMixPlayers);
btnUpdate.addEventListener('click',	money);
buttonCalc.addEventListener('click', function(){
	resultMoney('сумма всех взносов');
});

// function delall() {
//     var table = document.getElementById('playlist');

//     for (var i=table.rows.length-1;i>0;i--){
//         table.deleteRow(i);
//     }
// }