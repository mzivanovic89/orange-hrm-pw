type WidgetScenario = {
  name: string;
  responseUrlRegex: string;
  entityName: string;
};

export const scenarios: WidgetScenario[] = [
  {
    name: 'Employee Distribution by Sub Unit',
    responseUrlRegex: '**/dashboard/employees/subunit',
    entityName: 'subunit',
  },
  {
    name: 'Employee Distribution by Location',
    responseUrlRegex: '**/dashboard/employees/locations',
    entityName: 'location',
  },
];
