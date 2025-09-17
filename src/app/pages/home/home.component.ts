import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersServicesService } from '../../services/users-services.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private usersSvc = inject(UsersServicesService);
  private router = inject(Router);
  @Input() myUser!: IUser;
  users: IUser[] = [];
  loading = false;
  error = '';
  page = 1;
  perPage = 10;
  totalPages = 1;

  ngOnInit() {
    this.load();
  }
  async load(page = 1) {
    this.loading = true;
    this.error = '';
    try {
      const response = await this.usersSvc.getAllUsers(page);
      //console.log('[Home] response =', response);
      this.users = response.results;
      this.page = response.page;
      this.totalPages = response.total_pages;
      this.loading = false;
    } catch (msg: any) {
      alert(msg.error);
      this.loading = false;
    }
  }
  async deleteUser(u: IUser): Promise<void> {
    if (!u) return;
    const { first_name, last_name } = u;
    const ok = confirm(
      `¿Seguro que deseas borrar a ${first_name} ${last_name}?`
    );
    if (!ok) return;

    try {
      await this.usersSvc.deleteUser(u._id);

      this.users = this.users.filter((x) => x._id !== u._id);
    } catch (msg: any) {
      alert(msg.error);
    }
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async goTo(p: number) {
    if (p === this.page) return;
    this.load(p);
  }
}
