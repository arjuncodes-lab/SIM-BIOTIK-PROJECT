import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface TodoInterface {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
 
@Injectable({ providedIn: 'root' })

export class TodoService {
  private baseUrl = '/api/todos'; 
 
  constructor(private http: HttpClient) {}
 
  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(this.baseUrl);
  }
 
  getTodoById(id: number): Observable<TodoInterface> {
    return this.http.get<TodoInterface>(`${this.baseUrl}/${id}`);
  }
 
  createTodo(todo: Partial<TodoInterface>): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(this.baseUrl, todo);
  }
 
  updateTodo(id: number, todo: Partial<TodoInterface>): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(`${this.baseUrl}/${id}`, todo);
  }
 
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}