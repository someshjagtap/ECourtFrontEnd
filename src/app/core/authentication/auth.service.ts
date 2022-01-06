import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token } from './interface';
import { guest } from './user';
import { environment } from '../../../environments/environment';
import { UserDTO, UserAccessDTO } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private SERVER_API_URL = environment.courtServiceUrl;

  private user$ = new BehaviorSubject<UserDTO>(guest);

  private userReq$ = this.http.get<UserDTO>(this.SERVER_API_URL + '/account');

  constructor(private http: HttpClient, private token: TokenService) {
    // this.token
    //   .refresh()
    //   .pipe(switchMap(() => this.refresh()))
    //   .subscribe();
  }

  setup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token
        .change()
        .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
        .subscribe(user => {
          this.user$.next(Object.assign({}, guest, user));
          resolve(null);
        });
    });
  }

  check() {
    return this.token.valid();
  }

  login(url: string,  email: string, password: string, rememberMe = false) {
    // return this.http
    //   .post<Token>('/auth/login', { email, password, remember_me: rememberMe })
    //   .pipe(
    //     tap(token => this.token.set(token)),
    //     map(() => this.check())
    //   );
    return this.http
      .post<Token>(this.SERVER_API_URL + url, {
        // captacha:captacha,
        username: email,
        password,
        rememberMe: rememberMe,
        // otpNumber,
      })
      .pipe(
        tap(id_token => this.token.createAndSet(id_token)),
        map(() => this.check())
      );
  }

  refresh() {
    return this.http.post<Token>('/auth/refresh', {}).pipe(
      tap(token => this.token.set(token, true)),
      map(() => this.check())
    );
    // this.token.refreshTime();
  }

  logout() {
    // return this.http.post('/auth/logout', {}).pipe(
    //   tap(() => this.token.clear()),
    //   map(() => !this.check())
    // );
    // this.user$.next(guest);
    return of({}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  hasAnyAuthority(requestedAuthorities: string[]): boolean {
    let user: UserDTO = this.user$.getValue();
    if (!user.authorities) {
      return false;
    }
    for (const item of requestedAuthorities) {
      if (user.authorities.includes(item)) {
        return true;
      }
    }
    return false;
  }

  getUserDetails(): UserDTO {
    let user: UserDTO = this.user$.getValue();
    return user;
  }

  hasAccess(level: string, id): boolean {
    let user: UserDTO = this.user$.getValue();
    let access: UserAccessDTO[] = user.userAccess.filter(
      access => access.accessId === id && access.level === level
    );
    return access && access.length > 0;
  }

  hasAnyAuthoritySub(requestedAuthorities: string[]): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.user$.subscribe(user => {
        if (!user.authorities) {
          resolve(false);
          return;
        }
        for (const item of requestedAuthorities) {
          if (user.authorities.includes(item)) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      });
    });
  }
}
