let result = '';    

function getResults (textToCheck) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    textToCheck.split('').map(char => {
		let isUpperCase = char === char.toUpperCase();
		let index = alphabets.split('').indexOf(char.toLowerCase());
		if(char === " ") {
			addToResult(char);
			return;
		}
		index >= 23 ? addToResult(alphabets[index%23], isUpperCase) : addToResult(alphabets[index + 3], isUpperCase);
    });
    return 
}

function addToResult (characterToAdd, isCharacterUpperCase = false) {
	characterToAdd = isCharacterUpperCase ? (characterToAdd.toUpperCase()) : characterToAdd;
	result = result +  characterToAdd;	
}

getResults('Vrphwklqj phdqlqjixo');
console.log('Processed Text Is:', result)