import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { DeleteBtnComponent } from './components/delete-btn/delete-btn.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListResourcesComponent } from './components/list-resources/list-resources.component';
import { CustomTooltipComponent } from './components/custom-tooltip/custom-tooltip.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TextCellRendrerComponent } from './components/text-cell-rendrer/text-cell-rendrer.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { QRCodeModule } from 'angular2-qrcode';
import { CreateAnomalyComponent } from './components/create-anomaly/create-anomaly';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ListAnomaliesComponent } from './components/list-anomalies/list-anomalies.component';
import { CloseAnomalyBtnCellRendrerComponent } from './components/close-anomaly-btn-cell-rendrer/close-anomaly-btn-cell-rendrer.component';
import { ResourceInfoCellRendererComponent } from './components/resource-info-cell-renderer/resource-info-cell-renderer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUsersComponent,
    DeleteBtnComponent,
    CreateUserComponent,
    ListResourcesComponent,
    CustomTooltipComponent,
    CreateResourceComponent,
    NavBarComponent,
    TextCellRendrerComponent,
    TicketComponent,
    CreateAnomalyComponent,
    ListAnomaliesComponent,
    CloseAnomalyBtnCellRendrerComponent,
    ResourceInfoCellRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    AgGridModule.withComponents([DeleteBtnComponent]),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    QRCodeModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
