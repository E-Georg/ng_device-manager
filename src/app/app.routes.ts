import { Routes } from '@angular/router';
import { DevicelistComponent } from './device-list/device-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'list', component: DevicelistComponent },
    { path: 'create', component: DeviceCreateComponent },
    { path: 'edit', component: DeviceEditComponent },
    { path: 'edit:sn', component: DeviceEditComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent }
];
