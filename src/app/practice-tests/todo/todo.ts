import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoInterface, TodoService } from '../../services/todo';
 
@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class Todo implements OnInit {
  todos: TodoInterface[] = [];
  todoForm!: FormGroup;
  showForm = false;
  editingTodo: TodoInterface | null = null;
  viewingTodo: TodoInterface | null = null;
  loading = false;
  error: string | null = null;
 
  constructor(private todoService: TodoService, private fb: FormBuilder) {}
 
  ngOnInit() {
    this.loadTodos();
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false],
    });
  }
 
  loadTodos() {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load TODOs';
        this.loading = false;
      },
    });
  }
 
  openForm() {
    this.editingTodo = null;
    this.todoForm.reset({ title: '', description: '', completed: false });
    this.showForm = true;
  }
 
  closeForm() {
    this.showForm = false;
  }
 
  submitForm() {
    if (this.todoForm.invalid) return;
    const formValue = this.todoForm.value;
 
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo.id, formValue).subscribe({
        next: (updated) => {
          const idx = this.todos.findIndex((t) => t.id === updated.id);
          if (idx > -1) this.todos[idx] = updated;
          this.showForm = false;
        },
        error: () => (this.error = 'Update failed'),
      });
    } else {
      this.todoService.createTodo(formValue).subscribe({
        next: (created) => {
          this.todos.push(created);
          this.showForm = false;
        },
        error: () => (this.error = 'Create failed'),
      });
    }
  }
 
  editTodo(todo: TodoInterface) {
    this.editingTodo = todo;
    this.todoForm.patchValue(todo);
    this.showForm = true;
  }
 
  deleteTodo(id: number) {
    if (!confirm('Are you sure to delete this TODO?')) return;
    this.todoService.deleteTodo(id).subscribe({
      next: () => (this.todos = this.todos.filter((t) => t.id !== id)),
      error: () => (this.error = 'Delete failed'),
    });
  }
 
  viewTodo(todo: TodoInterface) {
    this.viewingTodo = todo;
  }
 
  closeView() {
    this.viewingTodo = null;
  }
 
  toggleComplete(todo: TodoInterface) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe({
      next: (updated) => {
        const idx = this.todos.findIndex((t) => t.id === updated.id);
        if (idx > -1) this.todos[idx] = updated;
      },
      error: () => (this.error = 'Failed to update status'),
    });
  }
}