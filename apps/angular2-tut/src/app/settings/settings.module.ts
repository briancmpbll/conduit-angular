import { AuthGuard } from './../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';

const settingsRouting = RouterModule.forChild([
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
