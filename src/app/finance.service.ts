import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }


  getFinanceHistory(symbol: string){
    const headers = new HttpHeaders().append('x-rapidapi-key','357cb1aa26msh83211eea50ef390p1024cejsn57eb60750472')
                    .append('x-rapidapi-host','apidojo-yahoo-finance-v1.p.rapidapi.com')
                    .append('useQueryString','true')
                    .append('x-rapidapi-region','AWS - ap-southeast-1')
     return this.http.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?region=US&symbol='+ symbol , { headers })
  }
}
