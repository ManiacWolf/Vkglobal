const LONG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Object.assign(Date.prototype, {
  format(formatString) {
    switch (formatString) {
      case "dd":
        return `${this.getDate().toString().padStart(2, "0")}`;
      case "MMM":
        return `${SHORT_MONTHS[this.getMonth()]}`;
      case "dd MMM, yyyy":
        return `${this.getDate().toString().padStart(2, "0")} ${SHORT_MONTHS[this.getMonth()]}, ${this.getFullYear()}`;
      case "dd MMMM, yyyy":
        return `${this.getDate().toString().padStart(2, "0")} ${LONG_MONTHS[this.getMonth()]}, ${this.getFullYear()}`;
      case "dd MMM, yyyy hh:mm A":
        `${this.getDate().toString().padStart(2, "0")} ${SHORT_MONTHS[this.getMonth()]}, ${this.getFullYear()} ${(this.getHours() > 12 ? this.getHours() - 12 : this.getHours()).toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")} ${this.getHours() > 11 ? "PM" : "AM"}`;
      case "dd MMMM, yyyy hh:mm A":
        `${this.getDate().toString().padStart(2, "0")} ${LONG_MONTHS[this.getMonth()]}, ${this.getFullYear()} ${(this.getHours() > 12 ? this.getHours() - 12 : this.getHours()).toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")} ${this.getHours() > 11 ? "PM" : "AM"}`;
      case "dd MMM":
        return `${this.getDate().toString().padStart(2, "0")} ${SHORT_MONTHS[this.getMonth()]}`;
      case "yyyy-MM-dd":
        return `${this.getFullYear()}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getDate().toString().padStart(2, "0")}`;
      case "YYMMDD":
        return `${String(this.getFullYear()).substring(-2)}${(this.getMonth() + 1).padStart(2, "0")}${this.getDate().toString().padStart(2, "0")}`;
      case "MMDDYY":
        return `${(this.getMonth() + 1).padStart(2, "0")}${this.getDate().toString().padStart(2, "0")}${String(this.getFullYear()).substring(-2)}`;
      case "YY/MM/DD":
        return `${String(this.getFullYear()).substring(-2)}/${(this.getMonth() + 1).padStart(2, "0")}/${this.getDate().toString().padStart(2, "0")}`;
      case "dd-MM-yyyy":
        return `${this.getDate().toString().padStart(2, "0")}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getFullYear()}`;
      case "dd-MM-yyyy hh:mm A":
        return `${this.getDate().toString().padStart(2, "0")}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getFullYear()} ${(this.getHours() > 12 ? this.getHours() - 12 : this.getHours()).toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")} ${
          this.getHours() > 11 ? "PM" : "AM"
        }`;
      case "dd/MM/yyyy":
        return `${this.getDate().toString().padStart(2, "0")}/${(this.getMonth() + 1).padStart(2, "0")}/${this.getFullYear()}`;
      case "dd/MM/yy":
        return `${this.getDate().toString().padStart(2, "0")}/${(this.getMonth() + 1).padStart(2, "0")}/${String(this.getFullYear()).substring(-2)}`;
      case "dd/MMM/yy":
        return `${this.getDate().toString().padStart(2, "0")}/${SHORT_MONTHS[this.getMonth()]}/${String(this.getFullYear()).substring(-2)}`;
      case "yyyy/MM/dd":
        return `${this.getFullYear()}/${(this.getMonth() + 1).padStart(2, "0")}/${this.getDate().toString().padStart(2, "0")}`;
      case "yy/MMM/dd":
        return `${String(this.getFullYear()).substring(-2)}/${SHORT_MONTHS[this.getMonth()]}/${this.getDate().toString().padStart(2, "0")}`;
      case "MM/dd/yyyy":
        return `${(this.getMonth() + 1).padStart(2, "0")}/${this.getDate().toString().padStart(2, "0")}/${this.getFullYear()}`;
      case "dd/MMM/yyyy":
        return `${this.getDate().toString().padStart(2, "0")}/${SHORT_MONTHS[this.getMonth()]}/${this.getFullYear()}`;
      case "MMM/dd/yyyy":
        return `${SHORT_MONTHS[this.getMonth()]}/${this.getDate().toString().padStart(2, "0")}/${this.getFullYear()}`;
      case "hh:mm":
        return `${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}`;
      case "hh:mm A":
        return `${(this.getHours() > 12 ? this.getHours() - 12 : this.getHours()).toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")} ${this.getHours() > 11 ? "PM" : "AM"}`;
      case "hh:mm:ss":
        return `${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}:${this.getSeconds().toString().padStart(2, "0")}`;
      case "yyyy-MM-dd hh:mm:ss":
        return `${this.getFullYear()}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getDate().toString().padStart(2, "0")} ${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}:${this.getSeconds().toString().padStart(2, "0")}`;
      case "yyyy-MM-ddThh:mm:ss":
        return `${this.getFullYear()}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getDate().toString().padStart(2, "0")}T${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}:${this.getSeconds().toString().padStart(2, "0")}`;
      case "yyyy-MM-ddThh:mm:ss.mmmmZ":
        return `${this.getFullYear()}-${(this.getMonth() + 1).padStart(2, "0")}-${this.getDate().toString().padStart(2, "0")}T${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}:${this.getSeconds().toString().padStart(2, "0")}.${this.getTimezoneOffset()
          .toString()
          .padStart(3, "0")}Z`;
      default:
        return `${this.getDate().toString().padStart(2, "0")} ${SHORT_MONTHS[this.getMonth()]}, ${this.getFullYear()}`;
    }
  },
});
