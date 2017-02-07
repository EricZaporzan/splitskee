import m from 'mithril';
import prop from 'mithril/stream';

class Todo {
  constructor(title) {
    this.completed = prop(false);
    this.title = prop(title);
  }

  toggleComplete() {
    this.completed(!this.completed());
  }
}

export default class TodoList {
  constructor() {
    this.todos = [];
    this.hideCompleted = prop(false);
  }

  add(todo) {
    this.todos.push(new Todo(todo));
  }

  remove(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  remaining() {
    let r = 0;
    this.todos.map(todo => todo.completed() || r++);
    return r;
  }

  clearAll() {
    this.todos = [];
  }
}
