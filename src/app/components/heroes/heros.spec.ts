import { ChangeDetectorRef, Component, Input, provideZonelessChangeDetection } from '@angular/core';
import { HeroService } from '../../services/hero-service/hero.service';
import { Heroes } from './heroes';
import { of } from 'rxjs';
import { Ihero } from '../../models/ihero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from '../hero/hero';
import { By } from '@angular/platform-browser';

@Component({
  selector:"app-hero",
  template:""
})
class HeroMock{
  @Input() hero!: Ihero;
}

describe('heroes component', () => {
  let heroServiceMock: jasmine.SpyObj<HeroService>,
    cdrMock: jasmine.SpyObj<ChangeDetectorRef>;
  let component: Heroes;
  let heroesMock: Ihero[];
  let fixture:ComponentFixture<Heroes>
  beforeEach(() => {
    heroesMock = [
      { id: 100, name: 'super man', strength: 20 },
      { id: 101, name: 'bat man', strength: 12 },
    ];
    heroServiceMock = jasmine.createSpyObj([ 'getHeroes', 'addHero','deleteHero' ]); //mocking (fake)
    heroServiceMock.getHeroes.and.returnValue(of(heroesMock));
    cdrMock = jasmine.createSpyObj(['detectChanges']);

    TestBed.configureTestingModule({
      imports:[Heroes,Hero],
      providers:[
        provideZonelessChangeDetection()
      ]
    }).overrideComponent(Heroes,{
      set:{
        // imports:[HeroMock],
        providers:[
          {provide:HeroService,useValue:heroServiceMock},
          {provide:ChangeDetectorRef,useValue:cdrMock},
        ]
      }
    })
    fixture=TestBed.createComponent(Heroes)
   component =fixture.componentInstance
  });
  it('after calling ngOninit, heroes array should be set and render it in template', () => {
    component.ngOnInit();
    expect(component.heroes).toHaveSize(heroesMock.length);
    expect(heroServiceMock.getHeroes).toHaveBeenCalled();
    //access li
    let liTags= fixture.debugElement.queryAll(By.css("li"))
    //assert 
    expect(liTags).toHaveSize(2)
    fixture.detectChanges()
    let children=fixture.debugElement.queryAll(By.directive(Hero))
    expect(children).toHaveSize(2)
    expect(children[0].componentInstance.hero.name).toBe(heroesMock[0].name)
  });
});
