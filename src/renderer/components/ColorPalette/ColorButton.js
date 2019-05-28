// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * This is Reactjs functional component that create color button
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

ColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  isFocus: PropTypes.bool.isRequired,
  setIsFocus: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    ...setButtonSizeTamplate(40),
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      ...setButtonSizeTamplate(35)
    }
  }
});

const styleDisabled = {
  background: `rgb(155, 155, 155)`,
  pointerEvents: "none",
  cursor: "default"
};

///Minimum value for rendering border on white button
const minWhiteColorValue = 220;

/**
 * Use to reduce the amount of code
 * @param {number} value Size in pixels
 */
const setButtonSizeTamplate = value => ({
  minWidth: value,
  minHeight: value,
  maxWidth: value,
  maxHeight: value
});

/**
 * Use to reduce the amount of code
 * @param {object} color Object with keys that defining colors using the Red-green-blue (RGB) model
 */
const setColorTamplate = color => `rgb(${color.r}, ${color.g}, ${color.b})`;

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} isFocus Change CSS styles
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {number} index Current index of button
 * @param {object} color Current color of button
 * @param {boolean} disabled Property that disable component
 */
function ColorButton(props) {
  const { classes, setIsFocus, isFocus, index, color, disabled } = props;

  ///Checks background is white or not
  const isWhiteColor =
    color.r >= minWhiteColorValue &&
    color.g >= minWhiteColorValue &&
    color.b >= minWhiteColorValue;

  const style = {
    background: setColorTamplate(color)
  };

  const styleInFocus = {
    background: setColorTamplate(color),
    boxShadow: !isWhiteColor
      ? `0px 0px 26px 4px ${setColorTamplate(color)}`
      : `0px 0px 26px 4px rgb(155, 155, 155)`
  };

  return (
    <Button
      variant="contained"
      className={classes.root}
      style={disabled ? styleDisabled : isFocus ? styleInFocus : style}
      onClick={setIsFocus.bind(this, index, color)}
    >
      {""}
    </Button>
  );
}

export default withStyles(styles)(ColorButton);