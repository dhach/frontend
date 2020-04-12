import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isAdmin: boolean;

  adminKey: string;

  wrongInput = false;


  constructor(
    private adminService: AdminService,
  ) {
    this.isAdmin = adminService.isAdmin();
  }


  ngOnInit(): void {
  }


  async onLoginSubmit() {
    const success = await this.adminService.adminLogin(this.adminKey);
    if (success) {
      this.isAdmin = true;
      this.wrongInput = false;
    } else {
      this.wrongInput = true;
      this.adminKey = undefined;
    }
  }
}
