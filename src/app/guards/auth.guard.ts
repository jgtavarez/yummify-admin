import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.validateJWT()
            .pipe(
                tap(isAuth => {
                    if (!isAuth) {
                        this.router.navigateByUrl('/auth/login')
                    }
                })
            )
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        return this.authService.validateJWT()
            .pipe(
                tap(isAuth => {
                    if (!isAuth) {
                        this.router.navigateByUrl('/auth/login')
                    }
                })
            )
    }
}