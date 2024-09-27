import { AsyncPipe } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbHighlight, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map, startWith } from 'rxjs';
import { NgbdDeviceModalContent } from '../bootstrap/modal/device-modal.component';
import type { Device } from '../interfaces/device';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-devicelist',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ReactiveFormsModule, NgbHighlight],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss',
})
export class DevicelistComponent implements OnInit {
  public filteredDevices: Device[] = [];
  public devices: Device[] = [];
  public filter = new FormControl('', { nonNullable: true });

  constructor(
    private deviceService: DeviceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.deviceService.getDevices(),
      this.filter.valueChanges.pipe(startWith('')),
    ])
      .pipe(
        map(([devices, filterText]) => {
          this.devices = devices.devices;
          return this.onSearch(filterText);
        })
      )
      .subscribe((filteredDevices) => {
        this.filteredDevices = filteredDevices;
      });
  }

  onSearch(text: string): Device[] {
    return this.devices.filter((device) => {
      const term = text.toLowerCase();
      return (
        device.manufacturer.toLowerCase().includes(term) ||
        device.model.toLowerCase().includes(term) ||
        device.description.toLowerCase().includes(term) ||
        device.serialNumber.toLowerCase().includes(term) ||
        device.customer.toLowerCase().includes(term) ||
        device.location.toLowerCase().includes(term) ||
        device.endDeviceId.toLowerCase().includes(term) ||
        device.appkey.toLowerCase().includes(term) ||
        device.appeui.toLowerCase().includes(term) ||
        device.deveui.toLowerCase().includes(term)
      );
    });
  }

  logDevice(device: Device): void {
    console.log('LogDevice: ', device);
  }

  openModal(device: Device): void {
    const modalRef = this.modalService.open(NgbdDeviceModalContent);
    modalRef.componentInstance.device = device;
  }

  onEditDevice(device: Device) {
    console.log('EditDevice: ', device._id);
  }

  onDeleteDevice(device: Device) {
    console.log('DeleteDevice: ', device);
    this.deviceService.deleteDevice(device._id);
  }
}
