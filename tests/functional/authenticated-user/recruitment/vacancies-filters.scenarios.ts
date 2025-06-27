import { VacancyFilter } from 'types/enums/VacancyFilter';

type VacanciesFilterScenarios = {
  name: string;
  filters: VacancyFilter[];
};

export const filterScenarios: VacanciesFilterScenarios[] = [
  {
    name: 'Job title filter',
    filters: [VacancyFilter.JOB_TITLE],
  },
  {
    name: 'Vacancy filter',
    filters: [VacancyFilter.VACANCY],
  },
  {
    name: 'Hiring manager filter',
    filters: [VacancyFilter.HIRING_MANAGER],
  },
  {
    name: 'Status filter',
    filters: [VacancyFilter.STATUS],
  },
  {
    name: 'Job title and status filters',
    filters: [VacancyFilter.JOB_TITLE, VacancyFilter.STATUS],
  },
  {
    name: 'Hiring manager and status filters',
    filters: [VacancyFilter.HIRING_MANAGER, VacancyFilter.STATUS],
  },
  {
    name: 'All filters (job title, vacancy name, hiring manager, status)',
    filters: [
      VacancyFilter.JOB_TITLE,
      VacancyFilter.VACANCY,
      VacancyFilter.HIRING_MANAGER,
      VacancyFilter.STATUS,
    ],
  },
];
