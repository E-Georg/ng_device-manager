import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndDeviceId } from '../interfaces/end-device-id';
import { EndDeviceIdRequestData } from '../interfaces/end-device-id-request-data';
import { Observable } from 'rxjs';

const API_URL: string = 'http://localhost:3000/api';
const API_PATH: string = '/enddevices/check';
const API_PATH2: string = '/enddevices';

@Injectable({
  providedIn: 'root',
})
export class EndDeviceIdService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  checkEndDeviceId(endDeviceIdRequestData: EndDeviceIdRequestData) {
    return this.httpClient.post<any>(
      API_URL + API_PATH,
      endDeviceIdRequestData
    );
  }

  getEndDeviceIds() {
    return this.httpClient.get<{ message: string; endDeviceId: EndDeviceId[] }>(
      // environment.apiUrl + query
      API_URL + API_PATH2
    );
  }

  // POST
  createEndDeviceId(endDeviceId: EndDeviceId) {
    this.httpClient
      .post<{ message: string; endDeviceId: EndDeviceId }>(
        API_URL + API_PATH2,
        endDeviceId
      )
      .subscribe((responseData) => {
        console.log('createEndDeviceIdresponse', responseData);
        this.router.navigate(['/generator']);
      });
  }
}
