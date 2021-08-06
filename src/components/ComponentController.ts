import { INgModelController } from 'angular';

class ComponentController {
    ngModel: INgModelController;

    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
}

export default ComponentController;
