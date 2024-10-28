import { JwtPayload, jwtDecode } from 'jwt-decode';


class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
    // TODO: return the decoded token
  }

  loggedIn() {
    const token = this.getToken();
    return token;
    
    // TODO: return a value that indicates if the user is logged in
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
      if (decoded.exp) {
        return decoded.exp < Date.now() / 1000;
      }
      return false;
    } catch (error) {
      return true; // If an error occurs while decoding, assume the token is expired or invalid
    }
    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string { 
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;

    // TODO: return the token
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
   

    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  }
}

export default new AuthService();
