// time, clear
const dateYear = document.getElementById('year');
const dateMonth = document.getElementById('date');
const clear = document.getElementById('clear');

// list, input
const list = document.getElementById('list');
const input = document.getElementById('input_todo');

// todo 객체
let todoList = [];
// 노드의 수
let id = 0;

// 리스트 요소의 상태를 표시하는 값들
const CHECKED = 'checked';
const UNCHECK = 'uncheck';
const LINE = 'todoIsDone';

// todo 객체들을 로컬 스토리지에서 불러오기
let savedTodo = localStorage.getItem("Todo");

// 만약 저장된 객체가 있으면 list에 추가
if(savedTodo){
	todoList = JSON.parse(savedTodo);
	id = todoList.length;
	todoList.forEach(arry =>{
		InsertToDo(arry.content, arry.id, arry.done, arry.del);
	});
}

// clear 버튼 이벤트
clear.addEventListener("click", (event) =>{
	localStorage.clear();
	location.reload();
});

// 할일을 넣는 함수
function InsertToDo(todo, id, done, del) {
	if (del) {
		return;
	}

	const CHECKING = done ? CHECKED : UNCHECK;
	const TEXT = done ? LINE : "";
	
	const toDo = `
		<ul id="list">
            <li class="item">
                <input type="checkbox" id="${id}" ${CHECKING}>
                <label for="${id}" id="${id}" class="${CHECKING}"></label>
                <p class="text ${TEXT}">${todo}</p>
                <input class="delete" id="${id}" type="button" value="X">
            </li>
        </ul>`;
	
	const position = 'beforeend';

	list.insertAdjacentHTML(position, toDo);
}

// 시간을 불러오는 함수
function getTime() {
	const date = new Date();
	const year = date.getFullYear(); //   년
	const month = date.getMonth() + 1; // 월
	const nowday = date.getDate(); //     일

	dateYear.innerText = `${year}:${month}:${nowday}`;
}


// 엔터 이벤트 리스너
document.querySelector('#input_todo').addEventListener('keyup', (event) => {
	if (event.keyCode == 13) {
		const toDo = input.value;
		if (toDo) {
			InsertToDo(toDo, id, false, false);
			todoList.push({  // 요소의 상태값
				content: toDo,
				id: id,
				done: false,
				del: false,
			});
			id++;
			
			// todolist가 업데이트 되었으니 저장
			localStorage.setItem("Todo", JSON.stringify(todoList));
		}
		input.value = '';
	}
});

// checkbox를 클릭시 채크 이벤트 함수
function completeTodo(element) {	
	// checkbox 상태 요소 변경
	element.classList.toggle(CHECKED);
	element.classList.toggle(UNCHECK);
	
	// text line throught
	element.parentNode.querySelector('.text').classList.toggle(LINE);

	todoList[element.id].done = todoList[element.id].done ? false : true;
}

// delete 버튼 클릭시 삭제 함수
function deleteTodo(element) {
	// ul 리스트에서 선택한 노드를 지운다
	element.parentNode.parentNode.removeChild(element.parentNode);
	
	todoList[element.id].del = true;
}

// 클릭 이벤트 리스너
list.addEventListener('click', (event) => {
	const element = event.target;
	const elementStat = element.className;

	if (elementStat == "checked" || elementStat == "uncheck") {
		completeTodo(element);
	} else if (elementStat == "delete") {
		deleteTodo(element);
	}
	
	// todolist가 업데이트 되었으니 저장 
	localStorage.setItem("Todo", JSON.stringify(todoList));
});

getTime();