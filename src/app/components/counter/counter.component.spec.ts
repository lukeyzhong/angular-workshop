import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';

import {
  click,
  expectText,
  findEl,
  setFieldValue,
} from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { start } from 'repl';
import { count } from 'console';

const startCount = 123;
const newCount = 456;

fdescribe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();

    debugElement = fixture.debugElement;
  });

  xit('increments the count', () => {
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]'),
    );
    incrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('1');
  });

  xit('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  xit('reset the count', () => {
    const newCount = '123';
    const resetInputel = findEl(fixture, 'reset-input').nativeElement;
    resetInputel.value = newCount;
    resetInputel.dispatchEvent(new Event('input'));

    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', newCount);
  });

  xit('shows the starCount', () => {
    expectText(fixture, 'count', startCount.toString());
  });

  it('emits countChange', () => {
    let actualNumber: number | undefined;
    component.countChange.subscribe((count) => {
      actualNumber = count;
    });

    click(fixture, 'increment-button');

    expect(actualNumber).toEqual(startCount + 1);
  });
});
