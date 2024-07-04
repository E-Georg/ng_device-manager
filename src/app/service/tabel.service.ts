import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabelService {
  drivers = [
    {
      name: 'LoRaWAN',
      abbr: 'lw',
    },
    {
      name: 'BACnet',
      abbr: 'bn',
    },
    {
      name: 'HTTP',
      abbr: 'http',
    },
    {
      name: 'KNX',
      abbr: 'knx',
    },
    {
      name: 'Mbus',
      abbr: 'mb',
    },
    {
      name: 'MQTT',
      abbr: 'mqtt',
    },
    {
      name: 'ModBus',
      abbr: 'mb',
    },
    {
      name: 'OPC-UA',
      abbr: 'opc',
    },
    {
      name: 'SNMP',
      abbr: 'snmp',
    },
  ];

  customers = [
    {
      name: 'Finanz Informatik',
      abbr: 'fi',
    },
    {
      name: 'Vorfuehrkoffer',
      abbr: 'vk',
    },
    {
      name: 'E.Infra',
      abbr: 'ei',
    },

    {
      name: 'Simmel',
      abbr: 'si',
    },

    {
      name: 'Ensinger',
      abbr: 'en',
    },
    {
      name: 'Vertrieb',
      abbr: 'vt',
    },
    {
      name: 'Wetterstation',
      abbr: 'ws',
    },
  ];

  years = [
    {
      name: 2023,
      abbr: 'a',
    },
    {
      name: 2024,
      abbr: 'b',
    },
    {
      name: 2025,
      abbr: 'c',
    },
    {
      name: 2026,
      abbr: 'd',
    },
    {
      name: 2027,
      abbr: 'e',
    },
    {
      name: 2028,
      abbr: 'f',
    },
    {
      name: 2029,
      abbr: 'g',
    },
    {
      name: 2030,
      abbr: 'h',
    },
  ];

  cities = [
    {
      name: 'Rosenheim',
      abbr: 'ro',
    },
    {
      name: 'Dresden',
      abbr: 'dd',
    },
    {
      name: 'Stuttgart',
      abbr: 'str',
    },
    {
      name: 'Muenchen',
      abbr: 'm',
    },
    {
      name: 'Berlin',
      abbr: 'b',
    },
    {
      name: 'Hamburg',
      abbr: 'hh',
    },
    {
      name: 'Bremen',
      abbr: 'hb',
    },
    {
      name: 'Karlsruhe',
      abbr: 'ka',
    },
    {
      name: 'Koeln',
      abbr: 'k',
    },
    {
      name: 'Unna',
      abbr: 'un',
    },
    {
      name: 'Erfurt',
      abbr: 'ef',
    },
    {
      name: 'Bayreuth',
      abbr: 'bt',
    },
  ];

  countries = [
    {
      name: 'Deutschland',
      abbr: 'de',
    },
    {
      name: 'Österreich',
      abbr: 'at',
    },
    {
      name: 'Italien',
      abbr: 'it',
    },
    {
      name: 'Frankreich',
      abbr: 'fr',
    },
    {
      name: 'Polen',
      abbr: 'pl',
    },
  ];

  types = [
    {
      name: 'Sensor',
      abbr: 'sn',
    },
    {
      name: 'Gateway',
      abbr: 'gw',
    },
    {
      name: 'Dtenbank',
      abbr: 'db',
    },
    {
      name: 'Mediator',
      abbr: 'md',
    },
  ];

  drivers$ = new BehaviorSubject(this.drivers);
  customers$ = new BehaviorSubject(this.customers);
  cities$ = new BehaviorSubject(this.cities);
  years$ = new BehaviorSubject(this.years);
  countries$ = new BehaviorSubject(this.countries);
  types$ = new BehaviorSubject(this.types);

  getCustomers() {
    return this.customers$.asObservable();
  }

  getCountries() {
    return this.countries$.asObservable();
  }

  getDrivers() {
    return this.drivers$.asObservable();
  }

  getCities() {
    return this.cities$.asObservable();
  }

  getTypes() {
    return this.types$.asObservable();
  }

  getYears() {
    return this.years$.asObservable();
  }
}
