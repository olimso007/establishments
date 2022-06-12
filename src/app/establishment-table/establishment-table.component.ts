import { 
  Component, 
  Inject, 
  OnInit, 
  ViewChild, 
  AfterViewInit 
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentsService } from '../services/establishments.service';

@Component({
  selector: 'app-establishment-table',
  templateUrl: './establishment-table.component.html',
  styleUrls: ['./establishment-table.component.css']
})
export class EstablishmentTableComponent implements OnInit, AfterViewInit {

  establishments = new MatTableDataSource(this.service.getAll());
  filterForm!: FormGroup;

  columnsToDisplay = ['name', 'city', 'postcode', 'address', 'startyear'];
  cities: Set<string> = new Set();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(EstablishmentsService) private service: EstablishmentsService,
  ) { }
   

  ngOnInit(): void {
    this.filterForm = new FormGroup(
      {
        name: new FormControl(), 
        cities: new FormControl(),
        postcode: new FormControl(),
        startyear: new FormControl(),
      },
    );

    this.cities = this.service.getAllCities();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.establishments.paginator = this.paginator;
    }
  }

  onFilter = () => {
    this.establishments.data =
     this.service.filterEstablishmnets(
      this.filterForm.value.name,
      this.filterForm.value.cities,
      this.filterForm.value.postcode,
      this.filterForm.value.startyear
    );
  }

  onReset = () => {
    this.establishments = new MatTableDataSource(this.service.getAll());
    this.filterForm.reset();
  }
  
  onOpen = (name: string) => {
    this.router.navigate(['./establishment', name.toLocaleLowerCase().split(' ').join('')], {
      relativeTo: this.route,
    });
  } 
}
