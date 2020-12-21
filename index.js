let todoList = [];

// value
const list = document.getElementById("list");
const input = document.getElementById("input_todo");

// 리스트 요소의 상태를 표시하는 값들
const CHECK = "checked";
const LINE_THROUGH = "lineThrough";


// 할일을 넣는 함수
function InsertToDo(todo, id, done, del){
    if(del){ return; }

    const DONE = done ? CHECK : "";
    const LINE = done ? LINE_THROUGH : "";

    const toDo = `<li class="item">
                    <input type="checkbox" class="switch" name="complite" value="done" ${DONE} id=${id}/>
                    <label for="switch"></label>
                    <p class="text" ${LINE}> ${todo} </p>
                    <input class="button" type="button" name="delete" value="X" id=${id}>
                </li>`;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, text);
}

// 엔터 이벤트 리스너
document.addEventListener("keyup", function(event) {
    if(event.code == 'Enter'){
        const toDo = input.value;
        if(toDo){
            InsertToDo(toDo, id, false, false);
            todoList.push(
                {
                    name:toDo,
                    id: id,
                    done: false,
                    del: false
                }
            );
            input.value = "";
            id++;
        }
    }
});

function removeToDo(element) {
    element.parentNode.removeChild(element.parentNode);
    todoList[element.id].del = true;
}

const dateYear = document.getElementById('year');
const nowTime = document.getElementById('date');

function clock() {
    const date = new Date();
    const year = date.getFullYear();

    dateYear.innerText = `${year}`;
    console.log(year);
}

clock();