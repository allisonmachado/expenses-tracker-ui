export default class ExpenseService {
  constructor(expenseFetch, authRepository) {
    this.expenseFetch = expenseFetch;
    this.authRepository = authRepository;
  }

  async getAll() {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.getAll(loggedUser?.accessToken);
  }

  async create(expense) {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.create(expense, loggedUser?.accessToken);
  }

  async getById(id) {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.getById(id, loggedUser?.accessToken);
  }

  async update(expense) {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.update(expense, loggedUser?.accessToken);
  }

  async deleteById(id) {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.delete(id, loggedUser?.accessToken);
  }

  async clone(period) {
    const loggedUser = this.authRepository.getAuthenticatedUser();
    return this.expenseFetch.clone(period, loggedUser?.accessToken);
  }
}