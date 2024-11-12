import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { importProvidersFrom} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-ev2qgw4if8es6e02.us.auth0.com',
      clientId: 'fctLWlGZ9pYB1hcjdhMu66zb5Wuw7h6j',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)
  ]
})
  .catch((err) => console.error(err));
