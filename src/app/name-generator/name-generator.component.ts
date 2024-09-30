import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TabelService } from '../service/tabel.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdEndDeviceIdModalContent } from '../bootstrap/modal/enddeviceid-modal.component';
import { NgbdErrorModalContent } from '../bootstrap/modal/error-modal.component';
import { EndDeviceIdService } from '../service/end-device-id.service';
import { EndDeviceIdRequestData } from '../interfaces/end-device-id-request-data';
import { EndDeviceId } from '../interfaces/end-device-id';

@Component({
  selector: 'app-name-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './name-generator.component.html',
  styleUrl: './name-generator.component.scss',
})
export class NameGeneratorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public deviceName: string = '';

  myForm!: FormGroup;
  customersSub$!: Subscription;
  countriesSub$!: Subscription;
  citiesSub$!: Subscription;
  driversSub$!: Subscription;
  typesSub$!: Subscription;
  yearsSub$!: Subscription;
  endDeviceIdListSub$!: Subscription;

  customers: any[] = [];
  countries: any[] = [];
  cities: any[] = [];
  drivers: any[] = [];
  types: any[] = [];
  years: any[] = [];
  endDeviceIdList: EndDeviceId[] = [];

  counters: number[] = [10_001];

  constructor(
    private tableService: TabelService,
    private endDeviceIdService: EndDeviceIdService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.handleLoadAllEndDeviceIds();
    this.getCustomers();
    this.getCountries();
    this.getCities();
    this.getDrivers();
    this.getTypes();
    this.getYears();

    this.myForm = new FormGroup({
      customer: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      driver: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  ngAfterViewInit(): void {
    this.handleLoadAllEndDeviceIds();
  }

  getLastCount() {
    const lastCount = this.counters[this.counters.length - 1];
    console.log('lastCount', lastCount);
    return lastCount;
  }

  eraseCounter() {
    let lastCount = this.getLastCount();
    let newCount = lastCount + 1;

    if (!this.counters.includes(newCount)) {
      this.counters.push(newCount);
      console.log('counters', this.counters);
      return newCount;
    } else {
      console.warn('Fehler, nummer schon vorhanden!');
      return null;
    }
  }

  generateName(
    customer: string,
    country: string,
    city: string,
    driver: string,
    type: string,
    year: string
  ): string {
    let newCounter = this.eraseCounter();
    if (newCounter) {
      let newName = `${customer}-${country}-${city}-${driver}-${type}-${year}${newCounter}`;
      return newName;
    } else {
      const error = 'Es konnte kein neuer name erstellt werden!';
      console.warn(error);
      throw new Error(error);
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    let value: EndDeviceIdRequestData = this.myForm.value;

    // API anfragen
    this.endDeviceIdService.checkEndDeviceId(value).subscribe((response) => {
      console.log('Server response', response);

      if (response) {
        this.openEndDeviceIdModal(response);
      } else {
        const error = new Error('Ich mach nix mehr');
        this.openErrorModal(error);
      }
    });

    // form reseten
    this.myForm.reset();
  }

  openEndDeviceIdModal(newEndDeviceId: EndDeviceId): void {
    const modalRef = this.modalService.open(NgbdEndDeviceIdModalContent);
    modalRef.componentInstance.endDeviceIdData = newEndDeviceId;
  }
  openErrorModal(error: Error): void {
    const modalRef = this.modalService.open(NgbdErrorModalContent);
    modalRef.componentInstance.errMessage = error;
  }

  getCustomers() {
    this.customersSub$ = this.tableService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  getCountries() {
    this.countriesSub$ = this.tableService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }

  getCities() {
    this.citiesSub$ = this.tableService
      .getCities()
      .subscribe((cities) => (this.cities = cities));
  }

  getDrivers() {
    this.driversSub$ = this.tableService
      .getDrivers()
      .subscribe((drivers) => (this.drivers = drivers));
  }

  getTypes() {
    this.typesSub$ = this.tableService
      .getTypes()
      .subscribe((types) => (this.types = types));
  }

  getYears() {
    this.yearsSub$ = this.tableService
      .getYears()
      .subscribe((years) => (this.years = years));
  }

  handleLoadAllEndDeviceIds() {
    this.endDeviceIdService.getAllEndDeviceIds().subscribe((result) => {
      this.endDeviceIdList = result;
      console.log('AllIds', result);
    });
  }

  handleDeleteEndDeviceId(_id: string) {
    console.log(`Later it will be delete the EndDeviceId: ${_id}`);
  }

  ngOnDestroy(): void {
    if (
      this.customersSub$ ||
      this.countriesSub$ ||
      this.citiesSub$ ||
      this.driversSub$ ||
      this.typesSub$ ||
      this.yearsSub$ ||
      this.endDeviceIdListSub$
    ) {
      this.countriesSub$.unsubscribe();
      this.customersSub$.unsubscribe();
      this.citiesSub$.unsubscribe();
      this.driversSub$.unsubscribe();
      this.typesSub$.unsubscribe();
      this.yearsSub$.unsubscribe();
      this.endDeviceIdListSub$.unsubscribe();
    }
  }
}
