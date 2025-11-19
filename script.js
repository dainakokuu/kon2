let translate = false

function setLanguage()
{
    if (translate == false){
        document.querySelector('#pas p:nth-child(1)').textContent = 'MWD OF RUSSIA'
        document.querySelector('#pas p:nth-child(2)').textContent = 'FOR N"S AREA'
        document.querySelector('#pas p:nth-child(3)').textContent = 'KONSKIIY'
        document.querySelector('#pas p:nth-child(4)').textContent = 'OLEG'
        document.querySelector('#pas p:nth-child(5)').textContent = 'IVANOVICH'
        document.querySelector('#pas p:nth-child(7)').textContent = 'MOSCOW CITY RF'
        translate = true
    }
    else{
        document.querySelector('#pas p:nth-child(1)').textContent = 'MВД РОССИИ'
        document.querySelector('#pas p:nth-child(2)').textContent = 'ПО Н-ОЙ ОБЛ'
        document.querySelector('#pas p:nth-child(3)').textContent = 'КОНСКИЙ'
        document.querySelector('#pas p:nth-child(4)').textContent = 'ОЛЕГ'
        document.querySelector('#pas p:nth-child(5)').textContent = 'ИВАНОВИЧ'
        document.querySelector('#pas p:nth-child(7)').textContent = 'Г. МОСКВА РФ'
        translate = false
    }
}

 document.getElementById('calculate').addEventListener('click', function() {
            // Получаем значения X и Y
            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);
            const resultDiv = document.getElementById('result');
            const serverResponseDiv = document.getElementById('server-response');
            
            // Проверяем корректность введенных данных
            if (isNaN(x) || isNaN(y)) {
                resultDiv.textContent = 'Ошибка: Пожалуйста, введите корректные числовые значения для X и Y.';
                resultDiv.className = 'result error';
                resultDiv.style.display = 'block';
                serverResponseDiv.style.display = 'none';
                return;
            }
            
            // Проверяем, что произведение не равно нулю
            if (x * y === 0) {
                resultDiv.textContent = 'Ошибка: Произведение X и Y не должно равняться нулю (деление на ноль невозможно).';
                resultDiv.className = 'result error';
                resultDiv.style.display = 'block';
                serverResponseDiv.style.display = 'none';
                return;
            }
            
            // Вычисляем значение Z
            const z = 1 / (x * y);
            
            // Отображаем результат
            resultDiv.textContent = `При X = ${x} и Y = ${y}, значение Z = 1/(X*Y) = ${z}`;
            resultDiv.className = 'result success';
            resultDiv.style.display = 'block';
            
            // Отправляем данные на сервер через URL
            sendDataToServer(x, y, z);
        });
        
        function sendDataToServer(x, y, z) {
            // Формируем данные для отправки
            const data = {
                task: "1011. Определить значение функции Z = 1/(XY) при произвольных X и Y",
                x: x,
                y: y,
                z: z
            };
            
            // Кодируем данные для URL
            const encodedData = encodeURIComponent(JSON.stringify(data));
            
            // Формируем URL с данными в параметрах
            // В реальном приложении здесь должен быть URL вашего сервера
            const serverUrl = `https://httpbin.org/get?data=${encodedData}`;
            
            // Отправляем запрос на сервер
            fetch(serverUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети');
                    }
                    return response.json();
                })
                .then(data => {
                    // Отображаем ответ сервера
                    const serverResponseDiv = document.getElementById('server-response');
                    serverResponseDiv.textContent = 'Данные успешно отправлены на сервер. Ответ сервера: ' + JSON.stringify(data.args);
                    serverResponseDiv.style.display = 'block';
                })
                .catch(error => {
                    // Обрабатываем ошибки
                    const serverResponseDiv = document.getElementById('server-response');
                    serverResponseDiv.textContent = 'Ошибка при отправке данных на сервер: ' + error.message;
                    serverResponseDiv.className = 'server-response error';
                    serverResponseDiv.style.display = 'block';
                });
        }