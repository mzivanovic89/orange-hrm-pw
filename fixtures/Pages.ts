import { type Page } from '@playwright/test';
import LoginPage from 'pages/auth/LoginPage';
import AddUserPage from 'pages/authenticated-user/admin/AddUserPage';
import EditUserPage from 'pages/authenticated-user/admin/EditUserPage';
import UserManagementPage from 'pages/authenticated-user/admin/UserManagementPage';
import DashboardPage from 'pages/authenticated-user/dashboard/DashboardPage';
import ConfirmDeleteModal from 'pages/authenticated-user/shared/modals/ConfirmDeleteModal';
import AddEmployeePage from 'pages/authenticated-user/pim/AddEmployeePage';
import PIMPage from 'pages/authenticated-user/pim/PIMPage';
import NavigationMenu from 'pages/authenticated-user/shared/NavigationMenu';
import Toast from 'pages/authenticated-user/shared/Toast';
import PersonalDetailsPage from 'pages/authenticated-user/my-info/PersonalDetailsPage';
import LoadingSpinner from 'pages/authenticated-user/shared/LoadingSpinner';
import RecruitmentPage from 'pages/authenticated-user/recruitment/RecruitmentPage';
import VacanciesPage from 'pages/authenticated-user/recruitment/VacanciesPage';
import AddVacancyPage from 'pages/authenticated-user/recruitment/AddVacancyPage';

export default class Pages {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loginPage() {
    return new LoginPage(this.page);
  }

  // Dashboard section
  dashboardPage() {
    return new DashboardPage(this.page);
  }

  // Admin section
  userManagementPage() {
    return new UserManagementPage(this.page);
  }

  addUserPage() {
    return new AddUserPage(this.page);
  }

  editUserPage() {
    return new EditUserPage(this.page);
  }

  // PIM section
  pimPage() {
    return new PIMPage(this.page);
  }

  addEmployeePage() {
    return new AddEmployeePage(this.page);
  }

  // Recruitment section
  recruitmentPage() {
    return new RecruitmentPage(this.page);
  }

  vacanciesPage() {
    return new VacanciesPage(this.page);
  }

  addVacancyPage() {
    return new AddVacancyPage(this.page);
  }

  // My info section
  personalDetailsPage() {
    return new PersonalDetailsPage(this.page);
  }

  // shared
  navigationMenu() {
    return new NavigationMenu(this.page);
  }

  toast() {
    return new Toast(this.page);
  }

  loadingSpinner() {
    return new LoadingSpinner(this.page);
  }

  // modals
  confirmDeleteModal() {
    return new ConfirmDeleteModal(this.page);
  }
}
