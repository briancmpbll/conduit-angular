import { Component, OnInit, Input } from '@angular/core';
import { Errors } from '../../core/models/errors.model';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.css']
})
export class ErrorsListComponent implements OnInit {
  private formattedErrors: Array<string> = [];

  @Input() set errors(errorList: Errors) {
    this.formattedErrors = [];

    if (errorList.errors) {
      for (const field in errorList.errors) {
        if (errorList.errors.hasOwnProperty(field)) {
          this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
        }
      }
    }
  }

  get errorList() {
    return this.formattedErrors;
  }

  constructor() { }

  ngOnInit() {
  }

}
