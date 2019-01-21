import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RestService } from '../../shared/restful.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  addSkillName = '';
  srNo = 0;
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private rest: RestService, private toastr: ToastrService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.srNo = 0;
    this.getSkills();
  }

  getSkills() {
    this.rest.getSkills().subscribe((data: {}) => {
      this.updateSkillsUi(data);
    });
  }

  updateSkillsUi(updatedSkills) {
    let index = 0;
    let tempObjectArray = [];
    updatedSkills.forEach(element => {
      // { position: 1, name: 'Hydrogen', symbol: '' },
      let tempObjectList = {
        position: index,
        name: element.name,
        symbol: ''
      };
      tempObjectArray.push(tempObjectList);
      this.srNo = index;
      index++;
    });
    this.dataSource.data = tempObjectArray; //push new data to pagination table
  }

  addSkillOne() {
    if (this.addSkillName.length > 1) {
      let tempSrNo = this.srNo;
      var tempRowToInsert = {
        position: tempSrNo,
        name: this.addSkillName,
        symbol: ''
      }

      this.addSkillName = ''; //clean input
      this.srNo = this.srNo + 1;
      console.log(this.srNo)

      //rest service use for database save
      this.rest.addSkill(tempRowToInsert).subscribe((result) => {
        // this.router.navigate(['/product-details/' + result._id]);  //navigate to a tost or 2nd page
        if (result) {
          this.getSkills();   //getting refreshed data
        }
      },
        (err) => {
          console.log(err);
        });

    }

  }

  //delet functionality
  deleteOne(element) {
    console.log(element, "this has to be deeleted");
    this.rest.deleteSkill(element.name).subscribe((Response) => {
      if (Response) {
        console.log(element.position, "deleted");
        this.toastr.warning('Deleted!', element.name);
        this.getSkills();   //getting refreshed data
      }
    },
      (err) => {
        console.log(err);
      })
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
}


var ELEMENT_DATA: PeriodicElement[] = [
  { position: 0, name: '', symbol: '' },

];