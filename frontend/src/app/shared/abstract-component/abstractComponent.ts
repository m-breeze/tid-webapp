import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class AbstractComponent {

    protected containsField(controlName: string, formGroup: FormGroup)
    : boolean {
        return formGroup.contains(controlName);
    }

    protected fieldHasError(
        controlName: string,
        errorCodes: string | string[],
        formGroup: FormGroup,
        superiorErrorCodes: string | string[] = [],
    ): boolean {
        const control = formGroup.get(controlName);

        if (!control.touched || this.hasSomeError(superiorErrorCodes, control)) {
            return false;
        }

        return this.hasSomeError(errorCodes, control);
    }

    protected formGroupHasError(errorCodes: string | string[], formGroup: FormGroup): boolean {
        return this.hasSomeError(errorCodes, formGroup);
    }

    protected getControlClass(field: string, formGroup: FormGroup): any {
        return {
            'has-error': this.isFieldInvalid(field, formGroup),
        };
    }

    protected hasSomeError(errorCodes: string | string[], control: AbstractControl): boolean {
        errorCodes = this.normalizeArray(errorCodes);

        return errorCodes.some((errorCode) => control.hasError(errorCode));
    }

    protected isFieldInvalid(controlName: string, formGroup: FormGroup): boolean {
        const control = formGroup.get(controlName);
        return control.invalid && control.touched;
    }

    protected markAllFormControlsTouched(formGroup: FormGroup | FormArray): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.markAllFormControlsTouched(control);
            }
        });
    }

    protected markAllFormControlsUntouched(formGroup: FormGroup | FormArray): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsUntouched({ onlySelf: true });
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.markAllFormControlsUntouched(control);
            }
        });
    }

    protected normalizeArray<TData>(data: TData | TData[]): TData[] {
        if (!Array.isArray(data)) {
            return [ data ];
        }

        return data;
    }
}
