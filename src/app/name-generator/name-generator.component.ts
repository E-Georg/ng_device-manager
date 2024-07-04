import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TabelService } from '../service/tabel.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-name-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  customers: any[] = [];
  countries: any[] = [];
  cities: any[] = [];
  drivers: any[] = [];
  types: any[] = [];
  years: any[] = [];

  counters: number[] = [10_000];

  constructor(private tableService: TabelService) {}

  ngOnInit(): void {
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
    this.deviceName;
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
  ) {
    let newCounter = this.eraseCounter();
    if (newCounter) {
      let newName = `${customer}-${country}-${city}-${driver}-${type}-${year}${newCounter}`;
      return newName;
    } else {
      console.warn('Es konnte kein neuer name erstellt werden!');
      return null;
    }
  }

  renderName(name: string) {
    this.deviceName = name;
  }

  onSubmit() {
    // valide?
    if (this.myForm.invalid) {
      return;
    }
    let value = this.myForm.value;
    console.log('myFrom: ', this.myForm.value);

    // name generieren
    let name = this.generateName(
      value.customer,
      value.country,
      value.city,
      value.driver,
      value.type,
      value.year
    );

    console.log('name: ', name);
    if (name) {
      this.renderName(name);
    }
    // name speichern

    // form reseten
    this.myForm.reset();
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

  ngOnDestroy(): void {
    if (
      this.customersSub$ ||
      this.countriesSub$ ||
      this.citiesSub$ ||
      this.driversSub$ ||
      this.typesSub$ ||
      this.yearsSub$
    ) {
      this.countriesSub$.unsubscribe();
      this.customersSub$.unsubscribe();
      this.citiesSub$.unsubscribe();
      this.driversSub$.unsubscribe();
      this.typesSub$.unsubscribe();
      this.yearsSub$.unsubscribe();
    }
  }
}
