import React, { Component } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';


class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      task: '',
      date: '',
      time: '',
      description: '',
      isEditing: false,
      currentId: null,
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    const todoCollection = collection(db, 'todos');
    onSnapshot(todoCollection, (snapshot) => {
      let todos = snapshot.docs.map(doc => ({
        id: doc.id,
        task: doc.data().task,
        date: doc.data().date,
        time: doc.data().time,
        description: doc.data().description || '',
        completed: doc.data().completed || false,
      }));
      this.setState({ todos });
    });
  }

  addTask = async (e) => {
    e.preventDefault();
    const { task, date, time, description, isEditing, currentId } = this.state;

    if (task && date && time && description) {
      if (isEditing) {
        const taskDocRef = doc(db, 'todos', currentId);
        await updateDoc(taskDocRef, { task, date, time, description });
        this.setState({ isEditing: false, currentId: null });
      } else {
        await addDoc(collection(db, 'todos'), {
          task,
          date,
          time,
          description,
          completed: false,
        });
      }

      this.setState({ task: '', date: '', time: '', description: '' });
    }
  }

  deleteTask = async (id) => {
    const taskDocRef = doc(db, 'todos', id);
    await deleteDoc(taskDocRef);
  }

  editTask = (todo) => {
    this.setState({
      task: todo.task,
      date: todo.date,
      time: todo.time,
      description: todo.description,
      isEditing: true,
      currentId: todo.id,
    });
  }

  toggleComplete = async (id, completed) => {
    const taskDocRef = doc(db, 'todos', id);
    await updateDoc(taskDocRef, { completed: !completed });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { todos, task, date, time, description, isEditing } = this.state;

    return (
      <div>
        <h1>ToDo List</h1>
        <form onSubmit={this.addTask}>
          <input
            type="text"
            name="task"
            placeholder="Task"
            value={task}
            onChange={this.handleChange}
          />
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          <input
            type="time"
            name="time"
            value={time}
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.toggleComplete(todo.id, todo.completed)}
              />
              <strong>{todo.task}</strong> - {todo.date} {todo.time}
              <p>{todo.description}</p>
              <button onClick={() => this.editTask(todo)}>Edit</button>
              <button onClick={() => this.deleteTask(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


export default ToDo;

