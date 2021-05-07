import { Component, OnInit } from '@angular/core';
import { TopFiveTraded } from 'src/app/models/top-five-traded';
import { TopListService } from '../top-list-service';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements OnInit {

  displayColumns=['Traded','Value'];
  data!:TopFiveTraded[];
  constructor(private appService:TopListService) { }

  ngOnInit(): void {
    debugger;
    this.appService.findGenericAllAsync("GetTopFiveTradedInSeventeDays").subscribe(response=>{
      this.data = response as TopFiveTraded[];

    },error=>{
      console.log(error);
    });
  }

}
