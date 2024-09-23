import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HomeComponent } from "./home.component";
import { OnlineContactComponent } from "./online-contact/online-contact.component";
import { HomeRoutingModule } from "./home.routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { GalleriaModule } from "primeng/galleria";
import { CarouselModule } from "primeng/carousel";

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        CommonModule,
        FormsModule,  
        ButtonModule,
        ImageModule,
        GalleriaModule,
        CarouselModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        OnlineContactComponent
    ],
    providers: [],
})
export class HomeModule { }
