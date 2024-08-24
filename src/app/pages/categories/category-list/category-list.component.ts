import { Component } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  users = [{
    id: 1,
    name: 'Usuário 1',
    creation: new Date().toDateString()
  }]
  categoryList = []
}
