import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

enum TITLE_ENUM {
  CRIAR =  'Criar Categoria',
  EDITAR = 'Editar Categoria'
}
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  title: string | null = null;
  btnSubmitDisabled = true;

  formModel = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    console.log(categoryId);
    
    if (categoryId)
    {
      this.title = TITLE_ENUM.EDITAR;
    } else {
      this.title = TITLE_ENUM.CRIAR;
    }

    this.formModel.statusChanges.subscribe(status => {
      console.log('Status do formulário:', status);
      if (status === 'VALID') {
        this.btnSubmitDisabled = false;
      } else {
        this.btnSubmitDisabled = true;
      }
    })
  }

}
