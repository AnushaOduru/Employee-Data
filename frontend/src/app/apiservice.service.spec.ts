import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiserviceService } from './apiservice.service';
import { ReactiveFormsModule } from '@angular/forms';
const apiUrl ='http://localhost:3000/emp';
describe('ApiserviceService', () => {
  let service: ApiserviceService;
  let httpTestingController: HttpTestingController;
 
  const mockData = {
    "status": "success", 
    "data": [{
      "name": "Jane", 
      "city": "Doe", 
      "salary": 3004,
      "Company": "TCS",
      "gender": "female"
    },
    {
      "name": "Jay", 
      "city": "city", 
      "salary": 3094,
      "Company": "TCS",
      "gender": "male"
     }]
    };
  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],providers: [ 
        ApiserviceService, 
        { provide: 'url', 
          useValue: 'apiurl'
        }]
    });
    service = TestBed.inject(ApiserviceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => { 
    httpTestingController.verify(); 
   }); 


   it('getAll should make a GET HTTP request and return all data items', () => {
    service.getAllData().subscribe(res => {
      expect(res).toEqual(mockData); 
      expect(res.data.length).toBe(2); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/emp');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });
   

   it('getById should make a GET HTTP request with id appended to end of url', () => {
    service.getSingleData(1).subscribe(res => {
      expect(res).toEqual(mockData); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/emp/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });

   it('delete should make a DELETE HTTP request with id appended to end of url', () => {
    service.deleteDate(1).subscribe(res => {
      expect(res).toBe(1); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/emp/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify();
   });

   it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = { firstName: "updatedName" };
    service.updateData(updateObj, 1).subscribe(res => {
      expect(res.firstName).toBe('updatedName'); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/emp/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
   });

   it('create should make a POST HTTP request with resource as body', () => {
    const createObj = { name: "updatedName" };
    service.createData(createObj).subscribe(res => {
      expect(res.name).toBe('updatedName'); 
     }); 
    const req = httpTestingController.expectOne(apiUrl, 'http://localhost:3000/emp');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestingController.verify();
    });
   });

    // it('should be created', () => {
    // const service: ApiserviceService = TestBed.get(ApiserviceService);
    //  expect(service).toBeTruthy();
    // });
