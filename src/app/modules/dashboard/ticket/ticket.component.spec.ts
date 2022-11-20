import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardModule } from '../dashboard.module';
import { TicketComponent } from './ticket.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthModule } from '../../../modules/auth/auth.module';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from 'src/environments/environment';

describe('TicketComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            DashboardModule,

            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule.enablePersistence(),
            AngularFireStorageModule,
            AngularFireAuthModule,
          ],
          declarations: [
            TicketComponent
          ],
        }).compileComponents();
      });


      it('Debe existir el Ticket Component', () => {
        const fixture = TestBed.createComponent(TicketComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
    
      it('Formulario Bloqueado | El usuario no inicio sesión', () => {
        const fixture = TestBed.createComponent(TicketComponent);
        const app = fixture.componentInstance;
        expect(app.validator).toBeFalse();
      });

      it('Debe retornar formulario inválido | No seleccionó fecha', () => {
        const fixture = TestBed.createComponent(TicketComponent);
        const app = fixture.componentInstance;
        expect(app.validator).toBeFalse();
      });

      it('Debe retornar formulario inválido | No seleccionó hora', () => {
        const fixture = TestBed.createComponent(TicketComponent);
        const app = fixture.componentInstance;
        expect(app.validator).toBeFalse();
      });

})