import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-error-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title text-danger">Fehler</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <h2 class="text-danger">{{ errMessage }}</h2>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-primary"
        (click)="activeModal.close('Close click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgbdErrorModalContent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  @Input() errMessage!: String;
}
