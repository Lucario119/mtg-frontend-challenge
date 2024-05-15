import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardInterface } from 'src/models/Card.interface';
import { CardSetInterface } from 'src/models/CardSet.interface';
import { CardColor } from 'src/models/enums/CardColor.enum';

@Component({
  selector: 'app-card-set',
  templateUrl: './card-set.component.html',
  styleUrls: ['./card-set.component.scss']
})
export class CardSetComponent {
  @Input('cardSets') cardSetsResponse: CardSetInterface[] = [];
  @Input('searchedCards') searchedCardsResponse: CardInterface[] = [];
  @Output('cardSetCode') cardSetCode = new EventEmitter();

 onCardSetSelected(setCode: string){
   this.cardSetCode.emit(setCode.toLowerCase())
 }
 substituteColor(card: any): string {
  let colors: string[] | undefined;

  switch (true) {
    case (card.colors && card.colors.length > 0):
      colors = card.colors;
      break;
    case (card.colorIdentity && card.colorIdentity.length > 0):
      colors = card.colorIdentity;
      break;
    default:
      return '';
  }
  return colors!
  .map(color => {
    if (typeof CardColor[color as keyof typeof CardColor] !== 'undefined') {
      return `<img width=20 height=20 src="${CardColor[color as keyof typeof CardColor]}" alt="${color}">`;
    } else {
      return '';
    }
  })
    .join('');
  }

  toLocaleFormat(date: string){
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
  }
}
