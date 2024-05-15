import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSetComponent } from './card-set/card-set.component';
import { SearchFieldComponent } from './search-field/search-field.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchFieldComponent,
        CardSetComponent,

      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgSelectModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should include app-search-field component', () => {
    const searchFieldElement = fixture.nativeElement.querySelector('app-search-field');
    expect(searchFieldElement).toBeTruthy();
  });

  it('should include app-card-set component', () => {
    const cardSetElement = fixture.nativeElement.querySelector('app-card-set');
    expect(cardSetElement).toBeTruthy();
  });

});
