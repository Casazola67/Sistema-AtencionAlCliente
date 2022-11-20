import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminOrganizationComponent } from './admin-organization.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { OrganizationService } from  '../../../core/services/organization.service';
import { Organization } from 'src/app/core/models/organization.model';
import { Schedule } from 'src/app/core/models/schedule.model';

describe('Organization Module || AdminOrganization Component', () => {

  let service: OrganizationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            AngularFireModule.initializeApp(environment.firebase),

          ],
          declarations: [
            AdminOrganizationComponent
          ],
        }).compileComponents();
        service = TestBed.inject(OrganizationService);
    });

    it('Debe existir el AdminOrganization Component', () => {
        const fixture = TestBed.createComponent(AdminOrganizationComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    
    it("Debe existir el Organization Service", () => {
      expect(service).toBeTruthy();
    });

    it('Debe retornar formulario inválido | No ingresó el nombre de la organización', () => {
      const fixture = TestBed.createComponent(AdminOrganizationComponent);
      const app = fixture.componentInstance;
      const name = app.organization.name
      name.includes('Prueba')
      expect(app.validator).toBeFalse();
    });

    it('Debe retornar formulario inválido | No ingresó el UID del administrador', () => {
      const fixture = TestBed.createComponent(AdminOrganizationComponent);
      const app = fixture.componentInstance;
      const adminUID = app.organization.adminUID
      adminUID.includes('123456789')
      expect(app.validator).toBeFalse();
    });

    it('Debe retornar formulario inválido | Ingresó un UID inválido', () => {
      const fixture = TestBed.createComponent(AdminOrganizationComponent);
      const app = fixture.componentInstance;
      const adminUID = app.organization.adminUID
      adminUID.includes('123456789')
      expect(app.validID).toBeFalse();
    });

    /*
    it('Crea una organización', () => {

      const organizationAux: Organization = {
        adminUID: 'FGmQRQTNqcSP7XBWWN95pQjFwLF3',
        name: 'Prueba',
        schedule: [
          {day: 1, open_half: true, from_half: '09:00', to_half:'19:00', open_full: true, from_full: '', to_full:''},
          {day: 2, open_half: true, from_half: '09:00', to_half: '19:00', open_full: true, from_full: '', to_full:''},
          {day: 3, open_half: true, from_half: '09:00', to_half: '19:00', open_full: true, from_full: '', to_full:''},
          {day: 4, open_half: true, from_half: '09:00', to_half: '19:00', open_full: true, from_full: '', to_full:''},
          {day: 5, open_half: true, from_half: '09:00', to_half: '19:00', open_full: true, from_full: '', to_full:''},
          {day: 6, open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
          {day: 0, open_half: false, from_half: '', to_half: '', open_full: false, from_full: '', to_full:''},
        ],
  
        nit: '123465789',
        logoBase64: 'https://revistaenraizada.com/wp-content/uploads/2021/08/images-1.jpg',
        phone: '123465789',
        email: 'prueba@gmail.com',
  
        state: 'Prueba',
        city: 'Prueba',
        adress: 'Prueba',
        latitude: '123456798',
        longitude: '123456789'
        
      }

      const result = service.createOrganization(organizationAux);

    });
    */

})