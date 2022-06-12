import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstablishmentsService } from '../services/establishments.service';

@Component({
  selector: 'app-establishment-detail',
  templateUrl: './establishment-detail.component.html',
  styleUrls: ['./establishment-detail.component.css']
})
export class EstablishmentDetailComponent implements OnInit {
  establishment: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(EstablishmentsService) private service: EstablishmentsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let name: string = params['name'];
      this.establishment = this.service.getByName(name);
    });
    if(!this.establishment) {
      console.error("Can not find establishment");
      this.back();
    }
  }

  back() {
    this.router.navigate(['']);
  }

}
