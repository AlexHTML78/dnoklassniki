let getJSON = function(url, successHandler, errorHandler) {
	let xhr = typeof XMLHttpRequest != 'undefined'
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('get', url, true);
	xhr.onreadystatechange = function() {
		let status;
		let data;
		// https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
		if (xhr.readyState == 4) { // `DONE`
			status = xhr.status;
			if (status == 200) {
				data = JSON.parse(xhr.responseText);
				successHandler && successHandler(data);
			} else {
				errorHandler && errorHandler(status);
			}
		}
	};
	xhr.send();
};

getJSON('usrs.json', function(data) {
    document.getElementById('search').addEventListener('click', function() {
       let name = document.getElementById('userName').value;
       let usrName = data[0][name].name,
           usrCity = '<p>' + 'Живет в ' + data[0][name].city  + '</p>',
           usrImg = '<div class="img"><img src="' + data[0][name].img + '" /></div>',
           usrAge = data[0][name].age,
           usrVk = '<a target="_blank" href="' + data[0][name].vklink + '">' +'Ссылка на ВК' + '</a>',
           usrObjectToLove = data[0][name].objectToLove;
        /* Результат */
        let messageText = '<p>' + usrName + ' ' + name + '</p>'
                        + '<p>' + 'Возраст: ' + usrAge + '</p>'
                        +  usrCity
                        + '<p>' + 'Любимый предмет: ' + usrObjectToLove + '</p>'
                        + usrImg
                        + usrVk,
        result_container = document.getElementById('results'),
        result = document.createElement('div');
        result_container.innerHTML = ''; //обнуляем поле результата
        result.className = 'messageBody';
        result.innerHTML = messageText;
        result_container.appendChild(result);
        document.getElementById('userName').value = ''; //обнуляем поле поиска
    });
    document.getElementById('help').addEventListener('click', function() {
        alert('Введите фамилию одноклассника в поле ввода, затем нажмите кнопку "Найти информацию". Теперь Вы можете узнать доступную информацию о данном человеке.')
    });
}
        
, function(status) {
	alert('Сайт перестал работать.');
});


