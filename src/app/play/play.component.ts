import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  quizzes;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {    
    this.api.getAllQuizzes().subscribe(res => {
      if(res){
      this.quizzes = res;      
    }
    });     
  } 


}
