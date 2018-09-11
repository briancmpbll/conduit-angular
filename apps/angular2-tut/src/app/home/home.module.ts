import { HomeAuthResolverGuard } from './home-auth-resolver.guard';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolverGuard
    }
  },
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [HomeComponent],
  providers: [HomeAuthResolverGuard]
})
export class HomeModule { }
