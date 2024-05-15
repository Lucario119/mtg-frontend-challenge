import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { CardInterface } from 'src/models/Card.interface';
import { CardSetInterface } from 'src/models/CardSet.interface';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly apiService: ApiService,

 ) {}
  searchedCardSets: CardSetInterface[]=[]
  searchedCards: CardInterface[]=[]


  onSearchData($event: any) {
    this.searchedCardSets = []

    Swal.fire({
        title: 'Buscando coleções de cartas...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
    });
    this.apiService.getCardSetsByNameAndBlock($event).pipe(

      catchError((e) => {
        Swal.close()
        Swal.fire({
          icon: 'error',
          text: 'Instabilidade na api do Magic'
        })
        return e;
      })
    ).subscribe((response: {sets: CardSetInterface[]}) =>{
      Swal.close()
      this.searchedCardSets = response.sets
    })
  }
  onCardSetClicked($event: string) {
    this.searchedCards= []

    const boosterCreatureCards: CardInterface[] = [];
    Swal.fire({
      title: 'Abrindo seus pacotes de cartas..',
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading()
      },
    });
    const makeApiRequests = () => {
      if (boosterCreatureCards.length >= 29) {
        Swal.close()
        this.searchedCards = boosterCreatureCards
        return;
      }

      this.apiService.getBoosterBySetId($event).pipe(
        catchError((e) => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            text: 'Instabilidade na api do Magic ou pacotes não encontrados'
          })
          return e;
        })
      ).subscribe((responses: {cards: CardInterface[]}) => {
        responses.cards.forEach((response: CardInterface) => {
          if (response.types && response.types.includes("Creature")) {
              boosterCreatureCards.push(response);
          }
        });

        makeApiRequests();
      });
    };

    makeApiRequests();
  }

}
