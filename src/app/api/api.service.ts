import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiService{

    private selectedQuestion = new Subject<any>();
    questionSelected = this.selectedQuestion.asObservable();

    private selectedQuiz = new Subject<any>();
    quizSelected = this.selectedQuiz.asObservable();

    constructor(private http: HttpClient, private router: Router){        
    }

    // QUESTION CRUD

    getQuestions(quizId){
        return this.http.get(`http://localhost:18080/api/questions/${quizId}`);
    }

    getQuestionById(id){
        return this.http.get(`http://localhost:18080/api/questions/${id}`);
    }

    postQuestion(question): any{
        return this.http.post('http://localhost:18080/api/questions', question);
    }

     putQuestion(question): any{
        return this.http.put(`http://localhost:18080/api/questions/${question.id}`, question);
    }

    deleteQuestion(question): any{
        return this.http.delete(`http://localhost:18080/api/questions/${question.id}`, question);
    }

    selectQuestion(question){
        console.log(question);
        this.selectedQuestion.next(question);
        this.router.navigateByUrl(`/question/${question.quizId}`);   
    }


    // QUIZ CRUD

    getQuizzes(){
        return this.http.get('http://localhost:18080/api/quizzes');
    }

    getAllQuizzes(){
        return this.http.get('http://localhost:18080/api/quizzes/all');
    }
    
    getQuizById(id){
        return this.http.get(`http://localhost:18080/api/quizzes/${id}`);
    }

    postQuiz(quiz): any{
        return this.http.post('http://localhost:18080/api/quizzes', quiz);
    }

     putQuiz(quiz): any{
        return this.http.put(`http://localhost:18080/api/quizzes/${quiz.id}`, quiz);
    }

    deleteQuiz(quiz): any{
        return this.http.delete(`http://localhost:18080/api/quizzes/${quiz.id}`, quiz);
    }

    selectQuiz(quiz){
        console.log(quiz);
        this.selectedQuiz.next(quiz);
        this.router.navigateByUrl(`/quiz/${quiz.id}`);
    }
   
}