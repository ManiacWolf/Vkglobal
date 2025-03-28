Object.assign(Number.prototype, {
  toHourMinutesLabel() {
    const hours = Math.floor(this / 60);
    const minutes = this % 60;
    return `${hours > 0 ? (hours > 1 ? `${hours.toString().padStart(2, "0")} hrs` : `${hours.toString().padStart(2, "0")} hr`) : ""}${minutes > 0 ? ` ${minutes} min` : ""}`;
  },
});
Object.assign(Number.prototype, {
  toHourMinutes() {
    const hours = Math.floor(this / 60);
    const minutes = this % 60;
    return { hours, minutes };
  },
});
