import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersServicesService } from '../../services/users-services.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersSvc = inject(UsersServicesService);
  userForm: FormGroup;
  user: IUser | any = {};
  title: string = 'Registrar';

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    });
  }
  async ngOnInit() {
    const idUser = this.route.snapshot.paramMap.get('id');

    if (idUser) {
      this.user = await this.usersSvc.getById(idUser);
      this.title = 'Actualizar';
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.user._id, []),
      first_name: new FormControl(this.user.first_name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl(this.user.last_name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      image: new FormControl(this.user.image, [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+/i),
      ]),
    });
  }
  get f() {
    return this.userForm.controls as any;
  }
  async getDataForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      alert('Rellena todos los campos correctamente');
      return;
    }
    try {
      if (this.user && this.user._id) {
        const response = await this.usersSvc.updateUser(
          this.user._id,
          this.userForm.value
        );
        if (response) this.router.navigateByUrl('/home');
        alert('Usuario actualizado correctamente');
      } else {
        const response = await this.usersSvc.createNewUser(this.userForm.value);
        if (response) this.router.navigateByUrl('/home');
        alert('Usuario creado correctamente');
      }
    } catch (msg: any) {
      alert(msg.error);
    }
  }

  cancelar() {
    if (this.user && this.user._id) {
      this.router.navigateByUrl(`/user/${this.user._id}`);
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
