import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRestoComponent } from '../../_Dashboard_Resto/add-resto/add-resto.component';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DialogService],
})
export class NavbarComponent {
  /*************** change_theme ************** */
  ref: DynamicDialogRef | undefined;
  isBrightTheme = false;
  search: string = '';
  isAuth: boolean = false;
  isOwner: boolean = false;

  constructor(
    private dialogService: DialogService,
    private UsersService: UserService
  ) {}

  ngOnInit(): void {
    // Check the theme
    this.isBrightTheme = localStorage.getItem('mode') === 'light-theme';
    this.UsersService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    this.UsersService.isOwner$.subscribe((isOwner) => {
      this.isOwner = isOwner;
    });
  }
  change_theme(): void {
    this.isBrightTheme = !this.isBrightTheme;
    const body = document.body;
    if (this.isBrightTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
  openAddResto() {
    this.ref = this.dialogService.open(AddRestoComponent, {
      showHeader: false,
      closable: true,
      dismissableMask: true,
      modal: true,
      draggable: false,
      resizable: false,
      styleClass: 'dialogSearch',
      width: '700px',
      height: '600px',
      contentStyle: { overflow: 'auto' },
    });
    console.log(this.ref);
    this.ref.onClose.subscribe(() => {});
  }
  logout() {
    this.UsersService.logout();
  }
}
