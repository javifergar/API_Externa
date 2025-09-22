import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse, IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersServicesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';

  getAllUsers(page = 1, perPage = 10): Promise<IResponse> {
    return lastValueFrom(
      this.http.get<IResponse>(
        `${this.baseUrl}?page=${page}&per_page=${perPage}`
      )
    );
  }
  getById(id: string | number): Promise<IUser> {
    return lastValueFrom(this.http.get<IUser>(`${this.baseUrl}/${id}`));
  }

  createNewUser(user: IUser): Promise<IUser> {
    return lastValueFrom(this.http.post<IUser>(this.baseUrl, user));
  }
  updateUser(id: string, user: IUser): Promise<IUser> {
    return lastValueFrom(this.http.put<IUser>(`${this.baseUrl}/${id}`, user));
  }
  deleteUserSvc(id: string): Promise<unknown> {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
}
