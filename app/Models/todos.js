class Todo {

    constructor(data) {
       this.title = data.title;
       this.desc = data.desc;
       this.date = data.date;
       this.priority = data.priority;
    }
 
    addTodos() {
        console.log(`INSERT INTO todolist(todo_title,todo_desc,priority,todo_date) VALUES('${this.title}','${this.desc}', ${this.priority})`)
       return `INSERT INTO todolist(todo_title,todo_desc,priority) VALUES('${this.title}','${this.desc}', '${this.priority}')`;
    }
 
    updateTodo(id) {
       return `UPDATE todolist SET todo_title = '${this.title}', todo_desc = '${this.desc}',  priority = '${this.priority}' WHERE id = ${id}`;
    }
 
    static getTodoById(id) {
       console.log(id);
       return `SELECT id,todo_title,todo_desc,priority FROM todolist WHERE id = ${id}`;
    }
 
    static deleteTodoById(id) {
       return `DELETE FROM todolist WHERE id = ${id}`;
    }
 
    static getAllTodos() {
       return `SELECT id,todo_title,todo_desc,priority FROM todolist`;
    }


 }
 
 module.exports = Todo;