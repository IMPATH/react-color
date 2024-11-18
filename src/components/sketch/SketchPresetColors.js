import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { Swatch } from '../common'

export const SketchPresetColors = ({ colors, onClick = () => {}, onSwatchHover, onAddNewColor = () => {} } ) => {
  const styles = reactCSS({
    'default': {
      colors: {
        margin: '0 -10px',
        padding: '10px 0 0 10px',
        borderTop: '1px solid #eee',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      },
      swatchWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0',
      },
      swatch: {
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
      },
      addButtonWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0',
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
        cursor: 'pointer',
      },
      addButtonText: {
        fontSize: '12px',
        color: '#666',
      },
    },
  })

  const handleClick = (hex, e) => {
    onClick({
      hex,
      source: 'hex',
    }, e)
  }

  return (
    <div style={ styles.colors } className="flexbox-fix">
      { colors.map((colorObjOrString) => {
        const c = typeof colorObjOrString === 'string'
          ? { color: colorObjOrString }
          : colorObjOrString
        const key = `${c.color}${c.title || ''}`
        return (
          <div key={ key } style={ styles.swatchWrap }>
            <Swatch
              { ...c }
              style={ styles.swatch }
              onClick={ handleClick }
              onHover={ onSwatchHover }
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${ c.color }`,
              }}
            />
          </div>
        )
      }) }
      {/* Add Button */}
      <div style={ styles.addButtonWrap } onClick={ onAddNewColor }>
        <span style={ styles.addButtonText }>+</span>
      </div>
    </div>
  )
}

SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
    })],
  )).isRequired,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
  onAddNewColor: PropTypes.func, // 新しい色追加ボタンのクリックイベント
}

export default SketchPresetColors
