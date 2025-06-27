import { VacancyStatus } from 'types/enums/VacancyStatus';

export type Vacancy = {
  vacancyName: string;
  jobTitle: string;
  description: string;
  hiringManager: string;
  numberOfPositions: string;
  status: VacancyStatus;
};
