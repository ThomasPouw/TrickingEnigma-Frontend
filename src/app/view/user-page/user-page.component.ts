import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{

  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {
    }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    if(this.autosize != undefined){
      //this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }
  }
}
