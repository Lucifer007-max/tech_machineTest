import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:String = environment.backendUrl;
  movieUrl:String = environment.movieUrl;
  Token:String = environment.movieToken;
  weatherBaseUrl:String = environment.weatherUrl;
  weatherToken:String = environment.weatherKey;

  constructor(private httpClient : HttpClient)  { }


  ErrorSnackbar(message:any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'error' ,
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton:false,
      showConfirmButton:false
    })
  }
  SuccessSnackbar(message:any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 5000,
      icon: 'success' ,
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton:false,
      showConfirmButton:false
    })
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('id');
    return !!token;
  }

  getSavedLoginDetails(): any {
    const savedDetails = localStorage.getItem('login');
    return savedDetails ? JSON.parse(savedDetails) : null;
  }


  saveLoginDetails(details: any): void {
    localStorage.setItem('login', JSON.stringify(details));
  }


  auth(payload: any): Observable<any> {
    const formData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);

      }
    }
    return this.httpClient.post(this.baseUrl.toString(), formData)
      .pipe(catchError(this.handleError));
  }


  movieList(): Observable<Movie> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.Token}`,
      accept: 'application/json',
    });
    return this.httpClient.get<Movie>(this.movieUrl.toString() , { headers });
  }


  getRecentHumidity(city: string): Observable<any> {
    const url = `${this.weatherBaseUrl}?key=${this.weatherToken}&q=${city}&days=1`;
    return this.httpClient.get(url);
  }


  handleError(handleError: any): any {
    throw new Error(handleError.error.message);
  }


  



}
