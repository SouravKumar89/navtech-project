import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'order-list', loadChildren: () => import('./orders/orders.module').then(m => m.OrderModule)
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
