import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Device } from '../../interfaces/device';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Device</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">Hersteller:</div><div class="col-auto">{{ device.hersteller }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">Model:</div><div class="col-auto">{{ device.model }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">Seriennr.:</div><div class="col-auto">{{ device.sn }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">AppKEY:</div><div class="col-auto">{{ device.appkey }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">AppEUI:</div><div class="col-auto">{{ device.appeui }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">DevEUI:</div><div class="col-auto">{{ device.deveui }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">EndDeviceID:</div><div class="col-auto">{{ device.enddeviceid }}</div>
      </div>
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto fw-semibold">Einbauort:</div><div class="col-auto">{{ device.einbauort }}</div>
      </div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Bearbeiten</button>
      <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Schließen</button>
		</div>
	`,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  @Input() device!: Device;
}