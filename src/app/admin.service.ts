import { Injectable } from '@angular/core';
import { ApiResponse } from './_types/ApiResponse';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminKey: string;


  constructor(
    private apiService: ApiService,
  ) {
  }


  isAdmin(): boolean {
    return !!this.adminKey;
  }


  /**
   * Returns true if the adminKey is valid.
   */
  async adminLogin(adminKey: string): Promise<boolean> {
    const response: ApiResponse = null; // TODO Use API to verify the adminKey.
    if (response.error) {
      throw new Error('Unexpected / unhandled error');
    }
    const success = response.data.success;
    if (success) {
      this.adminKey = adminKey;
    }
    return success;
  }
}
