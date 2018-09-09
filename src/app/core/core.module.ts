import { ArticleService } from './services/article.service';
import { ProfileService } from './services/profile.service';
import { NoAuthGuard } from './guards/no-auth.guard';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './services/api.interceptor';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [FooterComponent, HeaderComponent],
  exports: [FooterComponent, HeaderComponent],
  providers: [
    UserService,
    ProfileService,
    ArticleService,
    JwtService,
    NoAuthGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
