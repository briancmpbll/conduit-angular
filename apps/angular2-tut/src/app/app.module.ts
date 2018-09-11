import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
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
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initialState as appInitialState, appReducer } from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

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
    NxModule.forRoot(),
    StoreModule.forRoot(
      {
        app: appReducer,
        router: routerReducer
      },
      {
        initialState : { app : appInitialState },
        metaReducers : !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
