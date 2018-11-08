import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { Router, ActivatedRoute } from '@angular/router'
import { QuizzesComponent } from '../quizzes/quizzes.component'
import { AuthService } from '../api/auth.service'

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz = {};
  quizzes: any = [];
  id;
  levels = ['Easy', 'Meduim', 'Hard', 'Difficult']

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    console.log("Is authenticated : " + this.auth.isAuthenticated);
    if (this.auth.isAuthenticated == true) {
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
    }else{
      this.router.navigateByUrl("/login");
    }
  }

  post(quiz) {
    if (quiz && quiz.title) {
      this.api.postQuiz(quiz).subscribe(res => {
        if (res) {
          console.log(res);
          this.getQuizzes();
          this.api.selectQuiz(res);          
        }
      });
    }
  }

  put(quiz) {
    this.api.putQuiz(quiz).subscribe(res => {
      this.getQuizzes();
      //this.router.navigateByUrl('quiz');
    });
    //this.router.navigateByUrl('quizzes');
  }

  delete(quiz) {
    this.api.deleteQuiz(quiz).subscribe(res => {
      if (res) {
        console.log(res);
        this.getQuizzes();        
        this.router.navigateByUrl('quiz');
      }
    });
  }
  
  deleteQuizzes(){
    this.api.deleteQuizzes().subscribe(res => {
        console.log(res);
        this.getQuizzes();
        this.router.navigateByUrl('quiz');
    })
  }

  getQuizzes() {
    this.api.getQuizzes().subscribe(res => {
      if (res) {
        this.quizzes = res;
        console.log(this.quizzes);
      }
    });
  }

}

