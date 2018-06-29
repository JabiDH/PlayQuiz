import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { Router, ActivatedRoute } from '@angular/router'
import { QuizzesComponent } from '../quizzes/quizzes.component'
@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz = {};
  quizzes: any = [];
  id;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.quizSelected.subscribe(q => this.quiz = q);
    if (this.id) {
      this.api.getQuizById(this.id).subscribe(q => {
        if (q) {
          this.quiz = q;
        }
      });
    }
    this.getQuizzes();
  }

  post(quiz) {
    if (quiz && quiz.title) {
      this.api.postQuiz(quiz).subscribe(res => {
        if (res) {
          console.log(res);
          this.getQuizzes();
          //this.quizzes.push(res);
          this.router.navigateByUrl(`/quiz/${res.id}`);          
        }
      });
    }
  }

  put(quiz) {
    this.api.putQuiz(quiz).subscribe(res =>{
      this.getQuizzes();
            //this.router.navigateByUrl('quiz');
        });
    //this.router.navigateByUrl('quizzes');
  }

  delete(quiz) {
    this.api.deleteQuiz(quiz).subscribe(res => {
      if(res){
        console.log(res);
        this.getQuizzes();
        //this.quizzes.pop(quiz => quiz.id == res.id);
        this.router.navigateByUrl('quiz');
      }
    });
  }

  getQuizzes() {
    this.api.getQuizzes().subscribe(res => {
      if (res) {
        this.quizzes = res;
        //console.log(this.quizzes);
      }
    });
  }

}
