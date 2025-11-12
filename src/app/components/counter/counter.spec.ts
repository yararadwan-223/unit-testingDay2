import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('counter component: ', () => {
  let fixture: ComponentFixture<Counter>, component: Counter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Counter],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render counter=0 in template', () => {
    let p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain(0);
  });
  it('should render counter after clicking btns', () => {
    //access btn
    let btnInc = fixture.debugElement.query(By.css('#inc'));
    //click
    btnInc.triggerEventHandler('click');
    btnInc.triggerEventHandler('click');
    btnInc.triggerEventHandler('click');
    //assert
    expect(component.counter).toBe(3);
    fixture.detectChanges()
    let p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain(3)
  });
});
