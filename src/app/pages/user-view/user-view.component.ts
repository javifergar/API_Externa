import { Component, OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersServicesService } from '../../services/users-services.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersSvc = inject(UsersServicesService);
  user: IUser | any = {};

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    try {
      this.user = await this.usersSvc.getById(id);
    } catch (msg: any) {
      alert(msg.error);
    }
  }

  async deleteUser() {
    try {
      if (!this.user) return;
      const { first_name, last_name } = this.user;
      const ok = confirm(
        `¿Seguro que deseas borrar a ${first_name} ${last_name}?`
      );
      if (!ok) return;
      this.usersSvc.deleteUserSvc(this.user._id);
      this.router.navigate(['/home']);
    } catch (msg: any) {
      alert(msg.error);
    }
  }
}
