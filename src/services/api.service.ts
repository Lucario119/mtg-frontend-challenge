import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.magicthegathering.io/v1';

  constructor(private http: HttpClient) { }

  getCardSetsByNameAndBlock(searchParams: any): Observable<any> {
    let url = `${this.apiUrl}/sets`;

    switch (true) {
        case !!searchParams.blockName && !!searchParams.setName:
            url += `?block=${searchParams.blockName}&name=${searchParams.setName}`;
            break;
        case !!searchParams.blockName:
            url += `?block=${searchParams.blockName}`;
            break;
        case !!searchParams.setName:
            url += `?name=${searchParams.setName}`;
            break;
        default:
            break;
    }

    return this.http.get<any[]>(url);

  }

  getBoosterBySetId(setCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sets/${setCode}/booster`);
  }

}
