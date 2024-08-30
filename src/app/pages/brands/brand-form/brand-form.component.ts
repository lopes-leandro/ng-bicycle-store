import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@models/brand.model';
import { BrandsService } from '@services/brands.service';
import { Subject, takeUntil } from 'rxjs';


enum TITLE_ENUM {
  CRIAR = 'Criar Marca',
  EDITAR = 'Editar Marca'
}

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit, OnDestroy {

  private readonly brandsService$ = inject(BrandsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  private brandId!: string;

  title: string | null = null;
  isDisabledButtonSubmit = true;
  isVisibleControlId = false;
  formBrand!: FormGroup;

  ngOnInit(): void {
    this.createFormBrand();

    this.checkRouteParameter();

    this.formBrand.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        if (status === 'VALID') {
          this.isDisabledButtonSubmit = false;
        } else {
          this.isDisabledButtonSubmit = true;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
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
      active: new FormControl(null),
    });
  }

  private checkRouteParameter(): void {
    const paramsId = this.route.snapshot.paramMap.get('id');
    if (paramsId) {
      this.brandId = paramsId;
      this.title = TITLE_ENUM.EDITAR;
      this.isVisibleControlId = true;
      this.getBrand(this.brandId);
    } else {
      this.title = TITLE_ENUM.CRIAR;
    }
  }

  private getBrand(id: string): void {
    this.brandsService$.getBrand(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loadDataForEditing(data);
      })
  }

  private addBrand(item: Brand): void {
    this.brandsService$.addBrand(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formBrand.reset();
        this.router.navigate(['/marcas']);
      });
  }

  private updateBrand(brand: Brand): void {
    this.brandsService$
      .updateBrand(this.brandId, brand)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formBrand.reset();
        this.router.navigate(['/marcas']);
      });
  }

  private loadDataForEditing(item: Partial<Brand>): void {
    this.formBrand.patchValue(item)
  }

}
