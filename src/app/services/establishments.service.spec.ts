import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { EstablishmentsService } from './establishments.service';

describe('EstablishmentsService', () => {
  let service: EstablishmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null', () => {
    expect(service.getByName("Hampshire")).toBe(null);
  })

  it('should return info about \'Hampshire Golfhotel - Waterland\'', () => {
    let establishmentInfo = service.getByName("hampshiregolfhotel-waterland"); 
    expect(establishmentInfo).toBeTruthy();
    if (establishmentInfo)
      expect(establishmentInfo.title).toBe('Hampshire Golfhotel - Waterland');
  })

  it('should return emprty list', () => {
    let filterForm = new FormGroup(
      {
        name: new FormControl(), 
        cities: new FormControl(),
        postcode: new FormControl(),
        startyear: new FormControl(),
      },
    );
    filterForm.patchValue({name: 'test'});
    let establishmentList = service.filterEstablishmnets(
      filterForm.value.name,
      filterForm.value.cities,
      filterForm.value.postcode,
      filterForm.value.startyear
    ); 
    expect(establishmentList).toEqual([]);
  })

  it('should return list within one value', () => {
    let filterForm = new FormGroup(
      {
        name: new FormControl(), 
        cities: new FormControl(),
        postcode: new FormControl(),
        startyear: new FormControl(),
      },
    );
    filterForm.patchValue({name: 'Hampshire Golfhotel'});
    let establishmentList = service.filterEstablishmnets(
      filterForm.value.name,
      filterForm.value.cities,
      filterForm.value.postcode,
      filterForm.value.startyear
    ); 
    expect(establishmentList).toBeTruthy();
    expect(establishmentList.length).toBe(1);
    expect(establishmentList[0].title).toBe('Hampshire Golfhotel - Waterland');
  })

  it('should return list within 28 values', () => {
    let filterForm = new FormGroup(
      {
        name: new FormControl(), 
        cities: new FormControl(),
        postcode: new FormControl(),
        startyear: new FormControl(),
      },
    );
    filterForm.patchValue({startyear: 2011});
    let establishmentList = service.filterEstablishmnets(
      filterForm.value.name,
      filterForm.value.cities,
      filterForm.value.postcode,
      filterForm.value.startyear
    ); 
    expect(establishmentList).toBeTruthy();
    expect(establishmentList.length).toBe(28);
  })

  it('should return list within one value', () => {
    let filterForm = new FormGroup(
      {
        name: new FormControl(), 
        cities: new FormControl(),
        postcode: new FormControl(),
        startyear: new FormControl(),
      },
    );
    filterForm.patchValue({
      name: 'house',
      cities: ['MONNICKENDAM', 'AMSTERDAM', 'AALSMEER'],
      postcode: '1316 vv',
      startyear: 2011
    });
    let establishmentList = service.filterEstablishmnets(
      filterForm.value.name,
      filterForm.value.cities,
      filterForm.value.postcode,
      filterForm.value.startyear
    ); 
    expect(establishmentList).toBeTruthy();
    expect(establishmentList.length).toBe(1);
    expect(establishmentList[0].title).toBe('Restaurant BoatHouse');
  })

});
