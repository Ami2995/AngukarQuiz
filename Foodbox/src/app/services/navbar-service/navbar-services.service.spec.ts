import { TestBed } from '@angular/core/testing';

import { NavbarServicesService } from './navbar-services.service';

describe('NavbarServicesService', () => {
  let service: NavbarServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
