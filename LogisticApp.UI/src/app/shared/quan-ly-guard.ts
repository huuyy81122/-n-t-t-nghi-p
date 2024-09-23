import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class QuanLyGuard implements CanActivate {
	constructor(
		private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (window.localStorage.getItem("currentUser") && window.localStorage.getItem("user_type") === '3') {
			return true;
		}
		else{
			this.router.navigateByUrl("login");
			return false;
		}
	}
}
