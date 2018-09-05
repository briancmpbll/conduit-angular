import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NoAuthGuard } from '../core/guards/no-auth.guard';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
