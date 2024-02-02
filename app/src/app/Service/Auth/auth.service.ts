import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    // console.log(token);
    this.cookieService.set(this.tokenKey, token);
    // console.log("Cookie set. Value:", this.cookieService.get(this.tokenKey));
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }


  clear(): void {
    this.cookieService.delete(this.tokenKey);
  }

  getUserTypeFromToken(): string | null {
    const token = this.getToken();
    // console.log(token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      // console.log(decodedToken.userType);
      return decodedToken.userType || null;
    }
    return null;
  }

  getIdFromToken(): string | null {
    const token = this.getToken();
    // console.log(token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      // console.log(decodedToken.id);
      return decodedToken.id || null;
    }
    return null;
  }
}
