import { Component } from '@angular/core';
import { ApiService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //course record list variable
  records: any
  filterdrecords: any;
  //search query string variable
  courseQuery: string;
  showResult: boolean;
  //variables for showing count of total records
  totalRecords: number;
  searchTotalRecords: number;
  //maintain sortorder: true=asc false=des
  sortOrder: boolean;
  noData:boolean;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.showResult = false;
    this.sortOrder = true;
    this.noData=false
    this.apiservice.getData().subscribe(data => {
      if(data == null){
        this.noData=true;
        return
      }
      this.records = data
      this.totalRecords = this.records.length;
    }
    );
  }

  searchCourse() {
    this.courseQuery = this.courseQuery.trim();
    this.filterdrecords = this.records.filter(course =>
      course.Provider.toLowerCase().includes(this.courseQuery.toLowerCase()) ||
      course['Parent Subject'].toLowerCase().includes(this.courseQuery.toLowerCase()) ||
      course['Child Subject'].toLowerCase().includes(this.courseQuery.toLowerCase()) ||
      course['Universities']['Institutions'].toLowerCase().includes(this.courseQuery.toLowerCase()))
    this.searchTotalRecords = this.filterdrecords.length
    this.sort('date')
    this.showResult = true;
  }

  sort(column) {

    if (column == 'length') {
      this.filterdrecords = this.filterdrecords.sort((a: any, b: any) => {
        if (this.sortOrder)
          return a.Length < b.Length ? -1 : 1
        else
          return a.Length < b.Length ? 1 : -1
      });
    }
    else if(column=='date'){
      this.filterdrecords = this.filterdrecords.sort((a: any, b: any) => {
        if (this.sortOrder)
          return a['Next Session Date'] < b['Next Session Date'] ? -1 : 1
        else
          return a['Next Session Date'] < b['Next Session Date'] ? 1 : -1
      });

    }
    this.sortOrder = !this.sortOrder
  }

}
