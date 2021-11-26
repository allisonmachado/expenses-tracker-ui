export default class SimpleDate {
  static getCurrentYearMonth() {
    const currentDate = new Date();
    return {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }

  static isCurrentYearMonth(givenDate) {
    const currentDate = this.getCurrentYearMonth();
    return (Number(givenDate.year) === currentDate.year) && (Number(givenDate.month) === currentDate.month);
  }
}
