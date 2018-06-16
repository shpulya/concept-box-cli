import {Component, OnInit} from '@angular/core';
import {NgModule, ErrorHandler} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService, UserService, IdeaService} from '../_services/index';
import {HttpClientModule} from '@angular/common/http';
import {Idea, User} from '../_models';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './idea-detail.component.html'
})

export class IdeaDetailComponent {
  email: string;
  ideaId: number;
  idea: any ={};
  currentUser: User;
  userId: number;
  author: User;
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
    //this.email = (atob(JSON.parse(localStorage.getItem('currentUser')))).split(':')[0];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;
    this.routeSubscription = route.params.subscribe(params => this.ideaId = params['id']);

    this.ideaService.getIdeaById(this.ideaId).subscribe(idea => {
      this.idea = idea;
    });
    //this.userId = this.idea.userId;
    // this.userService.getById(this.userId).subscribe(user => {
    //   this.author = user;
    // });

  }
}
