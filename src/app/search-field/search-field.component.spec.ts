import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFieldComponent ],
      imports: [ReactiveFormsModule, FormsModule,NgSelectModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchData event when onHandleSearch is called', () => {
    const setName = 'amonkhet';
    const setBlock = 'amonkhet';
    spyOn(component.searchData, 'emit');
    component.setName = setName;
    component.setBlock = setBlock;
    component.onHandleSearch();
    expect(component.searchData.emit).toHaveBeenCalledWith({ setName, blockName: setBlock });
  });

  it('should set setBlock when onSelectBlock is called', () => {
    const block = 'ixalan';
    component.onSelectBlock(block);
    expect(component.setBlock).toEqual(block);
  });

  it('should set setName when onSetNameChange is called', () => {
    const name = 'amonkhet';
    const event = { target: { value: name } };
    component.onSetNameChange(event);
    expect(component.setName).toEqual(name);
  });

  it('should initialize form with blockSelector control', () => {
    expect(component.searchForm.contains('blockSelector')).toBeTruthy();
  });

  it('should mark blockSelector control as required', () => {
    const control = component.searchForm.get('blockSelector');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should emit searchData event when form is submitted with valid data', () => {
    const setName = 'amonkhet';
    const setBlock = undefined;
    spyOn(component.searchData, 'emit');
    fixture.whenStable().then(() => {
      component.searchForm.get('blockSelector').setValue(setBlock);
    });
    component.setName = setName;
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.searchData.emit).toHaveBeenCalledWith({ setName, blockName: setBlock });
  });
});
