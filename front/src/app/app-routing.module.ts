import { ListAnomaliesComponent } from './components/list-anomalies/list-anomalies.component';
import { CreateAnomalyComponent } from './components/create-anomaly/create-anomaly';
import { TicketComponent } from './components/ticket/ticket.component';
import { RoleGuard } from './security/role.guard';
import { ListResourcesComponent } from './components/list-resources/list-resources.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ListUsersComponent, canActivate: [RoleGuard] },
  
  { path: 'resources', 
    canActivate: [RoleGuard], 
    children: [
      { path: '', component: ListResourcesComponent },
      { path: ':publicId/ticket', component: TicketComponent },
    ]
  },
  { path: 'resources/:publicId/anomaly', component: CreateAnomalyComponent },
  { path: 'anomalies', component: ListAnomaliesComponent, canActivate: [RoleGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}