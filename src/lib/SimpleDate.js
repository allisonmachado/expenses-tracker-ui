export default class SimpleDate {
  static getCurrentYearMonth() {
    const currentDate = new Date();
    return {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }
}
