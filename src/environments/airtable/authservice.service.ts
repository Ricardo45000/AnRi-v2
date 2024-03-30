import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import bcrypt from 'bcryptjs';



@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private connected: boolean = false;
  public myProfilePicture;
  public myQrCode;
  public myTable;
  public myName;
  public myLogo;
  public id;

  constructor(private http: HttpClient) {
    // Check localStorage for stored authentication state
    this.connected = localStorage.getItem('connected') === 'true';
    // Load other user data from localStorage
    this.loadUserData();
  }

  signIn(username: string, password: string): Observable<boolean> {
    this.id = username;
    const url = 'https://tsy94v6k27.execute-api.eu-west-3.amazonaws.com/prod/connexion';
    const body = JSON.stringify({ username, password });
    

    return this.http.post<any>(url,body).pipe(
      map((response) => {
        const user = response;
        if (user && this.verifyPassword(password, user.fields.Password)) {
          this.connected = true;
          this.myTable = user.fields.Table;
          this.myProfilePicture = user.fields.Image[0].url;
          this.myQrCode = user.fields.QrCode;
          this.myName = user.fields.Name;
          this.myLogo = user.fields.Logo[0].url;
          
          // Save other user data to localStorage
          this.saveUserData();
          return true;
        } else {
          this.connected = false;
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error during sign-in:', error);
        return of(false);
      })
    );
    
  }

  checkConnection() {

    const url = `https://tsy94v6k27.execute-api.eu-west-3.amazonaws.com/prod/informations`;
    const body = JSON.stringify({"username":this.id });
    this.http.post<any>(url, body).pipe(
      catchError(error => {
        console.error('Error fetching profile picture:', error);
        this.connected = false;
        return of(false); 
      }),
      map((response) => {
        const profilePictureUrl = response?.Image[0]?.url || null;
        const myLogo = response?.Logo[0]?.url || null;
        const myQrCode = response.QrCode;
        localStorage.setItem('myProfilePicture', profilePictureUrl);
        this.myProfilePicture = profilePictureUrl;
        localStorage.setItem('myLogo', myLogo);
        this.myLogo = myLogo;
        localStorage.setItem('qrcode', myQrCode);
        this.myQrCode = myQrCode;
        this.connected = true;
        return this.connected;
      })
    ).subscribe();
  
    return this.connected;
  }
  

  disconnect() {
    this.connected = false;
    localStorage.removeItem('connected');
    localStorage.removeItem('id');
    localStorage.removeItem('myTable');
    localStorage.removeItem('myProfilePicture');
    localStorage.removeItem('myName');
    localStorage.removeItem('qrcode');
    localStorage.removeItem('myLogo');

  }

  private saveUserData() {
    localStorage.setItem('connected', 'true');
    localStorage.setItem('id', this.id);
    localStorage.setItem('qrcode', this.myQrCode);
    localStorage.setItem('myTable', this.myTable);
    localStorage.setItem('myProfilePicture', this.myProfilePicture);
    localStorage.setItem('myName', this.myName);
    localStorage.setItem('myLogo', this.myLogo);
  }

  private loadUserData() {
    this.id = localStorage.getItem('id');
    this.myQrCode = localStorage.getItem('qrcode');
    this.myTable = localStorage.getItem('myTable');
    this.myProfilePicture = localStorage.getItem('myProfilePicture');
    this.myName = localStorage.getItem('myName');
    this.myLogo = localStorage.getItem('myLogo');
  }
  

  // Function to verify the entered password against the stored hash
  private verifyPassword(enteredPassword: string, storedHashedPassword: string): boolean {
    return bcrypt.compareSync(enteredPassword, storedHashedPassword);
  }

  /** ---------------------------------------- AMAZON ------------------------------------------ */

  signinwithamazon(username: string): Observable<boolean> {
    this.id = username;
    const url = 'https://tsy94v6k27.execute-api.eu-west-3.amazonaws.com/prod/connexionwithamazon';
    const body = JSON.stringify({ username });
    

    return this.http.post<any>(url,body).pipe(
      map((response) => {
        const user = response;
        this.connected = true;
        this.myTable = user.fields.Table;
        this.myProfilePicture = user.fields.Image[0].url;
        this.myQrCode = user.fields.QrCode;
        this.myName = user.fields.Name;
        this.myLogo = user.fields.Logo[0].url;
        
        // Save other user data to localStorage
        this.saveUserData();
        return true;
      
      }),
      catchError((error) => {
        console.error('Error during sign-in:', error);
        return of(false);
      })
    );
    
  }
  

  


}
