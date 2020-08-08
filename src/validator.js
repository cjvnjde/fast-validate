let validators = {};

let cache = {};

let locale = '';

let dictionary = {};

function transformRule(rule) {
  const [ruleName, params] = rule.split(':');

  if (params) {
    const slittedParams = params.split(',');

    if (slittedParams.length === 1) {
      return {[ruleName]: slittedParams[0]};
    }

    return {[ruleName]: slittedParams};
  } else {
    return {[ruleName]: true};
  }
}

function extend(validateName, validateFn) {
  validators[validateName] = validateFn;
}

function validate(value, rules) {
  const errors = [];
  let objRules;

  if (Array.isArray(rules)) {
    objRules = rules.reduce((groupedRules, rule) => {
      if (cache[rule]) {
        return {...groupedRules, ...cache[rule]};
      }
      cache[rule] = transformRule(rule);
      return {...groupedRules, ...cache[rule]};
    }, {})
  } else {
    objRules = rules;
  }

  Object.entries(objRules).forEach(([ruleName, ruleValue]) => {
    if (!ruleName || !locale) {
      return [];
    }

    const validationResults = validators[ruleName](value, ruleValue);

    if (
      (Array.isArray(validationResults) && validationResults.length > 0)
      || (!Array.isArray(validationResults) && validationResults)
    ) {
      errors.push(dictionary[locale][ruleName](value, ruleValue, validationResults))
    }
  })

  return errors;
}

function setLocale(customLocale) {
  locale = customLocale;
}

function setDictionary(customDictionary) {
  dictionary = customDictionary;
}

function setValidators(customValidators) {
  validators = customValidators;
}

export default {
  extend,
  validate,
  setLocale,
  setDictionary,
  setValidators,
}

export {
  extend,
  validate,
  setLocale,
  setDictionary,
  setValidators,
}
