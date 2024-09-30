import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndDeviceId } from '../interfaces/end-device-id';
import { EndDeviceIdRequestData } from '../interfaces/end-device-id-request-data';
import { Observable } from 'rxjs';

const API_URL: string = 'http://localhost:3000/api';
const API_PATH: string = '/enddevices';

@Injectable({
  providedIn: 'root',
})
export class EndDeviceIdService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  checkEndDeviceId(endDeviceIdRequestData: EndDeviceIdRequestData) {
    return this.httpClient.post<any>(
      API_URL + API_PATH + '/check',
      endDeviceIdRequestData
    );
  }

  getAllEndDeviceIds() {
    return this.httpClient.get<EndDeviceId[]>(API_URL + API_PATH);
  }

  // POST
  createEndDeviceId(endDeviceId: EndDeviceId) {
    this.httpClient
      .post<{ endDeviceId: EndDeviceId }>(API_URL + API_PATH, endDeviceId)
      .subscribe((responseData) => {
        console.log('createEndDeviceIdresponse', responseData);
        this.router.navigate(['/generator']);
      });
  }
}
