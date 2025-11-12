import { HeroServiceForLab } from './hero.lab.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Ihero } from '../../models/ihero';

describe('HeroServiceForLab', () => {
  let service: HeroServiceForLab;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    service = new HeroServiceForLab(httpClientMock);
  });

  it('should get heroes list', () => {
    const mockHeroes: Ihero[] = [
      { id: 1, name: 'Hero One',strength:10 },
      { id: 2, name: 'Hero Two' ,strength:15}
    ];
    httpClientMock.get.and.returnValue(of(mockHeroes));

    service.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes[0].name).toBe('Hero One');
    });
  });

  it('should update hero', () => {
    const heroToUpdate: Ihero = { id: 1, name: 'Updated Hero', strength:20 };
    httpClientMock.put.and.returnValue(of(heroToUpdate));

    service.updateHero(heroToUpdate).subscribe(result => {
      expect(httpClientMock.put).toHaveBeenCalledWith(
        'http://localhost:3000/heroes',
        heroToUpdate,
        jasmine.any(Object)
      );
    });
  });
});
