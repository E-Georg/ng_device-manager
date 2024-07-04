import { Injectable } from '@angular/core';
import { Device } from '../interfaces/device';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  devices: Device[] = [{
    hersteller: 'Dragino',
    model: 'LWL02',
    beschreibung: "Türsensor",
    sn: 'LWL02588297',
    kunde: "E.INFRA Stuttgart",
    einbauort: "Eingangstür",
    enddeviceid: "einfra-de-stuttgart-ws-001",
    appkey: "bd1ce6d83f5c14e74929b245838c1f2e",
    appeui: "a840410000000107",
    deveui: "a84041f661867249"
  },
  {
    hersteller: 'Dragion',
    model: 'LDS02',
    beschreibung: "Wasserlecksensor",
    sn: 'LDS025228702',
    kunde: "E.INFRA Stuttgart",
    einbauort: "Regal",
    enddeviceid: "wiebke-dragino-lds02-tuersensor",
    appkey: "9FE78FF97BD9FCA479EE5ADB89B548F5",
    appeui: "A84041000000107E",
    deveui: "A84041983185897E"
  },
  {
    hersteller: 'MClimate',
    model: 'Vicki',
    beschreibung: "Heizregler",
    sn: 'G1NK118771VS5U',
    kunde: "E.INFRA Stuttgart",
    einbauort: "Georg Schreibtisch",
    enddeviceid: "einfra-de-str1-mh1",
    appkey: "1F89D26F874D9E25FEF2227DF2402206",
    appeui: "70B3D52DD3000000",
    deveui: "70B3D52DD3008126"
  },
  {
    hersteller: 'MClimate',
    model: 'Vicki',
    beschreibung: "Heizregler",
    sn: 'U7AS118854FPXM',
    kunde: "E.INFRA Stuttgart",
    einbauort: "Adis Schreibtisch",
    enddeviceid: "einfra-de-str1-mh1",
    appkey: "EB8EF8978C6084A632297FBB56F03BD6",
    appeui: "70B3D52DD3000000",
    deveui: "70B3D52DD3008179"
  },
  {
    hersteller: 'EMU',
    model: 'Professional',
    beschreibung: "Professional 2 3/100",
    sn: '24080737',
    kunde: "",
    einbauort: "",
    enddeviceid: "",
    appkey: "21CE9A6F9ABA0A9BD829325D9114AECC",
    appeui: "",
    deveui: "102CEFFFFE0110AF"
  },
  ]

  public devices$ = new BehaviorSubject<Device[]>(this.devices);

  constructor() { }

  getDevices() {
    return this.devices$.asObservable();
  }

  addDevice(device: Device) {
    this.devices.push(device);
    console.log("Device added!: ", device);
    this.devices$.next([...this.devices]);
    // Show toast / popup
  }

  updateDevice(device: Device) {
    console.log("Device updated!: ", device);
    // Show toast / popup
  }

}
