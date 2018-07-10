import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { QuizComponent } from '../quiz/quiz.component'
import { AuthService } from '../api/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private api: ApiService, 
  private auth: AuthService,
  private router: Router) {

  }

  ngOnInit() {
    if (this.auth.isAuthenticated == true) {
      this.api.getQuizzes().subscribe(res => {
        if (res) {
          this.quizzes = res;
          console.log(this.quizzes);
        }
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
