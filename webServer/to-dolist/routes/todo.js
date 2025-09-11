const express = require("express");
const router = express.Router();

// todo 정보 저장 데이터 베이스
let todos = [
  { id: 1, task: "Node.js 공부하기", completed: false },
  { id: 2, task: "운동하기", completed: true },
  { id: 3, task: "장보기", completed: false },
];

let nextId = 4; // 다음 ID 관리를 위한 변수

//1. index 페이지 렌더링 (localhost:3000/todos)
//   => 할일목록 정보를 활용하여 렌더링 할 것!
router.get('/todos', (req, res) => {
  res.render('index', {todos}); //{todos : todos}
});

//2. 할 일 추가 (localhost:3000/todos)
//   -> 사용자가 입력한 todo 정보를 배열에 추가한 후 index 페이지로 이동할 것 (이동 후에는 추가한 todo가 목록에 보여야함!)
router.post('/todos', (req, res)=>{
  const task = req.body.task;

  const newTodo = {id : nextId++, task : task, completed : false};
  todos.push(newTodo);

  res.redirect('/todos');
});

//3. 할 일 수정 폼 페이지 렌더링 (localhost:3000/todos/edit/아이디)
//   -> 사용자가 선택한 todo를 수정할 수 있는 페이지로 이동 (이동 후에 선택한 todo가 페이지에 기본값으로 출력되어야 함)
router.get('/todos/edit/:id', (req, res)=>{
  const todo = todos.find((t)=> t.id == req.params.id);
  if(!todo){
    res.status(404).send('할 일을 찾을 수 없습니다.');
  }
  res.render('edit', {todo});
});

//4. 할 일 내용 수정 (localhost:3000/todos/아이디)
//   -> 사용자가 입력한 task 로 해당 todo 정보 수정 (수정 완료 후 수정 성공 메세지 응답)
router.put('/todos/:id', (req,res)=>{
  const todo = todos.find((t)=> t.id == req.params.id);
  if(!todo){
    res.status(404).json({message : '할 일을 찾을 수 없음'});
  }
  todo.task = req.body.task;
  res.json({message : '수정 성공'});
});


//5. 할 일 삭제 (localhost:3000/todos/아이디)
//   -> 사용자가 선택한 todo를 삭제 (삭제 완료 후 삭제 성공 메세지 응답)
router.delete('/todos/:id', (req,res)=>{
  const index = todos.findIndex((t)=> t.id == req.params.id);

  if(index === -1){
    res.status(404).json({message : '할 일을 찾을 수 없음'});
  }

  todos.splice(index, 1);
  res.json({message : '삭제 성공'});
});

router.patch('/todos/:id/completed', (req,res)=>{
  const todo = todos.find((t)=> t.id == req.params.id);
  if(!todo){
    res.status(404).json({message : '할 일을 찾을 수 없음'});
  }
  //현재 completed 상태를 수정 (true -> false / false -> true)
  todo.completed = !todo.completed;
  res.json({message : '상태 수정 성공'});
});

module.exports = router;