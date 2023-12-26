import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.css'],
})
export class WritingPageComponent implements OnInit {
  writingForm: FormGroup;
  title = new FormControl('');
  body = new FormControl('');

  constructor() {
    this.writingForm = new FormGroup({
      title: this.title,
      body: this.body,
    });
  }

  ngOnInit(): void {}

  submitDetails() {
    console.log(this.writingForm.value);
  }
}
