// heigth(m), weigth(kg)
const countBmi = (heigth, weigth) => {
  return weigth / (heigth * heigth);
};

const getStatus = (bmi) => {
  if (bmi < 18.5) {
    return {
      status: "Underweigth",
      tip: "Being underweight could be a sign you're not eating enough or you may be ill. If you're underweight, a GP can help.",
    };
  } else if (bmi >= 18 && bmi <= 24.9) {
    return {
      status: "Normal Weigth",
      tip: "Keep up the good work! For tips on maintaining a healthy weight, check out the food and diet and fitness sections.",
    };
  } else if (bmi >= 25 && bmi <= 29.9) {
    return {
      status: "Overweigth",
      tip: "The best way to lose weight if you're overweight is through a combination of diet and exercise.",
    };
  } else {
    return {
      status: "Obesity",
      tip: "The best way to lose weight if you're obese is through a combination of diet and exercise, and, in some cases, medicines. See a GP for help and advice.",
    };
  }
};

module.exports = { countBmi, getStatus };
