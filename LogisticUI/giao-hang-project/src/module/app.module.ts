import { AppRoutingModule } from '../route/app-routing.module';
import { AppComponent } from '../app/app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../page/login/login.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { MainComponent } from '../layout/main/main.component';
import { AccService } from '../service/acc.service';
import { AppService } from '../service/app.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonNgZorroAntdModule } from './ng-zorro-antd.module';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData, CommonModule } from '@angular/common';
import { HomeComponent } from '../app/components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from '../app/components/test/test.component';
import { BreadCrumbRouterComponent } from '../app/_core/bread-crumb-router/bread-crumb-router.component';
import { CommonFileComponent } from '../app/components/common-file/common-file.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';

/// new 
import { CustomersComponent } from '../app/components/customers/customers.component';
import { TransportTypeComponent } from '../app/components/transport-type/transport-type.component';
import { ServiceTypeComponent } from '../app/components/service-type/service-type.component';
import { PricesComponent } from '../app/components/prices/prices.component';
import { OrdersComponent } from '../app/components/orders/orders.component';
import { CommonStatusComponent } from '../app/components/common-status/common-status.component';
import { ReportComponent } from '../app/components/report/report.component';
import { LogisticClientComponent } from '../page/logistic-client/logistic-client.component';
import { ClientHomeComponent } from '../page/logistic-client/client-home/client-home.component';
import { CustomerNewOrderComponent } from '../page/logistic-client/customer-new-order/customer-new-order.component';
import { OrderCustomerComponent } from '../page/logistic-client/order-customer/order-customer.component';
import { PricingComponent } from '../page/logistic-client/pricing/pricing.component';
import { LoginCustomerComponent } from '../app/components/login-customer/login-customer.component';
import { UtilityModule } from '../app/_core/ultility.module';
import { RegisterCustomerComponent } from '../app/components/register-customer/register-customer.component';
import { ManagerOrderComponent } from '../page/logistic-client/manager-order/manager-order.component';
import { OrderLookupComponent } from '../page/logistic-client/order-lookup/order-lookup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from '../page/logistic-client/search/search.component';
import { ShipperSelectionComponent } from '../page/logistic-client/shipper-selection/shipper-selection.component';
import { ShipperOrderComponent } from '../page/logistic-client/shipper-order/shipper-order.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    MainComponent,
    TestComponent,
    BreadCrumbRouterComponent,
    HomeComponent,
    CommonFileComponent,
    DashboardComponent,
    //// new
    CustomersComponent,
    TransportTypeComponent,
    ServiceTypeComponent,
    PricesComponent,
    OrdersComponent,
    CommonStatusComponent,
    ReportComponent,
    LogisticClientComponent,
    ClientHomeComponent,
    CustomerNewOrderComponent,
    OrderCustomerComponent,
    PricingComponent,
    LoginCustomerComponent,
    RegisterCustomerComponent,
    ManagerOrderComponent,
    OrderLookupComponent,
    ShipperSelectionComponent,
    ShipperOrderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonNgZorroAntdModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    CommonModule,
    UtilityModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AccService,
    AppService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}

export let AppInjector: Injector;
