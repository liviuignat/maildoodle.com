const ejs = require('ejs');

export function getLayoutByIdOrDefault(layouts, layoutId) {
  const selectedLayout =
    layouts.filter((layout) => layout.objectId === layoutId)[0];

  if (selectedLayout) {
    return selectedLayout.value;
  }

  const defaultLayout =
    layouts.filter((layout) => layout.name === 'default')[0];

  return defaultLayout ? defaultLayout.value : '';
}

export function getTranslationByKeyOrDefault(translations, languageKey) {
  const selectedTranslation =
    translations.filter((translation) => translation.key === languageKey)[0];

  if (selectedTranslation) {
    return selectedTranslation.value;
  }

  const defaultTranslation =
    translations.filter((translation) => translation.key === 'default')[0];

  return defaultTranslation ? defaultTranslation.value : {};
}

export function getVersionByIdOrProdcutionVersion(versions, versionId) {
  const selectedVersion =
    versions.filter((version) => version.objectId === versionId)[0];

  if (selectedVersion) {
    return selectedVersion;
  }

  const prodVersion =
    versions.filter((version) => version.isProduction)[0];

  if (prodVersion) {
    return prodVersion;
  }

  return versions[0];
}

export function getRawHtml(layout, html) {
  const emailTemplate = layout.replace('<!--CONTENT-->', html);
  return emailTemplate;
}

/*
  options
    filter
      layoutId
      versionId
      languageKey
    layouts
    translations
    versions,
    model
*/
export function getHtml(options) {
  const defaults = {
    filter: {},
    layouts: [],
    translations: [],
    versions: [],
    model: {}
  };
  const opts = Object.assign({}, defaults, options);
  const {
    layouts,
    translations,
    versions,
    filter,
    model,
    html
  } = opts;

  const layout = getLayoutByIdOrDefault(layouts, filter.layoutId);
  const translation = getTranslationByKeyOrDefault(translations, filter.languageKey);
  const version = getVersionByIdOrProdcutionVersion(versions, filter.versionId);
  const template = html || getRawHtml(layout, version.html);

  const modelToBind = {model, translation};
  const generatedHtml = ejs.render(template, modelToBind);

  return generatedHtml;
}
