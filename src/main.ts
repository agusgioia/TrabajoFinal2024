import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirestore, getFirestore }from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideFirebaseApp(() => 
        initializeApp({
          apiKey: "AIzaSyAMz7EJ-Ykksdywi1Ro7iRUapPhf8lKACU",
          authDomain: "personalizatuviaje-5dbe6.firebaseapp.com",
          projectId: "personalizatuviaje-5dbe6",
          storageBucket: "personalizatuviaje-5dbe6.firebasestorage.app",
          messagingSenderId: "513056040870",
          appId: "1:513056040870:web:79e05841be59e2ba081167",
          measurementId: "G-GZN1TEX1P8"
        })
      ),
    provideAuth(()=>getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    importProvidersFrom(BrowserAnimationsModule),
    MessageService,
    { provide: 'firestore', useFactory: () => getFirestore()}
  ]
})
  .catch((err) => console.error(err));
