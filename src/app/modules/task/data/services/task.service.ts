import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { environment } from '@environment/environment';
import { ResponseI } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = `${environment.baseApiUrl}api/tasks`;

  constructor(private http: HttpClient) {}

  create(task: Partial<TaskModel>): Observable<ResponseI<TaskModel>> {
    return this.http.post<ResponseI<TaskModel>>(this.url, task);
  }

  update(id: string, task: Partial<TaskModel>): Observable<ResponseI<TaskModel>> {
    return this.http.put<ResponseI<TaskModel>>(`${this.url}`, { id, ...task });
  }

  delete(id: string): Observable<ResponseI<null>> {
    return this.http.delete<ResponseI<null>>(`${this.url}/${id}`);
  }

  getTasks(): Observable<ResponseI<TaskModel[]>> {
    return this.http.get<ResponseI<TaskModel[]>>(`${this.url}/user`);
  }
}
