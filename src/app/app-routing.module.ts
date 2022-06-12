import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablishmentDetailComponent } from './establishment-detail/establishment-detail.component';
import { EstablishmentTableComponent } from './establishment-table/establishment-table.component';

const routes: Routes = [
  { path: 'establishment/:name', component: EstablishmentDetailComponent },
  { path: '', component: EstablishmentTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
