import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCardSetsByNameAndBlock with block and name parameters', () => {
    const searchParams = { blockName: 'amonkhet', setName: 'devastation' };
    const expectedUrl = 'https://api.magicthegathering.io/v1/sets?block=amonkhet&name=devastation';

    service.getCardSetsByNameAndBlock(searchParams).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
  });

  it('should call getCardSetsByNameAndBlock with only block parameter', () => {
    const searchParams = { blockName: 'amonkhet' };
    const expectedUrl = 'https://api.magicthegathering.io/v1/sets?block=amonkhet';

    service.getCardSetsByNameAndBlock(searchParams).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
  });

  it('should call getCardSetsByNameAndBlock with only name parameter', () => {
    const searchParams = { setName: 'devastation' };
    const expectedUrl = 'https://api.magicthegathering.io/v1/sets?name=devastation';

    service.getCardSetsByNameAndBlock(searchParams).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
  });

  it('should call getBoosterBySetId with set code', () => {
    const setCode = 'hou';
    const expectedUrl = `https://api.magicthegathering.io/v1/sets/${setCode}/booster`;

    service.getBoosterBySetId(setCode).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
  });
});
