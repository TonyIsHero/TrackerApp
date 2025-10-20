import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../Shared/sidebar/sidebar.component";
import { HeaderComponent } from "../../Shared/header/header.component";
import { FooterComponent } from "../../Shared/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
