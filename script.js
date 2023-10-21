let sim = ['*','/','-','+','.'];
let input = '';
let story = [];
let longStory = '';
let $input = document.querySelector('.input');
let $story = document.querySelector('.story');
$input.onkeyup = function(e){
	console.log(e)
	if(e.key == 'Enter')
		ev('=');
}

$input.oninput = function(e){
	ev(e.inputType == "deleteContentBackward" ? '<' : e.data);
	return false;
};

[...document.querySelectorAll('button')].forEach(function(el) {
	el.onclick = ev;
})

function ev(data) {
	let value = typeof data == 'string' ? data : this.attributes['inTo'].value;

	if(value == 'C'){
		if(!input && $input.value)
			input = $input.value;

		if(input)
			return $input.value = longStory = input = '';

		$story.innerHTML = '';
		return false;
	}

	if(value == '='){
		if(input != $input.value)
			input = $input.value;
		
		input = sim.includes(input[input.length-1]) ? input.slice(0, -1) : input;
		input = sim.includes(input[input.length-1]) ? input.slice(0, -1) : input;

		let string = longStory ? `(${longStory.split('=')[0]})${input.replace(longStory.split('=')[1], '')}` : input;
		let result = strToMath(string);
		
		longStory = `${string}=${result}`;
		story.push(`${input}=${result}`);
		$story.innerHTML += `<i>${story[story.length-1]}</i>`;
		input = $input.value = result;

		return false;
	}

	if(value == '<'){
		input = $input.value = input.slice(0, -1);
		return false;
	}

	if(story.length && value == '.' || !input && value == '.'){
		value = '0.';
	}

	if(sim.includes(input[input.length-1]) && sim.includes(value)){
		if(value != '-' && sim.includes(input[input.length-1]))
			input = input.slice(0, -1);
		if(value == '-' && input[input.length-1] == '-' || value == '-' && input[input.length-1] == '+')
			input = input.slice(0, -1);
		if(value != '-' && sim.includes(input[input.length-1]))
			input = input.slice(0, -1);
	}

	if(input == '' && sim.includes(value) && value != '-'){
		value = '';
	}

	if(story.length && !sim.includes(value)){
		input = '';
		longStory = '';
	}

	story = [];

	input += value;
	$input.value = input;
}








function strToMath(str) {
    // Заменяем операторы на соответствующие математические выражения
    str = str.replace(/(\d+)\+\+_/g, "($1 + 1)");
    str = str.replace(/_\+\+(\d+)/g, "(1 + $1)");
    str = str.replace(/(_--)(\d+)/g, "(-1 + $2)");
    str = str.replace(/(\d+)(--_)/g, "($1 - 1)");
  
    // Вычисляем результат
    let result = eval(str);
    return result;
}
/*
function strToMath(str) {
    // Заменяем операторы на соответствующие математические выражения
    str = str.replace(/(\d+)\+\+_/g, "($1 + 1)");
    str = str.replace(/_\+\+(\d+)/g, "(1 + $1)");
    str = str.replace(/(--_)(\d+)/g, "(-1 + $2)");
    str = str.replace(/(\d+)(--_)/g, "($1 - 1)");
  
    // Вычисляем результат
    let result = eval(str);
    return result;
}
*/


/*
function strToMath(string) {
let modifiedString = string;

// Обработка префиксных и постфиксных инкрементов/декрементов
modifiedString = modifiedString.replace(/(_--)(\d+)/g, function(match, decrement, number) {
return parseInt(number) - 1;
});

modifiedString = modifiedString.replace(/(_\+\+)(\d+)/g, function(match, increment, number) {
return parseInt(number) + 1;
});

modifiedString = modifiedString.replace(/(--_)(\d+)/g, function(match, decrement, number) {
return (parseInt(number))-1;
});

modifiedString = modifiedString.replace(/(\+\+_)(\d+)/g, function(match, increment, number) {
return parseInt(number) + 1;
});

const result = eval(modifiedString); // Вычисление строки

return result;
}*/
