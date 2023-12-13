import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  /*************** change_theme ************** */
  isBrightTheme = false;

  ngOnInit(): void {
    // Check the theme
    this.isBrightTheme = localStorage.getItem('mode') === 'light-theme';
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
}
