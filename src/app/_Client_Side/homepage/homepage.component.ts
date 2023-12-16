import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DialogService],

})
export class HomepageComponent {

  items: MenuItem[] | undefined;
  

}
