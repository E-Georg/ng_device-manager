import { Injectable } from '@angular/core';
import { Device } from '../interfaces/device';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  addDevice(device: Device) {
    // POST
    console.log('Device added!: ', device);
    // Show toast / popup
  }

  updateDevice(device: Device) {
    // UPDATE
    console.log('Device updated!: ', device);
    // Show toast / popup
  }

  deleteDevice(device: Device) {
    // DELETE
    console.log('Device updated!: ', device);
    // Show toast / popup
  }

  getDevices() {
    const query: string = 'device';
    return this.httpClient.get<{ message: string; devices: Device[] }>(
      environment.apiUrl + query
    );
  }

  getDevice(id: string) {
    const query: string = `api/device/${id}`;
    this.httpClient
      .get<{ message: string; device: Device }>(environment.apiUrl + query)
      .subscribe((r) => {
        console.log('result: ', r);
      });
  }
}
