import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/_core/guard/auth.guard';
import { NonAuthGuard } from '../app/_core/guard/non-auth.guard';
import { TestComponent } from '../app/components/test/test.component';
import { MainComponent } from '../layout/main/main.component';
import { LoginComponent } from '../page/login/login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';

// new
import { CustomersComponent } from '../app/components/customers/customers.component';
import { TransportTypeComponent } from '../app/components/transport-type/transport-type.component';
import { ServiceTypeComponent } from '../app/components/service-type/service-type.component';
import { PricesComponent } from '../app/components/prices/prices.component';
import { OrdersComponent } from '../app/components/orders/orders.component';
import { ReportComponent } from '../app/components/report/report.component';
import { LogisticClientComponent } from '../page/logistic-client/logistic-client.component';
import { ClientHomeComponent } from '../page/logistic-client/client-home/client-home.component';
import { CustomerNewOrderComponent } from '../page/logistic-client/customer-new-order/customer-new-order.component';
import { OrderCustomerComponent } from '../page/logistic-client/order-customer/order-customer.component';
import { PricingComponent } from '../page/logistic-client/pricing/pricing.component';
import { LoginCustomerComponent } from '../app/components/login-customer/login-customer.component';
import { RegisterCustomerComponent } from '../app/components/register-customer/register-customer.component';
import { OrderLookupComponent } from '../page/logistic-client/order-lookup/order-lookup.component';
import { SearchComponent } from '../page/logistic-client/search/search.component';
import { ManagerOrderComponent } from '../page/logistic-client/manager-order/manager-order.component';
import { ShipperSelectionComponent } from '../page/logistic-client/shipper-selection/shipper-selection.component';
import { ShipperOrderComponent } from '../page/logistic-client/shipper-order/shipper-order.component';
const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'customer',
        component: CustomersComponent,
      },
      {
        path: 'transport-type',
        component: TransportTypeComponent,
      },
      {
        path: 'service-type',
        component: ServiceTypeComponent,
      },
      {
        path: 'price',
        component: PricesComponent,
      },
      {
        path: 'order',
        component: OrdersComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [NonAuthGuard],
  // },
  // {
  //   path: '',
  //   component: LogisticClientComponent,
  //   canActivate: [NonAuthGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       component: ClientHomeComponent,
  //     },
  //     {
  //       path: 'pricing',
  //       component: PricingComponent,
  //     },
  //     {
  //       path: 'login-customer',
  //       component: LoginCustomerComponent,
  //     },
  //     {
  //       path: 'register-customer',
  //       component: RegisterCustomerComponent,
  //     },
  //     {
  //       path: 'customer-order',
  //       component: OrderCustomerComponent,
  //     },
  //     {
  //       path: 'customer-new-order',
  //       component: CustomerNewOrderComponent,
  //     },
  //     {
  //       path: 'order-lookup',
  //       component: OrderLookupComponent,
  //     },
  //     {
  //       path: 'seach',
  //       component : SearchComponent,
  //     },
  //     {
  //       path: 'manager-order',
  //       component : ManagerOrderComponent,
  //     },
  //     {
  //       path : 'shipper-selection',
  //       component  :ShipperSelectionComponent,
  //     },
  //     {
  //       path : 'shipper-order',
  //       component : ShipperOrderComponent,
  //     }
  //   ]
  // },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
