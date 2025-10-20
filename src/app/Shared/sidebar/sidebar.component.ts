import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}
    activeTab: 'fitness' | 'expense' = 'fitness';  // default can be fitness

  // Method to change tab
  navigate(tab: 'fitness' | 'expense') {
    this.activeTab = tab;
    console.log(`Navigating to ${tab} tab`);
    this.router.navigate([`/dashboard/${tab}`]);
  }

}
