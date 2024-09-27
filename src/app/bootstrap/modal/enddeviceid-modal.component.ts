import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndDeviceId } from '../../interfaces/end-device-id';
import { EndDeviceIdService } from '../../service/end-device-id.service';

@Component({
  selector: 'ngbd-enddeviceid-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">EndDeviceID</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>Neue EndDeviceID wurde erstellt.</p>
      <pre><strong class="text-primary">{{ endDeviceIdData.endDeviceId }}</strong></pre>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-danger"
        (click)="activeModal.dismiss('cancel click')"
      >
        Verwerfen
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-primary"
        (click)="sendNewEndDeviceIdBackToDB(endDeviceIdData)"
      >
        Speichern
      </button>
    </div>
  `,
})
export class NgbdEndDeviceIdModalContent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  @Input() endDeviceIdData!: EndDeviceId;

  constructor(private endDeviceIdService: EndDeviceIdService) {}

  sendNewEndDeviceIdBackToDB(endDeviceIdData: EndDeviceId) {
    this.endDeviceIdService.createEndDeviceId(endDeviceIdData);
    this.activeModal.close('Ok click');
  }
}
