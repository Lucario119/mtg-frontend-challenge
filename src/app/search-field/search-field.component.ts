import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFieldComponent implements OnInit {
  setName: string | undefined;
  setBlock: string | undefined;
  public optionBlocks: string[] = [
  "Amonkhet" ,"Ixalan","Zendikar","Ravnica","Onslaught"
  ]

  @Output('searchData') searchData = new EventEmitter();
  selectedBlock: any = 'Selecione um bloco';
  searchForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder
  )  { }

  onHandleSearch(){
    this.searchData.emit({
      setName: this.setName?.toLowerCase(),
      blockName: this.setBlock
    })
  }

  onSelectBlock($event: string){
   this.setBlock = $event
  }
  onSetNameChange($event: any) {

    this.setName = $event.target.value
  }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
         blockSelector: ['', Validators.required]

    });
}
}
