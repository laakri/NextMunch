import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error-interceptor';

/**********  Prime NG *************** */

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { BadgeModule } from 'primeng/badge';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';

/*************************   Components   *********************** */

import { SignUpComponent } from './_Auth/sign-up/sign-up.component';
import { LoginComponent } from './_Auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './_Client_Side/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './_Client_Side/about-us/about-us.component';
import { ContactUsComponent } from './_Client_Side/contact-us/contact-us.component';
import { AuthComponent } from './_Auth/auth/auth.component';
import { PageRestoComponent } from './_Client_Side/page-resto/page-resto.component';
import { AddRestoComponent } from './_Dashboard_Resto/add-resto/add-resto.component';
import { RestaurantsComponent } from './_Client_Side/restaurants/restaurants.component';
import { SidebarComponent } from './_Dashboard_Admin/sidebar/sidebar.component';
import { ListAddCategoryComponent } from './_Dashboard_Admin/list-add-category/list-add-category.component';
import { ListUserComponent } from './_Dashboard_Admin/list-user/list-user.component';
import { ListRestaurantComponent } from './_Dashboard_Admin/list-restaurant/list-restaurant.component';
import { AddPlatComponent } from './_Dashboard_Resto/add-plat/add-plat.component';
import { RestoSettingsComponent } from './_Dashboard_Resto/resto-settings/resto-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    SignUpComponent,
    LoginComponent,
    NavbarComponent,
    HomepageComponent,
    FooterComponent,
    AuthComponent,
    PageRestoComponent,
    AddRestoComponent,
    RestaurantsComponent,
    SidebarComponent,
    ListAddCategoryComponent,
    ListUserComponent,
    ListRestaurantComponent,
    AddPlatComponent,
    RestoSettingsComponent,
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    DropdownModule,
    PanelModule,
    MenuModule,
    TieredMenuModule,
    ChipModule,
    CheckboxModule,
    MessagesModule,
    ToastModule,
    SidebarModule,
    SlideMenuModule,
    ReactiveFormsModule,
    BadgeModule,
    FileUploadModule,
    TableModule,
    DropdownModule,
    ListboxModule,
    MultiSelectModule,
    CarouselModule,
    TabViewModule,
    CardModule,
    DividerModule,
    PaginatorModule,
    ProgressSpinnerModule,
    GalleriaModule,
    ImageModule,
    InputNumberModule,
    ConfirmDialogModule,
    RadioButtonModule,
    InputMaskModule,
    ConfirmPopupModule,
    InputSwitchModule,
    ChipsModule,
    RatingModule,
    InputTextareaModule,
    SliderModule,
    CalendarModule,
    MenubarModule,
    TimelineModule,
    AccordionModule,
    DynamicDialogModule,
    DialogModule,
    SkeletonModule,
    EditorModule,
    ToggleButtonModule,
    TabMenuModule,
    StepsModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
