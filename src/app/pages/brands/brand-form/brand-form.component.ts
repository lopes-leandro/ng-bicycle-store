import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@models/brand.model';
import { BrandsService } from '@services/brands.service';


enum TITLE_ENUM {
  CRIAR = 'Criar Marca',
  EDITAR = 'Editar Marca'
}

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  private readonly brandsService$ = inject(BrandsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);

  private brandId!: string;

  title: string | null = null;
  isDisabledButtonSubmit = true;
  isVisibleControlId = false;
  formBrand!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createFormBrand();

    this.checkRouteParameter();

    this.formBrand.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.isDisabledButtonSubmit = false;
      } else {
        this.isDisabledButtonSubmit = true;
      }
    })
  }

  onSubmit(): void {
    if (this.formBrand.valid) {
      if (this.brandId) {
        this.updateBrand(this.formBrand.value);
      } else {
        this.addBrand(this.formBrand.value);
      }
    }
  }

  private createFormBrand(): void {
    this.formBrand = this.fb.group({
      id: new FormControl({ value: 0, disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  private checkRouteParameter(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.brandId = params['id'];
        this.title = TITLE_ENUM.EDITAR;
        this.isVisibleControlId = true;
        this.getBrand(this.brandId);
      } else {
        this.title = TITLE_ENUM.CRIAR;
      }
    })
  }

  private getBrand(id: string): void {
    this.brandsService$.getBrand(id).subscribe(data => {
      this.loadDataForEditing(data);
    })
  }

  private addBrand(item: Brand): void {
    this.brandsService$.addBrand(item)
      .subscribe(() => {
        this.formBrand.reset();
        this.router.navigate(['/marcas']);
      });
  }

  private updateBrand(brand: Brand): void {
    this.brandsService$
      .updateBrand(this.brandId, brand)
      .subscribe(() => {
        this.formBrand.reset();
        this.router.navigate(['/marcas']);
      });
  }

  private loadDataForEditing(item: Partial<Brand>): void {
    this.formBrand.patchValue(item)
  }

}
