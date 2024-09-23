import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (window.localStorage.getItem("currentUser") && window.localStorage.getItem("user_type") === '2') {
			return true;
		}
		else{
			this.router.navigateByUrl("login");
			return false;
		}
	}
}
