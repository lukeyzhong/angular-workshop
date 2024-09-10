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

const startCount = 123;
const newCount = 456;

fdescribe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  function expectCount(count: number): void {
    expectText(fixture, 'count', String(count));
  }

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

  it('shows the start count', () => {
    // expectText(fixture, 'count', String(startCount));
    expectCount(startCount);
  });

  it('emits countChange events on increment', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    click(fixture, 'increment-button');

    // Assert
    expect(actualCount).toEqual(startCount + 1);
  });

  xit('increments the count', () => {
    // Act
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]'),
    );
    incrementButton.triggerEventHandler('click', null);
    // Re-render the Component
    fixture.detectChanges();

    // Assert
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('1');
  });

  xit('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectCount(startCount - 1);
    // expectText(fixture, 'count', '-1');
  });

  xit('resets the count', () => {
    const newCount = '123';

    // Act
    const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
    // Set field value
    resetInputEl.value = newCount;
    // Dispatch input event
    const event = document.createEvent('Event');
    event.initEvent('input', true, false);
    resetInputEl.dispatchEvent(event);

    // Click on reset button
    click(fixture, 'reset-button');
    // Re-render the Component
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', newCount);
  });
});
