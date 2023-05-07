import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { NumberSpinnerComponent } from "./number-spinner.component";
import { NumberSpinnerDirective } from './number-spinner.directive';

@NgModule({
    imports:[ReactiveFormsModule, MatIconModule,  FormsModule, CommonModule, CommonModule],
    declarations:[NumberSpinnerComponent, NumberSpinnerDirective],
    exports:[NumberSpinnerComponent]
})
export class NumberSpinnerModule{

}