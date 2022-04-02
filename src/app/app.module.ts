// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AppRouterModule } from './router/app-router.module';

// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { appReducers } from './app.reducer';
import { environment } from '../environments/environment';
import { homeEffects } from '../app/home/store/home.effects';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    AppRouterModule,
    FontAwesomeModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([homeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
