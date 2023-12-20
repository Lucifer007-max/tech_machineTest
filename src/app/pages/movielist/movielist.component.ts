import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { MatIconModule } from '@angular/material';
@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  imports: [MatTableModule ,CommonModule,  RouterModule, MatButtonModule, MatIconModule ],
  standalone:true,
})
export class MovielistComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  dataSource:any;
  constructor(private API : ApiService) { }

  ngOnInit(): void {
  this.loadList();
  }



  loadList() {
    this.API.movieList().subscribe((movies: any) => {
      this.dataSource = movies;
      console.log(this.dataSource.results);
      this.showPage(1);
    });
  }


  showPage(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPage = pageNumber;
    this.dataSource.displayedResults = this.dataSource.results.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.showPage(this.currentPage - 1);
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.dataSource.results.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.showPage(this.currentPage + 1);
    }
  }



totalPages(): number {
  return Math.ceil(this.dataSource.results.length / this.itemsPerPage);
}
}
