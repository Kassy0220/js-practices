module.exports = numericalValidator;

function numericalValidator(min, max) {
  this.min = min;
  this.max = max;
}

numericalValidator.prototype.validate = function (value) {
  return Number.isInteger(value) && this.min <= value && this.max >= value;
};
