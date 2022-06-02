import {createSelector} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";
import {Record} from "../Model/Record";

export const getAllRecords = createSelector(getRecordFeatureState, (state: State) => state.records.records);
export const getUserRecord = createSelector(getRecordFeatureState, (state: State) => state.records.record);
export const getLevelRecords = createSelector(getRecordFeatureState, (state: State) => state.records.records);
export const getRecordsByNationality = (id: string) => createSelector(getRecordFeatureState, (state:State) =>
   state.records.records.filter(record => state.users.users.filter(user => user.id === record.userID).filter(user => user.nationality.id == id)));
//export const RecordSortedByTime_Nationality = createSelector(getRecordsByNationality, (records: any) => records
export const getAllBestUserRecords = createSelector(getRecordFeatureState, (state: State) => {
  var records: Record[] = JSON.parse(JSON.stringify(state.records.records));
  return records.filter( record =>
    state.levels.levels.map(level => {
      if(level.id == record.levelID)
        record.levelName = level.name
      }
    ))
  }
)
export const getAllBestRecords = (lCheck: boolean, uCheck: boolean, nationality: string)=> createSelector(getRecordFeatureState, (state: State) => {
    var records: Record[] = JSON.parse(JSON.stringify(state.records.records));
    return records.filter( record => {
      if(lCheck){
        state.levels.levels.map(level => {
          if (level.id == record.levelID)
            record.levelName = level.name
          }
        )
      }
      if(uCheck){
        state.users.users.map(user => {
          if(user.id == record.userID){
            record.userName= user.name;
            record.nationality = user.nationality.name
          }
        })
      }
      return record;
      }
    )
  }
)
export const getUserIDs = createSelector(getRecordFeatureState, (state: State) => {
  console.log(state.records.records.map(record => record.userID))
  return state.records.records.map(record => record.userID)
})

