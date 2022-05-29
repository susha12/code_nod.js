const express = require('express');
const app = express();
var fs = require('fs');
const format = require("node.date-time");
const bodyParser = require("body-parser");
const port = process.env.port || 8080;

//Функция для вывода времени
function LogTime(){
return new Date().format("Y-MM-dd HH:mm:SS")+" ";
}

app.get('/', function (req, res, next) { /*отправка пользователю формы и фиксация в журнале*/
fs.appendFile('req.log', LogTime()+'Загрузка страницы без постфикса.'+'\n', 'utf8', function(){});
next();
},
//отправка пользователю формы
function (req, res) {
res.sendFile(__dirname + "/static" + "/form.html");
});

//создание парсера для данных
const urlencodedParser = bodyParser.urlencoded({
extended: false,
});

//определение функции для обработки
app.post('/register', urlencodedParser, function (req,res) {
if (!req.body) return res.sendStatus(400);

//читаем файл-лог и переводим в строку
var data = fs.readFileSync("req.log");

data.toString();

//вывод введённых данных и файла-лога
res.send("<h2>Это данные</h2><p>Фамилия: "+`${req.body.sname}` + "<br>Имя: "+`${req.body.name}` + `<br>Отчество: ${req.body.secname}`);

//запись полученных данных в журнал
fs.appendFile('req.log',LogTime()
+ 'Получены следующие данные' + '\n'
+ 'Фамилия: ' + `${req.body.sname}` + '\n'
+ 'Имя: ' + `${req.body.name}` + '\n'
+ 'Отчество: ' + `${req.body.secname}` + '\n', 'utf8', function(){});
});

app.use(express.static((__dirname + '/static')));
app.listen(port);