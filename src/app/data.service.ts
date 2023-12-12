import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//     })
// };

interface PostData {
    searchTerm: string;
    colName: string;
  }

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private apiRetrieveUrl = '/api/data/retrieve';
    private apiCreateUrl = '/api/data/create';
    postData!: PostData;
    constructor(private http: HttpClient) { }
    getData(query: string, selected: string): Observable<any> {
        this.postData = {searchTerm: query,colName: selected};
        return this.http.post<any>(this.apiRetrieveUrl, JSON.stringify(this.postData));
    }
    createEntry(query: String): Observable<any> {
        return this.http.post<any>(this.apiCreateUrl, query);
    }
}