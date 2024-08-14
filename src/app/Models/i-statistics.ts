export interface IStatisticsResponse {
  numOfTotalHousingApps: number;
  numOfTFHousingApps: number;
  numOfPFHousingApps: number;
  numOfMaleHousingApps: number;
  numOfFemaleHousingApps: number;
  numOfOldStudentsHousingApps: number;
  numOfNewStudentsHousingApps: number;
  numOfLevelOneHousingApps: number;
  numberOfDiseaseCasesHousingApps: number; //new added field

  numOfApplicableTotalHousingApps: number;
  numOfApplicableTFHousingApps: number;
  numOfApplicablePFHousingApps: number;
  numOfApplicableMaleHousingApps: number;
  numOfApplicableFemaleHousingApps: number;
  numOfApplicableOldStudentsHousingApps: number;
  numOfApplicableNewStudentsHousingApps: number;
  numOfApplicableLevelOneHousingApps: number;
  numOfApplicableTFHousingAppsByPercentages: number;
  numOfApplicablePFHousingAppsByPercentages: number;
  numberOfApplicableDiseaseCasesHousingApps: number; //new added field

  //new added fields
  numberOfPendingHousingApps: number;
  numberOfApprovedHousingApps: number;
  numberOfRejectedHousingApps: number;
  numberOfProgressHousingApps: number;
  numberOfExceptedHousingApps: number;
}
