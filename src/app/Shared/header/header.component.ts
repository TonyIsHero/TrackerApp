import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showProfileDropdown = false;
  showEditProfileModal = false;
  activeTab: 'view' | 'edit' = 'view';
  name = sessionStorage.getItem('Name') || 'User';
  profileForm!: FormGroup;
  userProfile = { name: this.name, height: 0, weight: 0, goalCalories: 0, age: 0 };
  constructor(private fb: FormBuilder,
    private profileService: ProfileService
  ) { }
  ngOnInit(): void {
    console.log(this.name);
    this.fetchUserProfile();
    this.profileForm = this.fb.group({
      dateOfBirth: [null], // Format for date input
      height: [null],
      weight: [null],
      goalCalories: [null],
      goalWeight: [null]
    });
  }

  fetchUserProfile() {
    this.profileService.getUserProfile().subscribe(profile => {
      console.log(profile);
      this.userProfile = {
        name: this.name,
        height: profile.height || 0,
        weight: profile.weight || 0,
        goalCalories: profile.goalCalories || 0,
        age: profile.age || 0,
      }
      console.log('Fetched User Profile:', this.userProfile);
    });
  }
  onProfileHover() { this.showProfileDropdown = true; }
  onProfileLeave() { this.showProfileDropdown = false; }
  
  openEditProfile() { 
    this.showEditProfileModal = true; 
    this.activeTab = 'view'; // Always start with view tab
  }
  
  closeEditProfile() { 
    this.showEditProfileModal = false; 
    this.activeTab = 'view';
  }

  switchTab(tab: 'view' | 'edit') {
    this.activeTab = tab;
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  logout(){
    sessionStorage.clear();
    window.location.reload();
  }
  onSubmitProfileForm(){
    if (this.profileForm.valid) {
      // Update user profile with form values
      const formData = this.profileForm.value;
      const profileData = {
        goalCalories: formData.goalCalories,
        goalWeight: formData.goalWeight,
        height: formData.height,
        weight: formData.weight,
        dateOfBirth: new Date(formData.dateOfBirth)
      };
      this.profileService.saveUserProfile(profileData).subscribe({
        next: (response) => {
          console.log('Profile saved:', response); // response is now plain text
          this.fetchUserProfile(); // Refresh profile data
          this.profileForm.reset(); // Reset form after successful save
        },
        error: (err) => {
          console.error('Error saving profile:', err);
        }
      });
      this.switchTab('view'); // Switch back to view after saving
    }
  }
}
