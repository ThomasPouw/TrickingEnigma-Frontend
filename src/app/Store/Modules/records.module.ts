import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromRecord from '../Reducers/records.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromRecord.recordFeatureKey, fromRecord.recordReducer)
  ],
})
export class RecordsModule {}
