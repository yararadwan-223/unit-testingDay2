import { TestBed } from '@angular/core/testing';
import { MessageService } from '../message/message.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('hero service:', () => {
  let messageServiceMock: MessageService;
  let httpTesting:HttpTestingController
  let service:HeroService
  let heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj(['add']);
    //1
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:MessageService,useValue:messageServiceMock},
        provideZonelessChangeDetection()
      ],
    });
    //2
    httpTesting = TestBed.inject(HttpTestingController);
    //3
    service=TestBed.inject(HeroService)
  });
  it('getHero: should send request correctly then put response in observable', () => {
    
    
    service.getHero(10).subscribe({next:(data)=>{
      expect(data.name).toBe("bat man")
    }})

    let testReq=httpTesting.expectOne(heroesUrl+'/10')
    expect(testReq.request.method).toBe("GET")

    testReq.flush({id:10,name:"bat man",strength:20})
  });
  afterEach(() => {
  // Verify that none of the tests make any extra HTTP requests.
  httpTesting.verify();
});
});
