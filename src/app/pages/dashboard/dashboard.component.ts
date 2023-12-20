import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule, } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:true,
  imports: [CommonModule,  RouterModule , MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatCheckboxModule  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  city = 'Kolkata'; // Replace with the desired city
  humidityData: any[] = [];

  constructor( private API : ApiService) { }

  ngOnInit(): void {
    this.fetchRecentHumidity();
  }
  fetchRecentHumidity() {
    this.API.getRecentHumidity(this.city).subscribe((data) => {
      this.humidityData = data.forecast.forecastday;
      console.log(this.humidityData[0].day)
    });
  }
}
