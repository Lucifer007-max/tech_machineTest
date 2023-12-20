import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear:Number = 0;
  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
