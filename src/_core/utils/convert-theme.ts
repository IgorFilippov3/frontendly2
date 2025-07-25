// @ts-nocheck
import Color from 'color';

const sanitizeColor = (color) => {
  if (!color) {
    return color
  }

  if (/#......$/.test(color) || /#........$/.test(color)) {
    return color
  }

  try {
    return new Color(color).hexString()
  } catch (e) {
    return '#FF0000'
  }
}

const colorsAllowed = ({ foreground, background }) => {
  if (foreground === 'inherit' || background === 'inherit') {
    return false
  }

  return true
}

export const convertTheme = (theme) => {
  const { tokenColors = [], colors = {} } = theme
  const rules = tokenColors
    .filter((t) => t.settings && t.scope && colorsAllowed(t.settings))
    .reduce((acc, token) => {
      const settings = {
        foreground: sanitizeColor(token.settings.foreground),
        background: sanitizeColor(token.settings.background),
        fontStyle: token.settings.fontStyle,
      }

      const scope = typeof token.scope === 'string' ? token.scope.split(',').map((a) => a.trim()) : token.scope

      scope.map((s) =>
        acc.push({
          token: s,
          ...settings,
        }),
      )

      return acc
    }, [])

  const newColors = colors
  Object.keys(colors).forEach((c) => {
    if (newColors[c]) return c

    delete newColors[c]

    return c
  })

  return {
    base: 'vs-dark',
    inherit: true,
    colors: newColors,
    rules,
    type: theme.type,
  }
}

