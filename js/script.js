const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        add(todo);
    })
}
form.addEventListener('submit', function(event){
    // 1行目のform要素がsubmitされた時
    event.preventDefault();
    //submitのリロードを無効にする
    console.log(input.value);
    add();//19行目の関数を実行する
})
function add(todo) {
    let todoText = input.value;
    //2行目のvalueを取得
    if(todo) {
        todoText = todo.text;
        //53行目のtodoのtextのオブジェクトを渡す。
    }
    if(todoText){//暗黙的型変換でtodoTextにvalueがある為、
        //todoTextでもtodoText.length > 0可能。
        const li = document.createElement('li');
        li.innerText = todoText;
        li.classList.add('list-group-item');
        if (todo && todo.completed) {
            li.classList.add('text-decoration-line-through');
        }
        li.addEventListener('contextmenu', function(event){
            event.preventDefault();
            li.remove();
            saveData();
        });
        li.addEventListener('click', function (){
            li.classList.toggle('text-decoration-line-through');
            saveData();
        });
        ul.appendChild(li);
        input.value = '';
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll('li');
    //配列で戻ってくる
    let todos = [];//todosの空の配列データを用意
    lists.forEach(list => {
        let todo = {
            text:list.innerText,
            completed:list.classList.contains('text-decoration-line-through'),
            //bootstrapの打ち消し線クラスを追加
            //contains()で対象のクラスをあったら、completedにtrue
            //なければfalse。
        };
        todos.push(todo);//空のtodosにtodoのオブジェクトを
        //pushで格納
    });
    localStorage.setItem('todos',JSON.stringify(todos));
}