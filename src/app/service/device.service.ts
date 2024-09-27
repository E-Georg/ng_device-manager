import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.development';
import { Device } from '../interfaces/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // POST
  addDevice(device: Device) {
    console.log('Device added!: ', device);
    this.httpClient
      .post<{ message: string; device: Device }>(
        'http://localhost:3333/api/devices/',
        {
          device,
        }
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/list']);
      });
  }

  // UPDATE
  updateDevice(id: string) {
    this.httpClient
      .delete(`http://localhost:3333/api/devices/${id}`)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/list']);
      });
  }

  deleteDevice(id: string) {
    this.httpClient
      .delete(`http://localhost:3333/api/devices/${id}`)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/list']);
      });
  }

  getDevices() {
    const query: string = 'device/';
    return this.httpClient.get<{ message: string; devices: Device[] }>(
      // environment.apiUrl + query
      'http://localhost:3333/api/devices/'
    );
  }

  getDevice(id: string) {
    const query: string = `device/${id}`;
    this.httpClient
      .get<{ message: string; device: Device }>(environment.apiUrl + query)
      .subscribe((r) => {
        console.log('result: ', r);
      });
  }
}
