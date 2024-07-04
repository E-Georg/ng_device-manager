import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from '../bootstrap/toast/toasts-container.cpmonent';
import { ToastService } from '../bootstrap/toast/toast.service';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbTooltipModule, ToastsContainer],
  templateUrl: './device-create.component.html',
  styleUrl: './device-create.component.scss'
})
export class DeviceCreateComponent implements OnInit {
  deviceService = inject(DeviceService);
  toastService = inject(ToastService);
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      hersteller: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
      model: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
      sn: new FormControl(null, { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)] }),
      appkey: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-fA-F0-9]{32}$/)] }),
      appeui: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-fA-F0-9]{16}$/)] }),
      deveui: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-fA-F0-9]{16}$/)] }), //HEX zahlen
      // Optional
      enddeviceid: new FormControl(''),
      beschreibung: new FormControl(''),
      kunde: new FormControl(''),
      einbauort: new FormControl(''),
    });
  }


  onSubmit(template: TemplateRef<any>) {
    // Fromular is valid ?
    if (this.form.invalid) {
      return;
    }

    // Build JSON
    console.log("Form: ", this.form.value);

    // Neues Device erstellen

    // Device hinzufügen
    this.deviceService.addDevice(this.form.value);
    // Show Toast
    this.showSuccess(template);
    // Rest Form
    this.form.reset();
  }


  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }
}
