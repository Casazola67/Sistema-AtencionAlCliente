import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('Profile Module || LoginComponent', () => {

  let service: AuthService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            AngularFireModule.initializeApp(environment.firebase),
          ],
          providers:[AngularFireAuth],
          declarations: [
            LoginComponent
          ],
        }).compileComponents();
      });


    it('Debe existir el Login Component', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    
    it('Debe retornar formulario inválido | Solo ingresó correo electrónico', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance;
        const email = app.email
        email.includes('prueba@gmail.com')
        expect(app.validator).toBeFalse();

    });

    it('Debe retornar formulario inválido | Solo ingresó contraseña', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance;
        const password = app.password
        password.includes('prueba')
        expect(app.validator).toBeFalse();
    });

})