import { environment } from './../environments/environment';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {
  enableTracing: !environment.production
});

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    HomeModule,
    rootRouting,
    AuthModule,
    SettingsModule,
    ProfileModule,
    ArticleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
