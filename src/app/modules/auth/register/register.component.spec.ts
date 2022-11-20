import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, setPersistence, browserSessionPersistence } from "firebase/auth";
///// OTHERS /////
import { from, Observable, first  } from 'rxjs';

describe('Profile Module || RegisterComponent', () => {

  let service: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            AngularFireModule.initializeApp(environment.firebase),

          ],
          providers: [AngularFireAuth],
          declarations: [
            RegisterComponent
          ],
        }).compileComponents();

      });

    it('Debe existir el Register Component', () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Debe retornar formulario inválido | Solo ingresó correo electrónico', () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.componentInstance;
        const email = app.email
        email.includes('prueba@gmail.com')
        expect(app.validator).toBeFalse();
    });

    it('Debe retornar formulario inválido | Solo ingresó contraseña', () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.componentInstance;
        const password = app.password
        password.includes('prueba')
        expect(app.validator).toBeFalse();
    });

    it('Debe retornar formulario inválido | Solo ingresó nickname', () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.componentInstance;
        const displayName = app.displayName
        displayName.includes('prueba')
        expect(app.validator).toBeFalse();
    });

    it('Debe retornar formulario inválido | Solo ingresó correo y contraseña', () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.componentInstance;
        const email = app.email
        const password = app.password
        email.includes('prueba@gmail.com')
        password.includes('prueba')
        expect(app.validator).toBeFalse();
    });


})