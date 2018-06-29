import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { QuizComponent } from '../quiz/quiz.component'

@Component({
  selector: 'quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  
  quizzes:any = [];

  constructor(private api: ApiService) { 
     
  }

  ngOnInit() {    
    this.api.getQuizzes().subscribe(res => {
      if(res){
      this.quizzes = res;
      console.log(this.quizzes);
    }
    });     
  } 

}
