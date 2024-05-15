import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSetComponent } from './card-set.component';

describe('CardSetComponent', () => {
  let component: CardSetComponent;
  let fixture: ComponentFixture<CardSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardSetCode event when onCardSetSelected is called', () => {
    const setCode = 'xyz';
    spyOn(component.cardSetCode, 'emit');
    component.onCardSetSelected(setCode);
    expect(component.cardSetCode.emit).toHaveBeenCalledWith(setCode.toLowerCase());
  });

  it('should format date to locale format', () => {
    const date = '2024-05-15';
    const formattedDate = component.toLocaleFormat(date);
    expect(formattedDate).toBe('14/05/2024');
  });
});
