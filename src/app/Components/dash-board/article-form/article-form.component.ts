import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit{


  constructor(private router :Router ,private activatedRoute:ActivatedRoute) {
  
  }
  ngOnInit(): void {
         let artID=this.activatedRoute.snapshot.params['']
  }
  
  
}
