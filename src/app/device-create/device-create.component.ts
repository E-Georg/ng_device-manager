import {
  Component,
  type OnInit,
  type TemplateRef,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../bootstrap/toast/toast.service';
import { ToastsContainer } from '../bootstrap/toast/toasts-container.component';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    ToastsContainer,
  ],
  templateUrl: './device-create.component.html',
  styleUrl: './device-create.component.scss',
})
export class DeviceCreateComponent implements OnInit {
  deviceService = inject(DeviceService);
  toastService = inject(ToastService);
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      manufacturer: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      }),
      model: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      }),
      serialNumber: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      }),
      appkey: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-fA-F0-9]{32}$/),
        ],
      }),
      appeui: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-fA-F0-9]{16}$/),
        ],
      }),
      deveui: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-fA-F0-9]{16}$/),
        ],
      }), //HEX zahlen
      // Optional
      endDeviceId: new FormControl(''),
      customer: new FormControl(''),
      location: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSubmit(template: TemplateRef<any>) {
    // Fromular is valid ?
    if (this.form.invalid) {
      return;
    }
    // Neues Device erstellen
    const newDevice = {
      _id: '',
      manufacturer: this.form.value.manufacturer,
      model: this.form.value.model,
      serialNumber: this.form.value.serialNumber,
      appkey: this.form.value.appkey,
      appeui: this.form.value.appeui,
      deveui: this.form.value.deveui,
      endDeviceId: this.form.value.endDeviceId,
      customer: this.form.value.customer,
      location: this.form.value.location,
      description: this.form.value.description,
    };
    // Device hinzufügen
    this.deviceService.addDevice(newDevice);
    // Show Toast
    this.showSuccess(template);
    // Rest Form
    this.form.reset();
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }
}
