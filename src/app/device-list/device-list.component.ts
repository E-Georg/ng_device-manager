import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, map, combineLatest } from 'rxjs';
import { Device } from '../interfaces/device';
import { DeviceService } from '../service/device.service';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbHighlight, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../bootstrap/modal/modal.component';

@Component({
  selector: 'app-devicelist',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ReactiveFormsModule, NgbHighlight],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DevicelistComponent implements OnInit {

  public filteredDevices: Device[] = [];
  public devices: Device[] = [];
  public filter = new FormControl('', { nonNullable: true });

  constructor(private deviceService: DeviceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    combineLatest([
      this.deviceService.getDevices(),
      this.filter.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([devices, filterText]) => {
        this.devices = devices;
        return this.onSearch(filterText);
      })
    ).subscribe(filteredDevices => {
      this.filteredDevices = filteredDevices;
    });
  }

  onSearch(text: string): Device[] {
    return this.devices.filter((device) => {
      const term = text.toLowerCase();
      return (
        device.hersteller.toLowerCase().includes(term) ||
        device.model.toLowerCase().includes(term) ||
        device.beschreibung.toLowerCase().includes(term) ||
        device.sn.toLowerCase().includes(term) ||
        device.kunde.toLowerCase().includes(term) ||
        device.einbauort.toLowerCase().includes(term) ||
        device.enddeviceid.toLowerCase().includes(term) ||
        device.appkey.toLowerCase().includes(term) ||
        device.appeui.toLowerCase().includes(term) ||
        device.deveui.toLowerCase().includes(term)
      );
    });
  }

  logDevice(device: Device): void {
    console.log("LogDevice: ", device);
    this.openModal(device);
  }

  openModal(device: Device): void {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.device = device;
  }

  onEditDevice(device: Device) {
    console.log("EditDevice: ", device);
  }


  onDeleteDevice(device: Device) {
    console.log("DeleteDevice: ", device);
    const updatedDevices = this.devices.filter(d => d.sn !== device.sn);
    this.deviceService.devices$.next([...updatedDevices]);
  }

}
