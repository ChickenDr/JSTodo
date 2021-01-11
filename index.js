const dateYear = document.getElementById('year');
const dateMonth = document.getElementById('date');

// 시간을 로드
function getTime() {
	const date = new Date();
	const year = date.getFullYear(); //   년
	const month = date.getMonth() + 1; // 월
	const nowday = date.getDate(); //     일

	dateYear.innerText = `${year}:${month}:${nowday}`;
}

let todoList = [],
	id = 0;

// value
const list = document.getElementById('list');
const input = document.getElementById('input_todo');

// 리스트 요소의 상태를 표시하는 값들
const CHECKED = 'check';
const UNCHEKCK = 'uncheck';
const LINE_THROUGH = 'todoIsDone';

// 할일을 넣는 함수
function InsertToDo(todo, id, done, del) {
	if (del) {
		return;
	}

	const DONE = done ? CHECKED : UNCHEKCK;

	const toDo = `
		<ul id="list">
            <li class="item">
                <input type="checkbox" id="${id}" class=${DONE}/>
                <label for="${id}" value="done"></label>
                <p class="text">${todo};</p>
                <input class="button" type="button" value="X">
            </li>
        </ul>`;
	const position = 'beforeend';

	list.insertAdjacentHTML(position, toDo);
}

// 엔터 이벤트 리스너
document.querySelector('#input_todo').addEventListener('keyup', (event) => {
	if (event.keyCode == 13) {
		const toDo = input.value;
		if (toDo) {
			InsertToDo(toDo, id, false, false);
			todoList.push({
				name: toDo,
				id: id,
				done: false,
				del: false,
			});
			id++;
		}
		input.value = '';
	}
});

function completeTodo(element) {
	element.classList.toggle(CHECKED);
	console.log(element.toggle(CHEKCK));
	element.classList.toggle(UNCHEKCK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

	todoList[element.id].done = todoList[element.id].done ? false : true;
}


list.addEventListener('click', (event) => {
	const element = event.target;
	if (element.checked == true) {
		completeTodo(element);
	} else if (element.checked = false) {
		removeToDo();
	}
});

getTime();